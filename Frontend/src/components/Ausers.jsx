import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // ✅ reuse same styles

const Ausers = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  // ✅ Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/auth/users", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // ✅ Logout Functionality
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
          <li className="active" onClick={() => navigate("/Ausers")}>
            Users
          </li>
          {/* ✅ NEW Live Transactions Section */}
          <li onClick={() => navigate("/AdminLiveTransactions")}>
            Live Transactions
          </li>
          <li onClick={() => navigate("/Aapis")}>APIs</li>
          <li onClick={() => navigate("/Ahelp")}>Help & Support</li>
          <li onClick={() => navigate("/Asettings")}>Settings</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="admin-content fullscreen-content">
        <header className="admin-header">
          <h1>All Registered Users</h1>
          <p>View and manage all users and admins in the system.</p>
        </header>

        {/* ===== Users Table ===== */}
        <section className="table-section fullscreen-table">
          <h2>User Management</h2>
          <table className="transaction-table">
            <thead>
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>Name</th>
                <th>Email / Login ID</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.userId}</td>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email || user.loginId}</td>
                    <td className={user.role === "admin" ? "fraud" : "legit"}>
                      {user.role === "admin" ? "Admin" : "User"}
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          user.isActive ? "active" : "active"
                        }`}
                      >
                        {user.isActive ? "Active" : "active"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No users found
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

export default Ausers;
