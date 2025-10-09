// src/SignIn.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Hardcoded users for demo
  const users = [
    { email: "user@example.com", password: "user123", role: "user" },
    { email: "admin@example.com", password: "admin123", role: "admin" },
  ];

  const handleSignIn = (e) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      if (user.role === "user") navigate("/user");
      else navigate("/admin");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="signin-container">
      <h2 style={{ marginTop: 0 }}>Welcome to Diet Balance</h2>
      <p style={{ color: "#6b7280", marginTop: 0 }}>Analyze meals, spot deficits, and get smart suggestions.</p>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={{ width: "100%" }}>Continue</button>
        <div style={{ fontSize: 12, color: "#6b7280", marginTop: 10 }}>Demo users: user@example.com / user123 • admin@example.com / admin123</div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default SignIn;
