// UserTransactions.jsx
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./UserTransactions.css";

const socket = io("http://localhost:5000");

export default function UserTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // ✅ Load user from localStorage (assuming login stores user info)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch that user's previous transactions
      fetchUserTransactions(parsedUser._id);

      // Register the socket for that user
      socket.emit("registerUser", parsedUser._id);

      // Listen for new live transactions for that user
      socket.on("newTransaction", (txn) => {
        if (txn.user === parsedUser._id) {
          setTransactions((prev) => [txn, ...prev]);
        }
      });
    }

    return () => {
      socket.off("newTransaction");
    };
  }, []);

  // ===== Function to fetch user's old transactions =====
  const fetchUserTransactions = async (userId) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/transactions/user/${userId}`
      );
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching user transactions:", err);
    }
  };

  return (
    <div className="user-transactions-container">
      <h2>💳 My Transactions</h2>
      {user && <p className="welcome">Welcome, {user.name}</p>}

      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Type</th>
              <th>Status</th>
              <th>Description</th>
              <th>Fraud</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((t) => (
                <tr key={t._id}>
                  <td>₹{t.amount}</td>
                  <td>{t.type}</td>
                  <td className={t.status === "failed" ? "failed" : "success"}>
                    {t.status}
                  </td>
                  <td>{t.description}</td>
                  <td>{t.fraud_detected ? "🚨" : "✅"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
