import React from "react";
import { useNavigate } from "react-router-dom";
import "./Ahelp.css";
import { FaEnvelope, FaPhoneAlt, FaHeadset, FaLifeRing } from "react-icons/fa";

const Ahelp = () => {
  const navigate = useNavigate();

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
        <h2 className="logo">FraudGuard Admin</h2>
        <ul className="menu">
          <li onClick={() => navigate("/Admindashboard")}>Dashboard</li>
          <li onClick={() => navigate("/Ausers")}>Users</li>
            <li onClick={() => navigate("/AdminLiveTransactions")}>
            Live Transactions
          </li>
          <li onClick={() => navigate("/Aapis")}>APIs</li>
          <li className="active" onClick={() => navigate("/Ahelp")}>
            Help & Support
          </li>
          <li onClick={() => navigate("/Asettings")}>Settings</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="admin-content fullscreen-content">
        <header className="admin-header">
          <h1>Help & Support</h1>
          <p>Find answers to your questions or reach out to our support team.</p>
        </header>

        {/* ===== Support Section ===== */}
        <section className="support-section">
          {/* Quick Actions */}
          <div className="quick-actions">
            <div className="action-card">
              <FaLifeRing className="icon" />
              <h3>System Documentation</h3>
              <p>Learn how FraudGuard APIs and features work.</p>
              <button>View Docs</button>
            </div>
            <div className="action-card">
              <FaHeadset className="icon" />
              <h3>Contact Support</h3>
              <p>Need help? Reach out to our technical support team.</p>
              <button>Email Us</button>
            </div>
            <div className="action-card">
              <FaEnvelope className="icon" />
              <h3>Raise a Ticket</h3>
              <p>Report bugs or request new features easily.</p>
              <button>Submit Ticket</button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-item">
              <h4>1️⃣ How can I reset an admin password?</h4>
              <p>
                Go to <b>Settings → Change Password</b> and update your
                credentials securely. You’ll need to confirm your old password.
              </p>
            </div>
            <div className="faq-item">
              <h4>2️⃣ Why am I seeing “Unauthorized” errors?</h4>
              <p>
                Check if your API token is valid and not expired. Tokens can be
                regenerated from the <b>Settings</b> page.
              </p>
            </div>
            <div className="faq-item">
              <h4>3️⃣ How can I view API usage statistics?</h4>
              <p>
                Visit the <b>APIs</b> page to monitor endpoints, activity, and
                status of integrations.
              </p>
            </div>
          </div>

          {/* Contact Info Card */}
          <div className="contact-card">
            <h3>Need more help?</h3>
            <p>
              Our support team is available 24/7 to assist you with any issue.
            </p>
            <div className="contact-details">
              <p>
                <FaEnvelope /> support@fraudguard.io
              </p>
              <p>
                <FaPhoneAlt /> +91 98765 43210
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Ahelp;
