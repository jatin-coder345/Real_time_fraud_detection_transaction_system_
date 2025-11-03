// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";

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

// ====== Connect MongoDB ======
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    // 🧹 Drop old index that caused duplicate key error
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
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ====== Setup Socket.IO ======
const io = new Server(httpServer, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  // ===== Listen for user-specific updates =====
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

  // ===== Listen for admin (all users’ transactions) =====
  socket.on("registerAdmin", () => {
    console.log("🧑‍💼 Admin registered for all live transactions");

    const adminChangeStream = Transaction.watch();

    adminChangeStream.on("change", (change) => {
      if (change.operationType === "insert") {
        const newTxn = change.fullDocument;
        io.emit("adminTransaction", newTxn); // emit to all admin clients
      }
    });

    socket.on("disconnect", () => {
      console.log(`🔴 Admin socket ${socket.id} disconnected`);
      adminChangeStream.close();
    });
  });
});

// ====== Auto Transaction Generator ======
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
    const isFraud = randomAmount > 40000; // simple fraud rule

    const txn = new Transaction({
      user: randomUser._id,
      amount: randomAmount,
      type: randomType,
      description: isFraud
        ? "⚠️ Suspicious activity detected"
        : "Normal transaction",
      status: isFraud ? "failed" : "completed",
      fraud_detected: isFraud,
    });

    await txn.save();
    console.log(`💸 Auto Transaction for ${randomUser._id}: ₹${randomAmount} (${txn.type})`);
  } catch (err) {
    console.error("❌ Error creating auto transaction:", err.message);
  }
}

// Run auto generator every 10 seconds
setInterval(createAutoTransaction, 10000);

// ====== Start Server ======
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Real-time Server running on port ${PORT}`);
});
