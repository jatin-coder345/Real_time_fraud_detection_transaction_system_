import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  FaTachometerAlt,
  FaUsers,
  FaPlug,
  FaCog,
  FaSignOutAlt,
  FaChartPie,
  FaShieldAlt,
  FaUserShield,
  FaLifeRing,
} from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalTransactions: 8234,
    fraudCases: 176,
  });

  const [transactions, setTransactions] = useState([
    {
      _id: "TXN001",
      userId: "U101",
      amount: 4500,
      isFraud: false,
      timestamp: new Date().toISOString(),
    },
    {
      _id: "TXN002",
      userId: "U102",
      amount: 12000,
      isFraud: true,
      timestamp: new Date().toISOString(),
    },
    {
      _id: "TXN003",
      userId: "U104",
      amount: 9800,
      isFraud: false,
      timestamp: new Date().toISOString(),
    },
  ]);

  // ✅ Load logged-in admin from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAdmin(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("You have been logged out.");
    navigate("/home");
  };

  const barData = [
    { name: "Jan", fraud: 12, legit: 110 },
    { name: "Feb", fraud: 8, legit: 150 },
    { name: "Mar", fraud: 14, legit: 130 },
    { name: "Apr", fraud: 20, legit: 140 },
    { name: "May", fraud: 10, legit: 170 },
  ];

  const pieData = [
    { name: "Legit Transactions", value: 8060 },
    { name: "Fraudulent Transactions", value: 176 },
  ];

  const COLORS = ["#2ecc71", "#e74c3c"];

  return (
    <div className="admin-dashboard fullscreen">
      {/* ===== Sidebar ===== */}
      <aside className="admin-sidebar fullscreen-sidebar">
        <div className="sidebar-header">
          <FaShieldAlt className="sidebar-logo-icon" />
          <h2 className="logo-text">Fraud Detection</h2>
        </div>

        <h3 className="admin-name">
          <FaUserShield /> Admin: {admin ? admin.firstName : "Admin"}
        </h3>

        <ul className="menu">
          <li className="active" onClick={() => navigate("/Adashboard")}>
            <FaTachometerAlt className="menu-icon" /> Dashboard
          </li>
          <li onClick={() => navigate("/Ausers")}>
            <FaUsers className="menu-icon" /> Users
          </li>
          <li onClick={() => navigate("/Aapis")}>
            <FaPlug className="menu-icon" /> APIs
          </li>
          <li onClick={() => navigate("/Ahelp")}>
            <FaLifeRing className="menu-icon" /> Help & Support
          </li>
          <li onClick={() => navigate("/Asettings")}>
            <FaCog className="menu-icon" /> Settings
          </li>
          <li onClick={handleLogout}>
            <FaSignOutAlt className="menu-icon" /> Logout
          </li>
        </ul>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="admin-content fullscreen-content">
        <header className="admin-header">
          <div>
            <h1>Welcome, {admin ? admin.firstName : "Admin"} 👋</h1>
            <p>Analytics overview of users and transactions in the system.</p>
          </div>
        </header>

        {/* ===== Top Stats Cards ===== */}
        <section className="stats-sectionn">
          <div className="stat-card users">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
          <div className="stat-card transactions">
            <h3>Total Transactions</h3>
            <p>{stats.totalTransactions}</p>
          </div>
          <div className="stat-card fraud">
            <h3>Fraud Cases</h3>
            <p>{stats.fraudCases}</p>
          </div>
        </section>

        {/* ===== Charts Section ===== */}
        <section className="chart-container">
          <div className="chart-card">
            <h2>Fraud vs Legit (Monthly Overview)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="fraud" fill="#e74c3c" name="Fraudulent" />
                <Bar dataKey="legit" fill="#2ecc71" name="Legitimate" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h2>Fraud Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ===== Recent Transactions Table ===== */}
        <section className="table-section fullscreen-table">
          <h2>Recent Transactions</h2>
          <table className="transaction-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((txn) => (
                  <tr key={txn._id}>
                    <td>{txn._id}</td>
                    <td>{txn.userId}</td>
                    <td>₹{txn.amount}</td>
                    <td className={txn.isFraud ? "fraud" : "legit"}>
                      {txn.isFraud ? "Fraud" : "Legit"}
                    </td>
                    <td>{new Date(txn.timestamp).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No transactions available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
