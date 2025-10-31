import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  FaChartBar,
  FaExchangeAlt,
  FaCog,
  FaTachometerAlt,
  FaUserCircle,
  FaTable,
  FaSignOutAlt,
  FaQuestionCircle,
  FaUsers,
  FaPlug,
  FaLock,
} from "react-icons/fa";
import "./Reports.css";

const Reports = () => {
  const trendData = [
    { name: "Mon", value: 120 },
    { name: "Tue", value: 180 },
    { name: "Wed", value: 160 },
    { name: "Thu", value: 220 },
    { name: "Fri", value: 300 },
    { name: "Sat", value: 250 },
    { name: "Sun", value: 180 },
  ];

  const pieData = [
    { name: "High Risk", value: 15 },
    { name: "Medium Risk", value: 30 },
    { name: "Low Risk", value: 55 },
  ];
  const COLORS = ["#f87171", "#facc15", "#4ade80"];

  const reportSummary = [
    { title: "Total Reports", value: "1,248", color: "#4f46e5" },
    { title: "Fraud Detected", value: "48", color: "#f43f5e" },
    { title: "Review Pending", value: "12", color: "#f59e0b" },
    { title: "Resolved Cases", value: "36", color: "#22c55e" },
    { title: "Detection Accuracy", value: "97.8%", color: "#0ea5e9" },
  ];

   const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/login");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="user-section">
          <FaUserCircle className="user-icon" />
          <h3></h3>
          <p></p>
        </div>

        <nav className="nav-menu">
          <a href="/Userdashboard"><FaTachometerAlt /> Dashboard</a>
          <a href="/Transactions"><FaExchangeAlt /> Transactions</a>
          <a href="/Reports" className="active"><FaChartBar /> Reports</a>
          <a href="/Help"><FaQuestionCircle /> Help & Support</a>
          <a href="/Users"><FaUsers /> Users</a>
          <a href="/APIs"><FaPlug /> APIs</a>
          <a href="/Settings"><FaCog /> Settings</a>
          <a href="/ChangePassword"><FaLock /> Change Password</a>
        </nav>

        <button className="logout-btn" onClick={handleLogout}><FaSignOutAlt /> Logout</button>
      </aside>

      {/* Main Content */}
      <main className="reports-page">
        <div className="reports-header">
          <h1>📊 Detailed Fraud Detection Reports</h1>
          <p>Real-time insights and detailed analytics of fraud activities</p>
        </div>

        {/* Summary Cards */}
        <div className="summary-cards">
          {reportSummary.map((card, index) => (
            <div key={index} className="summary-card" style={{ borderTop: `4px solid ${card.color}` }}>
              <h4>{card.title}</h4>
              <p>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="charts-grid">
          <div className="chart-card">
            <h3>📈 Weekly Fraud Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trendData}>
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ backgroundColor: "#1e293b", color: "#fff" }} />
                <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>🧠 Risk Level Distribution</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Report Table */}
        <div className="table-section">
          <h3>📋 Recent Fraud Reports</h3>
          <table>
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Date</th>
                <th>User</th>
                <th>Location</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Risk Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>RPT-1021</td>
                <td>2025-10-28</td>
                <td>ACC-93821</td>
                <td>New York, USA</td>
                <td>$2,450</td>
                <td><span className="status under-review">Under Review</span></td>
                <td><span className="risk high">High</span></td>
              </tr>
              <tr>
                <td>RPT-1022</td>
                <td>2025-10-29</td>
                <td>ACC-72930</td>
                <td>California, USA</td>
                <td>$580</td>
                <td><span className="status resolved">Resolved</span></td>
                <td><span className="risk low">Low</span></td>
              </tr>
              <tr>
                <td>RPT-1023</td>
                <td>2025-10-30</td>
                <td>ACC-39481</td>
                <td>Texas, USA</td>
                <td>$1,120</td>
                <td><span className="status blocked">Blocked</span></td>
                <td><span className="risk medium">Medium</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Insights Section */}
        <div className="insights-section">
          <div className="insight-card">
            <h4>🔍 Top 3 Fraud-Prone Regions</h4>
            <ul>
              <li>1️⃣ New York, USA</li>
              <li>2️⃣ Mumbai, India</li>
              <li>3️⃣ London, UK</li>
            </ul>
          </div>
          <div className="insight-card">
            <h4>⚙️ Recommended Actions</h4>
            <ul>
              <li>Enable Multi-Factor Authentication</li>
              <li>Block IPs with repeated failed transactions</li>
              <li>Perform anomaly detection for night transactions</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
