// routes/transactionRoutes.js
import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// ✅ Fetch transactions for a specific user
// Get transactions for a specific user
// ✅ Get all transactions for a specific user (by ID)
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Use $eq and ObjectId comparison
    const transactions = await Transaction.find({ user: userId }).sort({ createdAt: -1 });

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching user transactions:", error.message);
    res.status(500).json({ message: "Server error fetching user transactions" });
  }
});



// ✅ Add new transaction
router.post("/", async (req, res) => {
  try {
    const { user, amount, type, description } = req.body;

    const fraud_detected = amount > 20000;
    const txn = new Transaction({
      user,
      amount,
      type,
      description,
      fraud_detected,
      status: fraud_detected ? "failed" : "completed",
    });

    await txn.save();
    res.json(txn);
  } catch (err) {
    console.error("❌ Error creating transaction:", err.message);
    res.status(500).json({ message: "Error creating transaction" });
  }
});

// ✅ Simulate random transaction
router.get("/simulate/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const randomTxn = new Transaction({
      user: userId, // ✅ correct reference
      amount: Math.floor(Math.random() * 50000),
      type: Math.random() > 0.5 ? "credit" : "debit",
      description: "Simulated transaction",
    });

    await randomTxn.save();
    res.json(randomTxn);
  } catch (err) {
    console.error("❌ Error simulating transaction:", err.message);
    res.status(500).json({ message: "Simulation failed" });
  }
});

export default router;
