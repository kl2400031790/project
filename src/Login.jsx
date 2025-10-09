import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = (role) => {
    if(role === "admin") navigate("/admin");
    else navigate("/user");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Diet Tracker App</h1>
      <button onClick={() => handleLogin("user")}>Login as User</button>
      <button onClick={() => handleLogin("admin")} style={{marginLeft: "10px"}}>Login as Admin</button>
    </div>
  );
};

export default Login;
