import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
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
  FaLock,
  FaTachometerAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaQuestionCircle,
} from "react-icons/fa";

const Help = () => {
  const navigate = useNavigate();
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // ✅ Replace with your real IDs from EmailJS
  


const SERVICE_ID = "narmada123";
const TEMPLATE_ID = "template_6alm0bi";
const PUBLIC_KEY = "wu0Kidkg7ONEiz4XE";
// const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
// const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
// const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;






  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        (result) => {
          console.log("✅ Email Sent:", result.text);
          setSubmitted(true);
          e.target.reset();
          setLoading(false);
        },
        (error) => {
          console.error("❌ Email Error:", error);
          alert("Failed to send message. Please check your EmailJS IDs.");
          setLoading(false);
        }
      );
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.clear();
      navigate("/home");
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="user-section">
          <FaUserCircle className="user-icon" />
          {/* <h3>Welcome</h3>
          <p>User Panel</p> */}
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
          <a href="/Change-Password">
            <FaLock /> Change Password
          </a>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Section */}
      <main className="help-main">
        <div className="help-page">
          <header className="help-header">
            <Headphones className="header-icon" />
            <h1>Help & Support Center</h1>
            <p>
              Need assistance? We're here to help you with issues, fraud alerts,
              or setup guidance.
            </p>
          </header>

          <section className="help-section">
            <div className="help-info">
              <div className="info-card">
                <Mail className="icon" />
                <h3>Email Support</h3>
                <p>Reach us anytime for help.</p>
                <span>support@fraudshield.ai</span>
              </div>

              <div className="info-card">
                <Phone className="icon" />
                <h3>Call Us</h3>
                <p>Mon–Fri, 9AM–6PM.</p>
                <span>+91 98765 43210</span>
              </div>

              <div className="info-card">
                <MessageCircle className="icon" />
                <h3>Live Chat</h3>
                <p>Chat with our experts instantly.</p>
                <button className="chat-btn">Start Chat</button>
              </div>

              <div className="info-card">
                <BookOpen className="icon" />
                <h3>Knowledge Base</h3>
                <p>Explore FAQs, guides, and tutorials.</p>
                <button className="learn-btn">Visit Hub</button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="help-form">
              <h2>Contact Support</h2>
              <p>Submit your query and our team will respond soon.</p>

              <form ref={form} onSubmit={sendEmail}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="from_name"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="from_email"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Transaction issue"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Your Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Describe your issue..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? "Sending..." : <><Send size={16} /> Send Message</>}
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

