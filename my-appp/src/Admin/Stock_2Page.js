import React from "react";
import Sidebar from "./Sidebar";
import Stock_2 from "./Stock_2";

const Stock_2Page = () => {
  return (
    <div className="d-flex">
      {/* Sidebar - Fixed width and proper border */}
      <div className="sidebar-container" style={{ width: "250px" }}>
        <Sidebar />
      </div>

      {/* Dashboard - Flexible layout */}
      <div className="flex-grow-1 bg-light">
        <Stock_2 />
      </div>
    </div>
  );
};

export default Stock_2Page;
