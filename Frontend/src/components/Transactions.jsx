// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Transactions.css";

// const Transactions = () => {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/transactions/mock-transactions");
//         setTransactions(res.data);
//       } catch (err) {
//         console.error("Error fetching transactions:", err);
//       }
//     };

//     fetchData();
//     const interval = setInterval(fetchData, 10000); // refresh every 10 sec
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="transactions-container">
//       <h2>📊 Real-Time Transactions</h2>

//       {transactions.length === 0 ? (
//         <p>Loading transactions...</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Transaction ID</th>
//               <th>Name</th>
//               <th>IP Address</th>
//               <th>Amount (₹)</th>
//               <th>Merchant</th>
//               <th>Location</th>
//               <th>Timestamp</th>
//               <th>Device Type</th>
//               <th>Fraud Detection</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((txn) => (
//               <tr key={txn.transaction_id} className={txn.fraud_detected ? "fraud-row" : ""}>
//                 <td>{txn.transaction_id}</td>
//                 <td>{txn.name}</td>
//                 <td>{txn.ip_address}</td>
//                 <td>{txn.amount}</td>
//                 <td>{txn.merchant}</td>
//                 <td>{txn.location}</td>
//                 <td>{txn.timestamp}</td>
//                 <td>{txn.device_type}</td>
//                 <td>{txn.fraud_detected ? "⚠️ Fraud" : "✅ Safe"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default Transactions;




import React, { useState } from "react";
import {
  FaChartBar,
  FaExchangeAlt,
  FaCog,
  FaTachometerAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaQuestionCircle,
  FaUsers,
  FaPlug,
  FaLock,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaSearch,
} from "react-icons/fa";
import "./Transactions.css";

const Transactions = () => {
  const [search, setSearch] = useState("");

  const transactions = [
    {
      id: "TXN12345",
      user: "Amit Sharma",
      amount: 2500,
      status: "Successful",
      time: "2025-10-31 10:30 AM",
    },
    {
      id: "TXN12346",
      user: "Priya Verma",
      amount: 800,
      status: "Pending",
      time: "2025-10-31 11:00 AM",
    },
    {
      id: "TXN12347",
      user: "Rohan Singh",
      amount: 12500,
      status: "Fraudulent",
      time: "2025-10-31 11:45 AM",
    },
    {
      id: "TXN12348",
      user: "Sneha Das",
      amount: 4300,
      status: "Successful",
      time: "2025-10-31 12:20 PM",
    },
    {
      id: "TXN12349",
      user: "Karan Mehta",
      amount: 1500,
      status: "Successful",
      time: "2025-10-31 01:10 PM",
    },
  ];

  const filteredTransactions = transactions.filter(
    (txn) =>
      txn.id.toLowerCase().includes(search.toLowerCase()) ||
      txn.user.toLowerCase().includes(search.toLowerCase()) ||
      txn.status.toLowerCase().includes(search.toLowerCase())
  );

 const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="dashboard-container">
      {/* === SIDEBAR === */}
      <aside className="sidebar">
        <div className="user-section">
          <FaUserCircle className="user-icon" />
          <h3></h3>
          <p></p>
        </div>

        <nav className="nav-menu">
          <a href="/Userdashboard"><FaTachometerAlt /> Dashboard</a>
          <a href="/Transactions" className="active"><FaExchangeAlt /> Transactions</a>
          <a href="/Reports"><FaChartBar /> Reports</a>
          <a href="/Help"><FaQuestionCircle /> Help & Support</a>
          <a href="/Users"><FaUsers /> Users</a>
          <a href="/APIs"><FaPlug /> APIs</a>
          <a href="/Settings"><FaCog /> Settings</a>
          <a href="/ChangePassword"><FaLock /> Change Password</a>
        </nav>

        <button className="logout-btn" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
      </aside>

      {/* === MAIN CONTENT === */}
      <main className="transactions-page">
        <header className="transactions-header">
          <h1>💳 Transactions Overview</h1>
          <p>Track, analyze, and manage all transactions in real-time.</p>
        </header>

        {/* === STATS CARDS === */}
        <div className="txn-stats">
          <div className="txn-card">
            <h4>Total Transactions</h4>
            <p>5</p>
          </div>
          <div className="txn-card">
            <h4>Successful</h4>
            <p>3</p>
          </div>
          <div className="txn-card">
            <h4>Pending</h4>
            <p>1</p>
          </div>
          <div className="txn-card">
            <h4>Fraudulent</h4>
            <p>1</p>
          </div>
        </div>

        {/* === SEARCH BAR === */}
        <div className="txn-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by user, status or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* === TRANSACTIONS TABLE === */}
        <section className="txn-table-section">
          <h2>📋 Recent Transactions</h2>
          <table className="txn-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                {/* <th>User</th> */}
                <th>Amount (₹)</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn, index) => (
                <tr key={index}>
                  <td>{txn.id}</td>
                  {/* <td>{txn.user}</td> */}
                  <td>₹{txn.amount.toLocaleString()}</td>
                  <td>
                    <span
                      className={`txn-status ${
                        txn.status === "Successful"
                          ? "success"
                          : txn.status === "Pending"
                          ? "pending"
                          : "fraud"
                      }`}
                    >
                      {txn.status === "Successful" && <FaCheckCircle />}
                      {txn.status === "Pending" && <FaClock />}
                      {txn.status === "Fraudulent" && <FaTimesCircle />}
                      {txn.status}
                    </span>
                  </td>
                  <td>{txn.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Transactions;
