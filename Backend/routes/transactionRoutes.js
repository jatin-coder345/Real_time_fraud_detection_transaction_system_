
import express from "express";
import axios from "axios";

const router = express.Router();

/**
 * ✅ Route: GET /api/transactions/mock-transactions
 * Fetches mock transaction data from Mockaroo API
 * and adds fraud detection logic
 */
router.get("/mock-transactions", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.mockaroo.com/api/3c7ea470?count=1000&key=51f28880"
    );

    console.log("Mockaroo response type:", typeof response.data);
    console.log("Mockaroo response sample:", response.data);

    // Check if response.data is an array
    if (!Array.isArray(response.data)) {
      return res.status(500).json({
        message: "Invalid Mockaroo response format",
        data: response.data,
      });
    }

    const transactions = response.data.map((txn) => ({
      ...txn,
      fraud_detected:
        txn.amount > 20000 ||
        txn.status === "Failed" ||
        txn.is_fraud === true,
    }));

    res.json(transactions);
  } catch (error) {
    console.error("Error fetching Mockaroo data:", error.message);
    res.status(500).json({ message: "Error fetching mock transactions" });
  }
});
export default router;
