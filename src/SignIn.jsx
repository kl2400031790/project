// src/SignIn.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Call backend API to login
      const requestBody = {
        email: email,
        password: password
      };
      
      console.log('Sending login request:', { email: requestBody.email });
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', response.status, response.statusText);

      // Parse JSON response safely
      let data;
      const text = await response.text();
      console.log('Response text:', text);
      
      // Check if response is ok first
      if (!response.ok) {
        // Try to parse error message from response
        if (text) {
          try {
            data = JSON.parse(text);
            const errorMsg = data.error || `Invalid email or password (${response.status})`;
            console.error('Backend error:', errorMsg);
            throw new Error(errorMsg);
          } catch (parseError) {
            // If it's the error we just threw, re-throw it
            if (parseError instanceof Error && parseError.message && !parseError.message.includes('JSON')) {
              throw parseError;
            }
            // JSON parse failed, use the text as error
            console.error('Parse error, using text as error:', text);
            throw new Error(text || `Server error (${response.status})`);
          }
        } else {
          // Empty error response
          console.error('Empty error response');
          throw new Error(`Server error (${response.status}). Please try again.`);
        }
      }

      // Success response - parse the data
      if (text) {
        try {
          data = JSON.parse(text);
          console.log('Login successful:', data);
        } catch (parseError) {
          console.error('JSON parse error:', parseError);
          throw new Error('Invalid response from server. Please try again.');
        }
      } else {
        throw new Error('Empty response from server');
      }

      // Success! Store user info and navigate
      localStorage.setItem('user', JSON.stringify(data));
      
      // Dispatch event to notify header of login
      window.dispatchEvent(new Event('userLogin'));
      
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (err) {
      // Handle network errors (backend not running)
      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Cannot connect to server. Please make sure the backend server is running on port 5174.');
      } else {
        setError(err.message || "Invalid email or password");
      }
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      backgroundColor: "#f9fafb"
    }}>
      <div className="signin-container" style={{
        maxWidth: "600px",
        width: "100%",
        padding: "48px",
        background: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(10px)",
        borderRadius: "16px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)"
      }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{
          fontSize: "48px",
          marginBottom: "16px"
        }}>🥗</div>
        <h2 style={{
          marginTop: 0,
          fontSize: "32px",
          background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }}>Welcome to Diet Balance</h2>
        <p style={{ color: "#6b7280", marginTop: 0, fontSize: "18px" }}>
          Analyze meals, spot deficits, and get smart personalized recommendations.
        </p>
      </div>
      <form onSubmit={handleSignIn}>
        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", marginBottom: "12px", color: "#374151", fontWeight: "600", fontSize: "16px" }}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "16px", fontSize: "18px", boxSizing: "border-box", borderRadius: "8px", border: "2px solid #e5e7eb" }}
          />
        </div>
        <div style={{ marginBottom: "28px" }}>
          <label style={{ display: "block", marginBottom: "12px", color: "#374151", fontWeight: "600", fontSize: "16px" }}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "16px", fontSize: "18px", boxSizing: "border-box", borderRadius: "8px", border: "2px solid #e5e7eb" }}
          />
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: "100%", 
            padding: "18px", 
            fontSize: "18px", 
            fontWeight: "600",
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
            borderRadius: "8px"
          }}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <div style={{
          fontSize: 12,
          color: "#6b7280",
          marginTop: 16,
          padding: "12px",
          background: "#f0f9ff",
          borderRadius: "6px",
          border: "1px solid #bae6fd"
        }}>
          <strong>Don't have an account?</strong><br />
          <a href="/signup" style={{ color: "#22c55e", textDecoration: "none", fontWeight: "600" }}>
            Create a new account
          </a>
        </div>
        {error && <p className="error" style={{ marginTop: "16px" }}>{error}</p>}
      </form>
      </div>
    </div>
  );
};

export default SignIn;
