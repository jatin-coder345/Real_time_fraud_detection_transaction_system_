// models/Transaction.js
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ✅ reference to User
  amount: { type: Number, required: true },
  type: { type: String, enum: ["credit", "debit"], required: true },
  description: { type: String, default: "" },
  status: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "completed",
  },
  fraud_detected: { type: Boolean, default: false },
  ipAddress: { type: String }, // ✅ new field for tracking IP address
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", transactionSchema);
