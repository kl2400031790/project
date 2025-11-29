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
  const [selectedContent, setSelectedContent] = useState(() => {
    try {
      const content = localStorage.getItem("selectedNavContent");
      return content ? JSON.parse(content) : null;
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

    const handleNavContentSelected = (event) => {
      setSelectedContent(event.detail);
    };

    const checkSelectedContent = () => {
      try {
        const content = localStorage.getItem("selectedNavContent");
        setSelectedContent(content ? JSON.parse(content) : null);
      } catch {
        setSelectedContent(null);
      }
    };

    checkUser();
    checkSelectedContent();
    window.addEventListener("storage", () => {
      checkUser();
      checkSelectedContent();
    });
    window.addEventListener("navContentSelected", handleNavContentSelected);
    const handleAuthChange = () => setTimeout(checkUser, 50);
    window.addEventListener("userLogin", handleAuthChange);
    window.addEventListener("userLogout", handleAuthChange);
    const interval = setInterval(checkUser, 300);

    return () => {
      window.removeEventListener("storage", checkUser);
      window.removeEventListener("navContentSelected", handleNavContentSelected);
      window.removeEventListener("userLogin", handleAuthChange);
      window.removeEventListener("userLogout", handleAuthChange);
      clearInterval(interval);
    };
  }, []);

  const features = [
    {
      icon: "📊",
      title: "Nutrient Analysis",
      description: "Track your daily nutrient intake and compare it with recommended values for your age group.",
      route: user ? "/user" : "/"
    },
    {
      icon: "🎯",
      title: "Nutrient Deficient",
      description: "Automatically identify nutrient deficiencies and get alerts for critical gaps in your diet.",
      route: "/nutrient-deficient"
    },
    {
      icon: "💡",
      title: "Smart Recommendations",
      description: "Receive personalized food suggestions based on your specific nutrient needs.",
      route: user ? "/user" : "/"
    },
    {
      icon: "📈",
      title: "Progress Tracking",
      description: "Monitor your health score and track improvements over time with detailed analytics.",
      route: user ? "/user" : "/"
    },
    {
      icon: "🍽️",
      title: "Meal Planning",
      description: "Generate complete daily meal plans tailored to your nutritional requirements.",
      route: user ? "/user" : "/"
    },
    {
      icon: "👨‍⚕️",
      title: "Admin Dashboard",
      description: "Comprehensive admin tools to manage nutritional data and track user health metrics.",
      route: user && user.role === "admin" ? "/admin" : "/"
    }
  ];

  return (
    <div style={{ width: "100%", margin: 0, padding: 0 }}>
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

      {/* Content Section - Shows selected dropdown content */}
      {selectedContent && (
        <div id="content-section" style={{ marginBottom: "80px", padding: "40px 20px" }}>
          <div className="card" style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ marginTop: 0, marginBottom: "24px", color: "#1f2937", fontSize: "32px" }}>
              {selectedContent.item}
            </h2>
            {selectedContent.category === "nutritional" && (
              <div>
                {selectedContent.item === "Fat" && (
                  <div>
                    <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#374151" }}>
                      <strong>Fat</strong> is an essential macronutrient that provides energy and helps absorb vitamins. 
                      There are different types of fats:
                    </p>
                    <ul style={{ fontSize: "16px", lineHeight: "1.8", color: "#6b7280", marginTop: "16px" }}>
                      <li><strong>Unsaturated fats:</strong> Found in avocados, nuts, and olive oil - these are healthy fats</li>
                      <li><strong>Saturated fats:</strong> Found in red meat and dairy - consume in moderation</li>
                      <li><strong>Trans fats:</strong> Found in processed foods - should be avoided</li>
                    </ul>
                    <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#6b7280", marginTop: "16px" }}>
                      Aim for 20-35% of daily calories from healthy fats.
                    </p>
                  </div>
                )}
                {selectedContent.item === "Protein" && (
                  <div>
                    <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#374151" }}>
                      <strong>Protein</strong> is crucial for building and repairing tissues, making enzymes and hormones.
                    </p>
                    <ul style={{ fontSize: "16px", lineHeight: "1.8", color: "#6b7280", marginTop: "16px" }}>
                      <li>Adults need 0.8g per kg of body weight daily</li>
                      <li>Good sources: lean meat, fish, eggs, beans, lentils, dairy</li>
                      <li>Essential for muscle growth, immune function, and satiety</li>
                    </ul>
                  </div>
                )}
                {selectedContent.item === "Vitamins and Minerals" && (
                  <div>
                    <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#374151" }}>
                      <strong>Vitamins and Minerals</strong> are micronutrients essential for various bodily functions.
                    </p>
                    <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#6b7280", marginTop: "16px" }}>
                      Click here to analyze your nutrient deficiencies and get personalized recommendations.
                    </p>
                    <button
                      onClick={() => navigate("/nutrient-deficient")}
                      style={{
                        marginTop: "20px",
                        padding: "12px 24px",
                        background: "#22c55e",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "600"
                      }}
                    >
                      Analyze My Nutrients
                    </button>
                  </div>
                )}
                {!["Fat", "Protein", "Vitamins and Minerals"].includes(selectedContent.item) && (
                  <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#374151" }}>
                    Learn more about <strong>{selectedContent.item}</strong> and how it affects your nutrition. 
                    Track your intake and get personalized recommendations by signing in to your dashboard.
                  </p>
                )}
              </div>
            )}
            {selectedContent.category === "nutritionFor" && (
              <div>
                <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#374151" }}>
                  Nutrition needs vary by age group. <strong>{selectedContent.item}</strong> have specific nutritional requirements:
                </p>
                <ul style={{ fontSize: "16px", lineHeight: "1.8", color: "#6b7280", marginTop: "16px" }}>
                  <li>Age-appropriate calorie and nutrient targets</li>
                  <li>Growth and development considerations</li>
                  <li>Special dietary needs and restrictions</li>
                </ul>
                {!user && (
                  <button
                    onClick={() => navigate("/")}
                    style={{
                      marginTop: "20px",
                      padding: "12px 24px",
                      background: "#22c55e",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "600"
                    }}
                  >
                    Sign In to Get Personalized Plan
                  </button>
                )}
              </div>
            )}
            {selectedContent.category === "healthConditions" && (
              <div>
                <div style={{ 
                  padding: "16px", 
                  background: "#fef3c7", 
                  borderRadius: "8px", 
                  marginBottom: "20px",
                  border: "1px solid #fbbf24"
                }}>
                  <p style={{ margin: 0, color: "#92400e", fontWeight: "600" }}>
                    ✓ Your health condition has been saved: <strong>{selectedContent.item}</strong>
                  </p>
                  <p style={{ margin: "8px 0 0 0", fontSize: "14px", color: "#78350f" }}>
                    All diet plans and recommendations will now consider this condition.
                  </p>
                </div>
                {selectedContent.item === "Diabetes" && (
                  <div>
                    <h3 style={{ color: "#1f2937", marginTop: 0 }}>Diabetes-Friendly Diet Plan</h3>
                    <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#374151" }}>
                      For <strong>Diabetes</strong>, we focus on:
                    </p>
                    <ul style={{ fontSize: "16px", lineHeight: "1.8", color: "#6b7280", marginTop: "16px" }}>
                      <li><strong>Low glycemic index foods:</strong> Whole grains, vegetables, legumes</li>
                      <li><strong>Controlled carbohydrates:</strong> 45-60g per meal, spread throughout the day</li>
                      <li><strong>High fiber:</strong> At least 25-30g daily to help control blood sugar</li>
                      <li><strong>Lean proteins:</strong> Fish, chicken, beans, tofu</li>
                      <li><strong>Healthy fats:</strong> Nuts, avocados, olive oil</li>
                      <li><strong>Avoid:</strong> Sugary drinks, refined carbs, processed foods</li>
                    </ul>
                    <div style={{ 
                      marginTop: "24px", 
                      padding: "20px", 
                      background: "#f0fdf4", 
                      borderRadius: "8px",
                      border: "1px solid #86efac"
                    }}>
                      <h4 style={{ marginTop: 0, color: "#166534" }}>Sample Diabetes-Friendly Daily Plan:</h4>
                      <div style={{ fontSize: "15px", lineHeight: "2", color: "#374151" }}>
                        <p><strong>Breakfast:</strong> Oatmeal with berries and nuts (45g carbs, 8g fiber)</p>
                        <p><strong>Lunch:</strong> Grilled chicken salad with quinoa (50g carbs, 10g fiber)</p>
                        <p><strong>Dinner:</strong> Baked salmon with steamed vegetables and brown rice (55g carbs, 12g fiber)</p>
                        <p><strong>Snacks:</strong> Apple with almond butter, Greek yogurt</p>
                      </div>
                    </div>
                  </div>
                )}
                {selectedContent.item === "Heart Disease" && (
                  <div>
                    <h3 style={{ color: "#1f2937", marginTop: 0 }}>Heart-Healthy Diet Plan</h3>
                    <ul style={{ fontSize: "16px", lineHeight: "1.8", color: "#6b7280", marginTop: "16px" }}>
                      <li><strong>Omega-3 rich foods:</strong> Fatty fish, walnuts, flaxseeds</li>
                      <li><strong>Low sodium:</strong> Less than 2,300mg daily</li>
                      <li><strong>Fruits and vegetables:</strong> 5+ servings daily</li>
                      <li><strong>Whole grains:</strong> Oats, brown rice, whole wheat</li>
                      <li><strong>Limit:</strong> Saturated fats, trans fats, sodium, processed foods</li>
                    </ul>
                  </div>
                )}
                {selectedContent.item === "Obesity" && (
                  <div>
                    <h3 style={{ color: "#1f2937", marginTop: 0 }}>Weight Management Diet Plan</h3>
                    <ul style={{ fontSize: "16px", lineHeight: "1.8", color: "#6b7280", marginTop: "16px" }}>
                      <li><strong>Calorie control:</strong> Moderate calorie deficit (500-750 kcal/day)</li>
                      <li><strong>High protein:</strong> 25-30% of calories to maintain muscle</li>
                      <li><strong>High fiber:</strong> Promotes satiety and digestive health</li>
                      <li><strong>Portion control:</strong> Smaller, frequent meals</li>
                      <li><strong>Regular exercise:</strong> Combined with diet for best results</li>
                    </ul>
                  </div>
                )}
                {!["Diabetes", "Heart Disease", "Obesity"].includes(selectedContent.item) && (
                  <div>
                    <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#374151" }}>
                      Managing <strong>{selectedContent.item}</strong> through proper nutrition is essential for health and well-being.
                    </p>
                    <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#6b7280", marginTop: "16px" }}>
                      Our platform will tailor all diet plans and recommendations to help manage your condition.
                    </p>
                  </div>
                )}
                <div style={{ display: "flex", gap: "12px", marginTop: "24px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => navigate(user ? "/user" : "/")}
                    style={{
                      padding: "12px 24px",
                      background: "#22c55e",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "600"
                    }}
                  >
                    {user ? "Generate My Diet Plan" : "Sign In to Get Started"}
                  </button>
                  <button
                    onClick={() => {
                      localStorage.removeItem("userHealthCondition");
                      localStorage.removeItem("selectedNavContent");
                      setSelectedContent(null);
                    }}
                    style={{
                      padding: "12px 24px",
                      background: "transparent",
                      color: "#6b7280",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "16px"
                    }}
                  >
                    Clear Condition
                  </button>
                </div>
              </div>
            )}
            {selectedContent.category === "healthyDiet" && (
              <div>
                <p style={{ fontSize: "18px", lineHeight: "1.8", color: "#374151" }}>
                  <strong>{selectedContent.item}</strong> is an important aspect of maintaining a healthy lifestyle.
                </p>
                <p style={{ fontSize: "16px", lineHeight: "1.8", color: "#6b7280", marginTop: "16px" }}>
                  Our platform offers tools and recommendations to help you create and maintain a healthy diet plan.
                </p>
                <button
                  onClick={() => navigate(user ? "/user" : "/")}
                  style={{
                    marginTop: "20px",
                    padding: "12px 24px",
                    background: "#22c55e",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "16px",
                    fontWeight: "600"
                  }}
                >
                  {user ? "Access Meal Planning Tools" : "Sign In to Get Started"}
                </button>
              </div>
            )}
            <button
              onClick={() => setSelectedContent(null)}
              style={{
                marginTop: "24px",
                padding: "8px 16px",
                background: "transparent",
                color: "#6b7280",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "14px"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

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
                border: "2px solid var(--border)",
                cursor: "pointer"
              }}
              onClick={() => navigate(feature.route)}
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
        <h2 style={{ marginTop: 0, color: "#1f2937", fontSize: "36px", fontWeight: "700", marginBottom: "20px" }}>Perfect for Everyone</h2>
        <p style={{ fontSize: "20px", color: "#6b7280", marginBottom: "40px", maxWidth: "700px", margin: "0 auto 40px" }}>
          Designed to help individuals of all ages monitor and improve their nutritional health.
          Whether you're a child, adolescent, adult, or senior, our platform provides personalized
          nutrition analysis and recommendations tailored to your specific needs.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "24px",
          marginTop: "32px"
        }}>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#22c55e" }}>All Ages</div>
            <div style={{ color: "#6b7280" }}>Welcome</div>
          </div>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#22c55e" }}>Personalized</div>
            <div style={{ color: "#6b7280" }}>Plans</div>
          </div>
          <div>
            <div style={{ fontSize: "32px", fontWeight: "bold", color: "#22c55e" }}>Smart</div>
            <div style={{ color: "#6b7280" }}>Recommendations</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HomePage;

