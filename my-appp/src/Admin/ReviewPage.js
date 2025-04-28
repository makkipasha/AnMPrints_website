import React from "react";
import ShowReview from "./ShowReview";
import Sidebar from "./Sidebar";


const ReviewPage = () => {
  return (
    <div className="d-flex">
    {/* Sidebar - Fixed width and proper border */}
    <div className="sidebar-container" style={{ width: "250px" }}>
      <Sidebar />
    </div>

    {/* Dashboard - Flexible layout */}
    <div className="flex-grow-1 bg-light">
      <ShowReview />
    </div>
  </div>
  );
};

export default ReviewPage;
