import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import logo from "../../src/assets/Logo.jpeg";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async () => {
        if (!formData.fullName || !formData.email || !formData.password) {
            setMessage("All fields are required.");
            setMessageType("danger");
            return;
        }

        try {
            const res = await axios.post("http://localhost:5005/api/auth/signup", formData);
            setMessage(res.data.message);
            setMessageType("success");
            setTimeout(() => navigate("/login"), 1500); // redirect after a short delay
        } catch (error) {
            setMessage(error.response?.data?.message || "Signup failed.");
            setMessageType("danger");
        }
    };

    const handleGoogleSignup = async (credentialResponse) => {
        try {
            const response = await axios.post("http://localhost:5005/api/auth/auth/google-signup", {
                token: credentialResponse.credential,
            });
    
            console.log("Signup successful", response.data);
    
            // Store JWT token
            localStorage.setItem("jwtToken", response.data.token);
    
            // Show success message
            setMessage(response.data.message || "Google Sign-Up Successful");
            setMessageType("success");
    
            // Redirect to home after short delay
            setTimeout(() => navigate("/"), 1500);
    
        } catch (error) {
            console.error("Signup error", error.response?.data || error);
            setMessage(error.response?.data?.message || "Google Sign-Up failed.");
            setMessageType("danger");
        }
    };
    
      

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
            <GoogleOAuthProvider clientId="647246143262-4kth0ruauur8djasicj2emobh3ljfmds.apps.googleusercontent.com">
                <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
                    <div className="text-center ">
                        <img src={logo} alt="Logo"  style={{ width: "250px", height: "auto" }} />
                    </div>
                    <h2 className="text-center">Create an Account</h2>
                    <p className="text-center text-dark">
                        Already have an account?
                        <a href="#" style={{ color: "#BE6E02", textDecoration: "none" }} onClick={() => navigate("/login")}> Sign in</a>
                    </p>

                    {/* Alert Message */}
                    {message && (
                        <div className={`alert alert-${messageType} w-100 text-center`} role="alert" style={{ maxWidth: "400px" }}>
                            {message}
                        </div>
                    )}

                    <div className="w-100" style={{ maxWidth: "400px" }}>
                        <input type="text" name="fullName" className="form-control mb-3" placeholder="Full Name" onChange={handleChange} />
                        <input type="email" name="email" className="form-control mb-3" placeholder="Email address" onChange={handleChange} />
                        <input type="password" name="password" className="form-control mb-3" placeholder="Password" onChange={handleChange} />
                        <button className="btn w-100 mb-3" style={{ backgroundColor: "#BE6E02", color: "white" }} onClick={handleSignUp}>
                            Sign Up
                        </button>
                        <GoogleLogin onSuccess={handleGoogleSignup} onError={() => {
                            setMessage("Google login failed.");
                            setMessageType("danger");
                        }} />
                    </div>
                </div>
            </GoogleOAuthProvider>
        </div>
    );
};


export default Signup;
