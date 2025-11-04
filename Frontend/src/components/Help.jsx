import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Added
import "./Help.css";
import {
  Mail,
  MessageCircle,
  BookOpen,
  Phone,
  Send,
  Headphones,
} from "lucide-react";
import {
  FaChartBar,
  FaExchangeAlt,
  FaCog,
  FaTachometerAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaQuestionCircle,
  FaLock,
} from "react-icons/fa";

const Help = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  // ✅ Fixed logout functionality
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
          <h3>Welcome</h3>
          <p>User Panel</p>
        </div>

        <nav className="nav-menu">
          <a href="/Userdashboard">
            <FaTachometerAlt /> Dashboard
          </a>
          <a href="/Transactions">
            <FaExchangeAlt /> Transactions
          </a>
          <a href="/Reports">
            <FaChartBar /> Reports
          </a>
          <a href="/Help" className="active">
            <FaQuestionCircle /> Help & Support
          </a>
          <a href="/Settings">
            <FaCog /> Settings
          </a>
          <a href="/Change-Password">
            <FaLock /> Change Password
          </a>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* === MAIN CONTENT === */}
      <main className="help-main">
        <div className="help-page">
          <header className="help-header">
            <Headphones className="header-icon" />
            <h1>Help & Support Center</h1>
            <p>
              Need assistance? We’re always here to help you with product issues,
              fraud alerts, or setup guidance.
            </p>
          </header>

          <section className="help-section">
            {/* --- LEFT: Support Info --- */}
            <div className="help-info">
              <div className="info-card">
                <Mail className="icon" />
                <h3>Email Support</h3>
                <p>Reach out anytime for help.</p>
                <span>support@fraudshield.ai</span>
              </div>

              <div className="info-card">
                <Phone className="icon" />
                <h3>Call Us</h3>
                <p>We’re available Mon–Fri, 9AM–6PM.</p>
                <span>+91 98765 43210</span>
              </div>

              <div className="info-card">
                <MessageCircle className="icon" />
                <h3>Live Chat</h3>
                <p>Chat instantly with our experts.</p>
                <button className="chat-btn">Start Chat</button>
              </div>

              <div className="info-card">
                <BookOpen className="icon" />
                <h3>Knowledge Base</h3>
                <p>
                  Explore FAQs, fraud prevention guides, and video tutorials.
                </p>
                <button className="learn-btn">Visit Knowledge Hub</button>
              </div>
            </div>

            {/* --- RIGHT: Contact Form --- */}
            <div className="help-form">
              <h2>Contact Support</h2>
              <p>Submit your query and our team will get back to you shortly.</p>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="John Doe"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="john@example.com"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    placeholder="Issue topic"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    placeholder="Describe your issue..."
                    rows="5"
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="submit-btn">
                  <Send size={16} /> &nbsp; Send Message
                </button>

                {submitted && (
                  <p className="success-msg">✅ Message sent successfully!</p>
                )}
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Help;
