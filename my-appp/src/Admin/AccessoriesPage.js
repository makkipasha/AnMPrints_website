import React from "react";
import Accessories from "./Accessories";
import Sidebar from "./Sidebar";


const AccessoriesPage = () => {
  return (
    <div className="d-flex">
    {/* Sidebar - Fixed width and proper border */}
    <div className="sidebar-container" style={{ width: "250px" }}>
      <Sidebar />
    </div>

    {/* Dashboard - Flexible layout */}
    <div className="flex-grow-1 bg-light">
      <Accessories />
    </div>
  </div>
  );
};

export default AccessoriesPage;
