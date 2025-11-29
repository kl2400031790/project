import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      const u = localStorage.getItem("user");
      return u ? JSON.parse(u) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const checkUser = () => {
      try {
        const u = localStorage.getItem("user");
        setUser(u ? JSON.parse(u) : null);
      } catch {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    const handleAuthChange = () => setTimeout(checkUser, 50);
    window.addEventListener("userLogin", handleAuthChange);
    window.addEventListener("userLogout", handleAuthChange);
    const interval = setInterval(checkUser, 300);

    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("userLogin", handleAuthChange);
      window.removeEventListener("userLogout", handleAuthChange);
      clearInterval(interval);
    };
  }, []);

  const features = [
    {
      icon: "📊",
      title: "Nutrient Analysis",
      description: "Track your daily nutrient intake and compare it with recommended values for your age group."
    },
    {
      icon: "🎯",
      title: "Deficit Detection",
      description: "Automatically identify nutrient deficiencies and get alerts for critical gaps in your diet."
    },
    {
      icon: "💡",
      title: "Smart Recommendations",
      description: "Receive personalized food suggestions based on your specific nutrient needs."
    },
    {
      icon: "📈",
      title: "Progress Tracking",
      description: "Monitor your health score and track improvements over time with detailed analytics."
    },
    {
      icon: "🍽️",
      title: "Meal Planning",
      description: "Generate complete daily meal plans tailored to your nutritional requirements."
    },
    {
      icon: "👨‍⚕️",
      title: "Admin Dashboard",
      description: "Comprehensive admin tools to manage nutritional data and track user health metrics."
    }
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 20px" }}>
      {/* Hero Section */}
      <div style={{ textAlign: "center", marginBottom: "80px", padding: "40px 0" }}>
        <div style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#22c55e",
          textTransform: "uppercase",
          letterSpacing: "2px",
          marginBottom: "16px"
        }}>
          HEALTHY HABITS, HAPPY LIFE
        </div>
        <h1 style={{
          fontSize: "56px",
          marginBottom: "20px",
          color: "#1f2937",
          fontWeight: "700",
          lineHeight: "1.2"
        }}>
          Advanced Nutrition Analysis
        </h1>
        <p style={{ fontSize: "22px", color: "#6b7280", marginBottom: "40px", maxWidth: "700px", margin: "0 auto 40px" }}>
          Track your daily nutrient intake, identify deficiencies, and get personalized recommendations for optimal health
        </p>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          {user ? (
            <button
              onClick={() => navigate(user.role === "admin" ? "/admin" : "/user")}
              style={{
                padding: "16px 40px",
                fontSize: "18px",
                fontWeight: "600",
                background: "#22c55e",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#16a34a";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 16px rgba(34, 197, 94, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#22c55e";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 12px rgba(34, 197, 94, 0.3)";
              }}
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/")}
                style={{
                  padding: "16px 40px",
                  fontSize: "18px",
                  fontWeight: "600",
                  background: "#22c55e",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(34, 197, 94, 0.3)",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#16a34a";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 6px 16px rgba(34, 197, 94, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#22c55e";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 12px rgba(34, 197, 94, 0.3)";
                }}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/signup")}
                style={{
                  padding: "16px 40px",
                  fontSize: "18px",
                  fontWeight: "600",
                  background: "white",
                  color: "#22c55e",
                  border: "2px solid #22c55e",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f0fdf4";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "white";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Health Calculators Section */}
      <div style={{ marginBottom: "80px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "16px", fontSize: "36px", color: "#1f2937", fontWeight: "700" }}>
          Health Calculators
        </h2>
        <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "40px", fontSize: "18px" }}>
          Track your health metrics and nutritional intake
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "24px",
          maxWidth: "900px",
          margin: "0 auto"
        }}>
          <div
            className="card"
            style={{
              padding: "32px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: "2px solid transparent"
            }}
            onClick={() => user ? navigate("/user") : navigate("/")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.12)";
              e.currentTarget.style.borderColor = "#22c55e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.04)";
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📊</div>
            <h3 style={{ marginTop: 0, marginBottom: "12px", color: "#1f2937", fontSize: "24px", fontWeight: "600" }}>Nutrient Intake Tracker</h3>
            <p style={{ color: "#6b7280", margin: 0, lineHeight: "1.6", fontSize: "16px" }}>
              Track your daily nutrient intake and compare with recommended values
            </p>
          </div>
          <div
            className="card"
            style={{
              padding: "32px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: "2px solid transparent"
            }}
            onClick={() => user ? navigate("/user") : navigate("/")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.12)";
              e.currentTarget.style.borderColor = "#22c55e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.04)";
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎯</div>
            <h3 style={{ marginTop: 0, marginBottom: "12px", color: "#1f2937", fontSize: "24px", fontWeight: "600" }}>Deficit Detection</h3>
            <p style={{ color: "#6b7280", margin: 0, lineHeight: "1.6", fontSize: "16px" }}>
              Automatically identify nutrient deficiencies and get alerts
            </p>
          </div>
          <div
            className="card"
            style={{
              padding: "32px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: "2px solid transparent"
            }}
            onClick={() => user ? navigate("/user") : navigate("/")}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.12)";
              e.currentTarget.style.borderColor = "#22c55e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.04)";
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>💡</div>
            <h3 style={{ marginTop: 0, marginBottom: "12px", color: "#1f2937", fontSize: "24px", fontWeight: "600" }}>Smart Recommendations</h3>
            <p style={{ color: "#6b7280", margin: 0, lineHeight: "1.6", fontSize: "16px" }}>
              Get personalized food suggestions based on your needs
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div style={{ marginBottom: "80px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "16px", fontSize: "36px", color: "#1f2937", fontWeight: "700" }}>
          Our Services
        </h2>
        <p style={{ textAlign: "center", color: "#6b7280", marginBottom: "40px", fontSize: "18px" }}>
          Comprehensive nutrition analysis and dietary planning
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px"
        }}>
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                padding: "32px",
                textAlign: "center",
                transition: "all 0.3s ease",
                border: "2px solid var(--border)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.12)";
                e.currentTarget.style.borderColor = "#22c55e";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.04)";
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>{feature.icon}</div>
              <h3 style={{ marginTop: 0, marginBottom: "12px", color: "#1f2937", fontSize: "22px", fontWeight: "600" }}>{feature.title}</h3>
              <p style={{ color: "#6b7280", margin: 0, lineHeight: "1.6", fontSize: "16px" }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="card" style={{
        background: "linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(16, 163, 74, 0.08) 100%)",
        padding: "60px 40px",
        textAlign: "center",
        border: "2px solid rgba(34, 197, 94, 0.2)"
      }}>
        <h2 style={{ marginTop: 0, color: "#1f2937", fontSize: "36px", fontWeight: "700", marginBottom: "20px" }}>Perfect for Children & Adolescents</h2>
        <p style={{ fontSize: "20px", color: "#6b7280", marginBottom: "40px", maxWidth: "700px", margin: "0 auto 40px" }}>
          Designed specifically to help parents and healthcare providers monitor and improve
          nutritional health in children and adolescents aged 4-18 years.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px",
          marginTop: "32px"
        }}>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#22c55e" }}>4-8</div>
            <div style={{ color: "#6b7280" }}>Years</div>
          </div>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#22c55e" }}>9-13</div>
            <div style={{ color: "#6b7280" }}>Years</div>
          </div>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#22c55e" }}>14-18</div>
            <div style={{ color: "#6b7280" }}>Years</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

