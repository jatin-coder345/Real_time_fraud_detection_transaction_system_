import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEnvelope, FaPhone, FaUser, FaArrowLeft, FaEdit } from "react-icons/fa";
import "./Profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success / error

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setFormData(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { firstName, lastName, phone } = formData;

    if (!firstName || !lastName || !phone) {
      showPopup("⚠️ Please fill in all fields.", "error");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      showPopup("⚠️ Enter a valid 10-digit phone number.", "error");
      return false;
    }

    return true;
  };

  const showPopup = (msg, type) => {
    setMessage(msg);
    setMessageType(type);

    // Popup stays visible for exactly 3 seconds
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/auth/update/${user._id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      setIsEditing(false);

      showPopup("✅ Profile updated successfully!", "success");
    } catch (error) {
      console.error("Update error:", error);
      showPopup("❌ Failed to update profile.", "error");
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>

        <div className="profile-avatar">
          <FaUser size={90} color="#2563eb" />
        </div>

        {/* ✅ Popup message */}
        {message && (
          <div className={`message-box ${messageType}`}>
            {message}
          </div>
        )}

        {!isEditing ? (
          <>
            <h2>{user.firstName || "User"}</h2>
            <p className="role-text">{user.role}</p>

            <div className="profile-info">
              <p><FaEnvelope /> <strong>Email:</strong> {user.email}</p>
              <p><FaPhone /> <strong>Contact:</strong> {user.phone || "Not provided"}</p>
              <p><FaUser /> <strong>User ID:</strong> {user._id}</p>
              <p><FaUser /> <strong>Username/Login ID:</strong> {user.userId}</p>
            </div>

            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              <FaEdit /> Edit Profile
            </button>
          </>
        ) : (
          <>
            <h2>Edit Profile</h2>
            <div className="edit-form">
              <label>First Name</label>
              <input
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
              />

              <label>Last Name</label>
              <input
                name="lastName"
                value={formData.lastName || ""}
                onChange={handleChange}
              />

              <label>Phone</label>
              <input
                name="phone"
                type="tel"
                value={formData.phone || ""}
                onChange={handleChange}
              />

              <div className="edit-actions">
                <button onClick={handleSave}>Save</button>
                <button
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
