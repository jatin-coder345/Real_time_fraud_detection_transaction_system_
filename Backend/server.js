// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import https from "https";

import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import Transaction from "./models/Transaction.js";
import User from "./models/User.js";

dotenv.config();
const app = express();
const httpServer = createServer(app);

// ====== Middleware ======
app.use(cors());
app.use(express.json());

// ====== Routes ======
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

// ====== Global Variables ======
let publicIP = "127.0.0.1"; // default fallback
let ALLOWED_IP_RANGE = { start: "127.0.0.1", end: "127.0.0.1" };

// ====== Fetch Public IP and Configure Dynamic Range ======
async function fetchPublicIP() {
  return new Promise((resolve) => {
    https
      .get("https://api.ipify.org?format=json", (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            if (json.ip) {
              publicIP = json.ip;
              console.log(`🌐 Public IP detected: ${publicIP}`);

              // ✅ Extract first 3 parts of IP (e.g., "49.42.155")
              const parts = publicIP.split(".");
              if (parts.length === 4) {
                const prefix = `${parts[0]}.${parts[1]}.${parts[2]}`;
                ALLOWED_IP_RANGE = {
                  start: `${prefix}.0`,
                  end: `${prefix}.255`,
                };
                console.log(
                  `🛡️ Allowed IP Range set dynamically: ${ALLOWED_IP_RANGE.start} - ${ALLOWED_IP_RANGE.end}`
                );
              }
            }
            resolve(publicIP);
          } catch {
            resolve(publicIP);
          }
        });
      })
      .on("error", () => resolve(publicIP));
  });
}

// ====== MongoDB Connection ======
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    try {
      const indexes = await Transaction.collection.indexes();
      const refIndex = indexes.find((i) => i.name === "referenceId_1");
      if (refIndex) {
        await Transaction.collection.dropIndex("referenceId_1");
        console.log("🧹 Dropped old index: referenceId_1");
      }
    } catch (err) {
      console.warn("⚠️ Could not drop referenceId index (might not exist):", err.message);
    }

    await fetchPublicIP();
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ====== Socket.IO Setup ======
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("registerUser", (userId) => {
    console.log(`📡 Listening for transactions of user: ${userId}`);
    const userChangeStream = Transaction.watch();
    userChangeStream.on("change", (change) => {
      if (change.operationType === "insert") {
        const newTxn = change.fullDocument;
        if (newTxn.user?.toString() === userId) {
          socket.emit("newTransaction", newTxn);
        }
      }
    });
    socket.on("disconnect", () => {
      console.log(`🔴 User socket ${socket.id} disconnected`);
      userChangeStream.close();
    });
  });

  socket.on("registerAdmin", () => {
    console.log("🧑‍💼 Admin registered for all live transactions");
    const adminChangeStream = Transaction.watch();
    adminChangeStream.on("change", (change) => {
      if (change.operationType === "insert") {
        const newTxn = change.fullDocument;
        io.emit("adminTransaction", newTxn);
      }
    });
    socket.on("disconnect", () => {
      console.log(`🔴 Admin socket ${socket.id} disconnected`);
      adminChangeStream.close();
    });
  });
});

// ====== Utility: Convert IP to Number ======
function ipToNumber(ip) {
  return ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0);
}

function isIPInRange(ip, range) {
  const ipNum = ipToNumber(ip);
  const startNum = ipToNumber(range.start);
  const endNum = ipToNumber(range.end);
  return ipNum >= startNum && ipNum <= endNum;
}

// ====== Auto Transaction Generator ======
const HIGH_AMOUNT_THRESHOLD = 40000;

async function createAutoTransaction() {
  try {
    const users = await User.find();
    if (!users.length) {
      console.log("⚠️ No users found in database!");
      return;
    }

    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomAmount = Math.floor(Math.random() * 50000) + 500;
    const randomType = Math.random() > 0.5 ? "credit" : "debit";
    const ipToUse = publicIP;

    // ✅ Fraud Detection
    const isIPAllowed = isIPInRange(ipToUse, ALLOWED_IP_RANGE);
    const isHighAmount = randomAmount > HIGH_AMOUNT_THRESHOLD;
    const isFraud = !isIPAllowed || isHighAmount;

    const description = isFraud
      ? !isIPAllowed
        ? `⚠️ IP ${ipToUse} out of allowed range (${ALLOWED_IP_RANGE.start} - ${ALLOWED_IP_RANGE.end})`
        : "⚠️ High-value transaction flagged"
      : "Normal transaction";

    const txn = new Transaction({
      user: randomUser._id,
      amount: randomAmount,
      type: randomType,
      ipAddress: ipToUse,
      description,
      status: isFraud ? "failed" : "completed",
      fraud_detected: isFraud,
    });

    await txn.save();

    console.log(
      `💸 Txn for ${randomUser._id}: ₹${randomAmount} (${txn.type}) | IP: ${ipToUse} | Fraud: ${isFraud}`
    );
  } catch (err) {
    console.error("❌ Error creating auto transaction:", err.message);
  }
}

// Run generator every 10 seconds
setInterval(createAutoTransaction, 10000);

// ====== Start Server ======
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Real-time Server running on port ${PORT}`);
});
