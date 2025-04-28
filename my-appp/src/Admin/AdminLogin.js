import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../src/assets/Logo.jpeg";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5005/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("admin-auth", "true");
        navigate("/dashboard");
      }
       else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="text-center mb-4">
        <img src={logo} alt="Logo" className="mb-2" />
      </div>
      <h2 className="text-center">Admin Login</h2>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="btn w-100"
          style={{ backgroundColor: '#BE6E02', color: 'white' }}
          onClick={handleLogin}
        >
          Admin Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
