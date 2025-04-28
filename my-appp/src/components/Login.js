import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../../src/assets/Logo.jpeg";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignIn = async () => {
        if (!formData.email || !formData.password) {
            setMessage({ type: "danger", text: "Both email and password are required." });
            return;
        }

        try {
            const res = await axios.post("http://localhost:5005/api/auth/login", formData);
            localStorage.setItem("jwtToken", res.data.token);
            setMessage({ type: "success", text: res.data.message });
            setTimeout(() => navigate("/"), 1500);
        } catch (error) {
            setMessage({ type: "danger", text: error.response?.data?.message || "Login failed." });
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
            <div className="text-center mb-4">
                <img src={logo} alt="Logo" className="mb-2" style={{ width: "250px", height: "auto" }} />
            </div>

            <h2 className="text-center">Sign in to your account</h2>
            <p className="text-center text-dark">
                Or <a href="/signup" style={{ color: "#BE6E02", textDecoration: "none" }}>create a new account</a>
            </p>

            {/* ALERT MESSAGE */}
            {message.text && (
                <div className={`alert alert-${message.type} w-100`} style={{ maxWidth: "400px" }}>
                    {message.text}
                </div>
            )}

            <div className="w-100" style={{ maxWidth: "400px" }}>
                <input type="email" name="email" className="form-control mb-3" placeholder="Email address" onChange={handleChange} />
                <input type="password" name="password" className="form-control mb-3" placeholder="Password" onChange={handleChange} />

                <div className="d-flex justify-content-between mb-3">
                    <div>
                        <input type="checkbox" id="rememberMe" />
                        <label htmlFor="rememberMe" className="ms-2">Remember me</label>
                    </div>
                    <a href="#" style={{ color: "#BE6E02", textDecoration: "none" }}>Forgot your password?</a>
                </div>

                <button className="btn w-100" style={{ backgroundColor: "#BE6E02", color: "white" }} onClick={handleSignIn}>
                    Sign in
                </button>

                <div className="mt-4">
                <GoogleLogin
  onSuccess={async (credentialResponse) => {
    const token = credentialResponse.credential;

    try {
      const res = await axios.post("http://localhost:5005/api/auth/google-auth", { token });

      // Store JWT token
      localStorage.setItem("jwtToken", res.data.token); // <-- add this line

      setMessage({ type: "success", text: res.data.message || "Google Sign-In Successful" });

      setTimeout(() => navigate("/"), 1500); // navigate after short delay (optional)

    } catch (err) {
      console.error("Google login failed:", err.response?.data || err);
      setMessage({ type: "danger", text: err.response?.data?.message || "Google Sign-In failed." });
    }
  }}
  onError={() => {
    console.log("Google Login Failed");
    setMessage({ type: "danger", text: "Google Sign-In failed." });
  }}
/>

                </div>
            </div>
        </div>
    );
};

export default Login;
