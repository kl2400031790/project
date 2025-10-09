import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <header className="app-header">
        <div className="brand">Diet Balance</div>
        <nav className="nav">
          <a href="/signup" className="nav-button signup-btn">Sign Up</a>
          <a href="/" className="nav-button signin-btn">Sign In</a>
        </nav>
      </header>
      <div className="container">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user" element={<div className="card"><UserDashboard /></div>} />
          <Route path="/admin" element={<div className="card"><AdminDashboard /></div>} />
        </Routes>
        <footer style={{ textAlign: "center", color: "#6b7280", margin: "24px 0" }}>
          © {new Date().getFullYear()} Diet Balance
        </footer>
      </div>
    </Router>
  );
}

export default App;
