import React, { useState } from "react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simple validation
      if (!formData.email || !formData.password) {
        throw new Error('Email and password are required');
      }
      
      if (formData.password.length < 3) {
        throw new Error('Password must be at least 3 characters');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Success!
      setSuccess(true);
      console.log('Account created:', formData);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="signin-container">
        <h2 style={{ marginTop: 0, color: "#22c55e" }}>✅ Account Created!</h2>
        <p style={{ color: "#6b7280", marginTop: 0 }}>
          Welcome to Diet Balance, {formData.email}!
        </p>
        <div style={{ padding: 16, backgroundColor: "#f0f9ff", borderRadius: 8, marginTop: 16 }}>
          <h4>Account Details:</h4>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Role:</strong> {formData.role}</p>
          <p><strong>Status:</strong> Active</p>
        </div>
        <button 
          onClick={() => {
            setSuccess(false);
            setFormData({ email: "", password: "", role: "user" });
          }}
          style={{ width: "100%", marginTop: 16 }}
        >
          Create Another Account
        </button>
      </div>
    );
  }

  return (
    <div className="signin-container">
      <h2 style={{ marginTop: 0 }}>Create Account</h2>
      <p style={{ color: "#6b7280", marginTop: 0, marginBottom: 20 }}>
        Join Diet Balance to track your nutrition
      </p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password (min 3 characters)"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={3}
          disabled={loading}
        />
        
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ width: "100%" }}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
        
        {error && (
          <div className="error" style={{ marginTop: 10 }}>
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUp;