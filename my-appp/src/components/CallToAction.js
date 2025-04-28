import React from "react";
import "./Style/CallToAction.css";
import { useNavigate } from 'react-router-dom';


const CallToAction = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate('/process'); // Navigate to the /process route
  };
  return (
    <div className=" text-center container-fluid CallToAction  py-4">
      <h3>Start Creating Your Custom Design Today</h3>
      <p>Join thousands of satisfied customers who have brought their ideas to life.</p>
      <button 
      className="btn btn-lg fw-bold" 
      onClick={handleNavigate}
    >
      Begin Your Design
    </button>
    </div>
  );
};

export default CallToAction;