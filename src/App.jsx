import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Link } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UserDashboard from "./UserDashboard";
import AdminDashboard from "./AdminDashboard";
import HomePage from "./HomePage";
import "./App.css";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      return null;
    }
  });

  // Check user directly from localStorage on every render
  const getUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        return JSON.parse(userStr);
      }
      return null;
    } catch (e) {
      return null;
    }
  };

  // Sync user state with localStorage
  useEffect(() => {
    const currentUser = getUser();
    if (currentUser !== user) {
      setUser(currentUser);
    }
  }, [location.pathname]);

  useEffect(() => {
    // Listen for custom login/logout events from the same tab
    const handleAuthChange = () => {
      const currentUser = getUser();
      setUser(currentUser);
    };
    
    window.addEventListener('userLogin', handleAuthChange);
    window.addEventListener('userLogout', handleAuthChange);
    
    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      const currentUser = getUser();
      setUser(currentUser);
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('userLogin', handleAuthChange);
      window.removeEventListener('userLogout', handleAuthChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('[data-profile-menu]')) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null); // Update state immediately
    setShowProfileMenu(false);
    // Dispatch event to notify of logout
    window.dispatchEvent(new Event('userLogout'));
    // Navigate to home page
    navigate('/home');
  };

  const getInitials = (email) => {
    if (!email) return 'U';
    const parts = email.split('@')[0];
    return parts.substring(0, 2).toUpperCase();
  };

  const truncateEmail = (email, maxLength = 20) => {
    if (!email) return '';
    if (email.length <= maxLength) return email;
    return email.substring(0, maxLength) + '...';
  };

  // Close menu when navigating
  useEffect(() => {
    setShowProfileMenu(false);
  }, [location.pathname]);

  return (
    <header className="app-header" style={{ padding: "16px 24px" }}>
      <div className="brand" style={{ cursor: "pointer", fontSize: "28px", fontWeight: "700" }} onClick={() => navigate("/home")}>
        🥗 Diet Balance
      </div>
      <nav className="nav">
        {!user ? (
          <>
            <Link to="/home" className="nav-button signin-btn">Home</Link>
            <Link to="/signup" className="nav-button signup-btn">Sign Up</Link>
            <Link to="/" className="nav-button signin-btn">Sign In</Link>
          </>
        ) : (
          <>
            <Link to="/home" className="nav-button signin-btn">Home</Link>
            <div style={{ position: "relative" }} data-profile-menu>
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 16px",
                  background: "var(--primary)",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "500",
                  transition: "background 0.2s ease"
                }}
                onMouseEnter={(e) => e.target.style.background = "var(--primary-dark)"}
                onMouseLeave={(e) => e.target.style.background = "var(--primary)"}
              >
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: "600"
                }}>
                  {getInitials(user.email)}
                </div>
                <span style={{ maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {truncateEmail(user.email, 15)}
                </span>
                <span style={{ fontSize: "10px" }}>▼</span>
              </button>
              {showProfileMenu && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: "8px",
                  background: "white",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  minWidth: "200px",
                  zIndex: 1000,
                  animation: "fadeIn 0.2s ease"
                }}>
                  <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
                    <div style={{ fontWeight: "600", color: "var(--text)", marginBottom: "4px" }}>
                      {user.email}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--muted)" }}>
                      {user.role === 'admin' ? 'Administrator' : 'User'}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "transparent",
                      border: "none",
                      textAlign: "left",
                      cursor: "pointer",
                      color: "#ef4444",
                      fontWeight: "500",
                      borderTop: "1px solid var(--border)",
                      borderRadius: "0 0 8px 8px"
                    }}
                    onMouseEnter={(e) => e.target.style.background = "#fef2f2"}
                    onMouseLeave={(e) => e.target.style.background = "transparent"}
                  >
                    🚪 Log Out
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}

function AppContent() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/user" element={<div className="card"><UserDashboard /></div>} />
          <Route path="/admin" element={<div className="card"><AdminDashboard /></div>} />
        </Routes>
        <footer style={{ textAlign: "center", color: "#6b7280", margin: "24px 0", padding: "24px 0" }}>
          <p style={{ margin: "8px 0" }}>© {new Date().getFullYear()} Diet Balance - Advanced Nutrition Analysis System</p>
          <p style={{ margin: "8px 0", fontSize: "14px" }}>
            Helping children and adolescents achieve optimal nutritional health
          </p>
        </footer>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
