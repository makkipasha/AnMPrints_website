import React from "react";
import Merchandise from "./Merchandise";
import Sidebar from "./Sidebar";


const MerchandisePage = () => {
  return (
    <div className="d-flex">
    {/* Sidebar - Fixed width and proper border */}
    <div className="sidebar-container" style={{ width: "250px" }}>
      <Sidebar />
    </div>

    {/* Dashboard - Flexible layout */}
    <div className="flex-grow-1 bg-light">
      <Merchandise />
    </div>
  </div>
  );
};

export default MerchandisePage;
