// components/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear login state
    localStorage.removeItem("admin-auth");

    // Redirect to login
    navigate("/admin/login");
  }, [navigate]);

  return null; // or a loading spinner if you like
};

export default Logout;
