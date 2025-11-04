import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Aapis.css";

const Aapis = () => {
  const navigate = useNavigate();
  const [apis, setApis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // ✅ Simulate fetching fake APIs (Mock Data)
  useEffect(() => {
    const fetchFakeApis = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const fakeApiData = [
          {
            _id: "api001",
            name: "Transaction Validator API",
            endpoint: "/api/validate/transaction",
            createdBy: "Admin",
            isActive: true,
          },
          {
            _id: "api002",
            name: "Fraud Detection API",
            endpoint: "/api/fraud/check",
            createdBy: "System",
            isActive: true,
          },
          {
            _id: "api003",
            name: "User Risk Analyzer",
            endpoint: "/api/users/risk-score",
            createdBy: "DevOps",
            isActive: false,
          },
          {
            _id: "api004",
            name: "Data Logging API",
            endpoint: "/api/logs/store",
            createdBy: "Admin",
            isActive: true,
          },
          {
            _id: "api005",
            name: "Notification Sender",
            endpoint: "/api/notify/send",
            createdBy: "Automation",
            isActive: false,
          },
        ];

        setApis(fakeApiData);
      } catch (error) {
        console.error("Error loading fake APIs:", error);
        setMessage("❌ Failed to load mock API data.");
      } finally {
        setLoading(false);
      }
    };

    fetchFakeApis();
  }, []);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("You have been logged out.");
    navigate("/home");
  };

  return (
    <div className="admin-dashboard fullscreen">
      {/* ===== Sidebar ===== */}
      <aside className="admin-sidebar fullscreen-sidebar">
        <h2 className="logo">Fraud Detection</h2>
        <ul className="menu">
          <li onClick={() => navigate("/Admindashboard")}>Dashboard</li>
          <li onClick={() => navigate("/Ausers")}>Users</li>
           <li onClick={() => navigate("/AdminLiveTransactions")}>
            Live Transactions
          </li>
          <li onClick={() => navigate("/Aapis")} className="active">
            APIs
          </li>
         
          <li onClick={() => navigate("/Ahelp")}>Help & Support</li>
          <li onClick={() => navigate("/Asettings")}>Settings</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="admin-content fullscreen-content">
        <header className="admin-header">
          <h1>API Management</h1>
          <p>Manage system integrations and active API endpoints.</p>
        </header>

        {/* ===== API Table Section ===== */}
        <section className="api-section">
          {loading ? (
            <p className="loading">Loading APIs...</p>
          ) : message ? (
            <p className="error">{message}</p>
          ) : (
            <div className="table-container">
              <table className="api-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>API ID</th>
                    <th>API Name</th>
                    <th>Endpoint</th>
                    <th>Created By</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {apis.map((api, index) => (
                    <tr key={api._id}>
                      <td>{index + 1}</td>
                      <td>{api._id}</td>
                      <td>{api.name}</td>
                      <td className="endpoint">{api.endpoint}</td>
                      <td>{api.createdBy}</td>
                      <td>
                        <span
                          className={`status-badge ${
                            api.isActive ? "active" : "inactive"
                          }`}
                        >
                          {api.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Aapis;
