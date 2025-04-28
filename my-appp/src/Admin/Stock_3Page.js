import React from "react";
import Sidebar from "./Sidebar";
import Stock_3 from "./Stock_3";

const Stock_3Page = () => {
  return (
    <div className="d-flex">
      {/* Sidebar - Fixed width and proper border */}
      <div className="sidebar-container" style={{ width: "250px" }}>
        <Sidebar />
      </div>

      {/* Dashboard - Flexible layout */}
      <div className="flex-grow-1 bg-light">
        <Stock_3 />
      </div>
    </div>
  );
};

export default Stock_3Page;
