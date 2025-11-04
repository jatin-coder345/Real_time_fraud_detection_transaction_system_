import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Userdashboard from "./components/Userdashboard";
import AdminDashboard from "./components/AdminDashboard";
import Transactions from "./components/Transactions"; // ✅ import the new component
import ChangePassword from "./components/ChangePassword";
import Reports from "./components/Reports";
import Settings from "./components/Settings";
import Users from "./components/Users";
import Help from "./components/Help";
import APIs from "./components/APIs";
import Ausers from "./components/Ausers";
import Aapis from "./components/Aapis";
import Ahelp from "./components/Ahelp";
import Asettings from "./components/Asettings";
import  AdminLiveTransactions from "./components/AdminLiveTransactions";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";










function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to Home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Home Page */}
        <Route path="/home" element={<Home />} />

        {/* User Dashboard */}
        <Route path="/userdashboard" element={<Userdashboard />} />

        {/* Admin Dashboard */}
        <Route path="/admindashboard" element={<AdminDashboard />} />

        {/* Signup Page */}
        <Route path="/signup" element={<SignUp />} />

        {/* Transactions Page */}
      <Route path="/transactions" element={<Transactions />} />
      
        Fallback for unknown routes
        {/* { <Route path="*" element={<Navigate to="/PageNotFound" replace />} /> } */}

        <Route path="/change-password" element={<ChangePassword />} />

        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/users" element={<Users />} />
        <Route path="/help" element={<Help />} />
        <Route path="/apis" element={<APIs />} />
        <Route path="/ausers" element={<Ausers />} />
        <Route path="/Aapis" element={<Aapis />} />
        <Route path="/ahelp" element={<Ahelp />} />
        <Route path="/asettings" element={<Asettings />} />
        <Route path="/AdminLiveTransactions" element={<AdminLiveTransactions />} />
        <Route path="/profile" element={<Profile />} />
         <Route path="*" element={<PageNotFound/>} />

        


      </Routes>
    </Router>
  );
}

export default App;
