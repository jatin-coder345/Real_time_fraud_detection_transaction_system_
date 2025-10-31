import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Asettings.css";

const Asettings = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    changePassword: true,
    twoFactorAuth: true,
    notifications: true,
    languageTime: false,

    riskThreshold: true,
    modelSelection: true,
    modelFrequency: false,
    realTimeDetection: false,

    loginToggle: true,
    sessionTimeout: true,
    accountLock: false,
    mfa: false,

    emailAlert: true,
    alertFrequency: true,
    priorityFilter: false,
    autoEscalation: false,
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    alert("You have been logged out.");
    navigate("/home");
  };

  const handleSave = () => {
    alert("✅ Settings saved successfully!");
  };

  return (
    <div className="admin-dashboard fullscreen">
      {/* ===== Sidebar ===== */}
      <aside className="admin-sidebar fullscreen-sidebar">
        <h2 className="logo">FraudGuard Admin</h2>
        <ul className="menu">
          <li onClick={() => navigate("/Admindashboard")}>Dashboard</li>
          <li onClick={() => navigate("/Ausers")}>Users</li>
          <li onClick={() => navigate("/Aapis")}>APIs</li>
          <li onClick={() => navigate("/Ahelp")}>Help & Support</li>
          <li className="active" onClick={() => navigate("/Asettings")}>
            Settings
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="admin-content fullscreen-content">
        <header className="admin-header">
          <h1>Settings</h1>
        </header>

        <section className="settings-grid">
          {/* User Profile Settings */}
          <div className="settings-box">
            <h3>User Profile Settings</h3>
            <div className="setting-item">
              <span>Change password</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.changePassword}
                  onChange={() => handleToggle("changePassword")}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Two-factor authentication</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={() => handleToggle("twoFactorAuth")}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Notification preferences</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={() => handleToggle("notifications")}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Language and timezone selection</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.languageTime}
                  onChange={() => handleToggle("languageTime")}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* Fraud Detection Configuration */}
          <div className="settings-box">
            <h3>Fraud Detection Configuration</h3>
            <div className="setting-item">
              <span>Risk score threshold</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.riskThreshold}
                  onChange={() => handleToggle("riskThreshold")}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Model selection</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.modelSelection}
                  onChange={() => handleToggle("modelSelection")}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Update model frequency</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.modelFrequency}
                  onChange={() => handleToggle("modelFrequency")}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Enable real-time detection</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.realTimeDetection}
                  onChange={() => handleToggle("realTimeDetection")}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* Security Settings */}
          <div className="settings-box">
            <h3>Security Settings</h3>
            <div className="setting-item">
              <span>Login activity toggle</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.loginToggle}
                  onChange={() => handleToggle("loginToggle")}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Session timeout duration</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.sessionTimeout}
                  onChange={() => handleToggle("sessionTimeout")}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Account lock threshold</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.accountLock}
                  onChange={() => handleToggle("accountLock")}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Enable multi-factor authentication</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.mfa}
                  onChange={() => handleToggle("mfa")}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          {/* Alert & Notification Settings */}
          <div className="settings-box">
            <h3>Alert & Notification Settings</h3>
            <div className="setting-item">
              <span>Email/SMS alert toggle</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.emailAlert}
                  onChange={() => handleToggle("emailAlert")}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Alert frequency</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.alertFrequency}
                  onChange={() => handleToggle("alertFrequency")}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Priority level filter</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.priorityFilter}
                  onChange={() => handleToggle("priorityFilter")}
                />
                <span className="slider"></span>
              </label>
            </div>
            <div className="setting-item">
              <span>Auto-escalation rules</span>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.autoEscalation}
                  onChange={() => handleToggle("autoEscalation")}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </section>

        <div className="save-container">
          <button className="save-btn" onClick={handleSave}>Save</button>
        </div>
      </main>
    </div>
  );
};

export default Asettings;
