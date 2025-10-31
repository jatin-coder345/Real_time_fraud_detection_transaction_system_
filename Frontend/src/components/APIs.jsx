import React from "react";
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
  FaKey,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import "./APIs.css";

const APIs = () => {
  const apiList = [
    {
      name: "Fraud Detection API",
      endpoint: "/api/fraud/check",
      status: "active",
      callsToday: 1250,
    },
    {
      name: "User Verification API",
      endpoint: "/api/users/verify",
      status: "inactive",
      callsToday: 0,
    },
    {
      name: "Transaction Risk API",
      endpoint: "/api/transactions/risk",
      status: "active",
      callsToday: 872,
    },
    {
      name: "Report Generation API",
      endpoint: "/api/reports/generate",
      status: "active",
      callsToday: 450,
    },
  ];

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
          <a href="/Transactions"><FaExchangeAlt /> Transactions</a>
          <a href="/Reports"><FaChartBar /> Reports</a>
          <a href="/Help"><FaQuestionCircle /> Help & Support</a>
          <a href="/Users"><FaUsers /> Users</a>
          <a href="/APIs" className="active"><FaPlug /> APIs</a>
          <a href="/Settings"><FaCog /> Settings</a>
          <a href="/ChangePassword"><FaLock /> Change Password</a>
        </nav>

        <button className="logout-btn"><FaSignOutAlt /> Logout</button>
      </aside>

      {/* === MAIN CONTENT === */}
      <main className="apis-page">
        <header className="apis-header">
          <h1>🔌 API Management Center</h1>
          <p>Monitor, manage, and test your APIs seamlessly.</p>
        </header>

        {/* === API STATS CARDS === */}
        <div className="api-stats">
          <div className="api-card">
            <h4>Total APIs</h4>
            <p>4</p>
          </div>
          <div className="api-card">
            <h4>Active APIs</h4>
            <p>3</p>
          </div>
          <div className="api-card">
            <h4>Total Calls Today</h4>
            <p>2,572</p>
          </div>
          <div className="api-card">
            <h4>Success Rate</h4>
            <p>98.3%</p>
          </div>
        </div>

        {/* === API TABLE === */}
        <section className="api-table-section">
          <h2>🧠 Registered APIs</h2>
          <table className="api-table">
            <thead>
              <tr>
                <th>API Name</th>
                <th>Endpoint</th>
                <th>Status</th>
                <th>Calls Today</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {apiList.map((api, index) => (
                <tr key={index}>
                  <td>{api.name}</td>
                  <td><code>{api.endpoint}</code></td>
                  <td>
                    <span
                      className={`api-status ${
                        api.status === "active" ? "active" : "inactive"
                      }`}
                    >
                      {api.status === "active" ? (
                        <>
                          <FaCheckCircle /> Active
                        </>
                      ) : (
                        <>
                          <FaTimesCircle /> Inactive
                        </>
                      )}
                    </span>
                  </td>
                  <td>{api.callsToday}</td>
                  <td>
                    <button className="test-btn">
                      <FaKey /> Test API
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* === API INFO === */}
        <section className="api-info-section">
          <div className="info-card">
            <h3>🔐 API Authentication</h3>
            <p>
              Use your <strong>Bearer Token</strong> for authorization in all API
              requests. You can generate new tokens from the settings page.
            </p>
          </div>

          <div className="info-card">
            <h3>📦 API Usage Tips</h3>
            <ul>
              <li>Use pagination for large datasets.</li>
              <li>Handle rate limits gracefully.</li>
              <li>Monitor response codes regularly.</li>
              <li>Enable logging for production systems.</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default APIs;
