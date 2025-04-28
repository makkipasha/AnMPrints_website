import React from "react";
import Sidebar from "./Sidebar";
import Stock from "./Stock";

const StockPage = () => {
  return (
    <div className="d-flex">
      {/* Sidebar - Fixed width and proper border */}
      <div className="sidebar-container" style={{ width: "250px" }}>
        <Sidebar />
      </div>

      {/* Dashboard - Flexible layout */}
      <div className="flex-grow-1 bg-light">
        <Stock />
      </div>
    </div>
  );
};

export default StockPage;
