import React from "react";
import Sidebar from "./Sidebar";
import Stock_4 from "./Stock_4";

const Stock_3Page = () => {
  return (
    <div className="d-flex">
      {/* Sidebar - Fixed width and proper border */}
      <div className="sidebar-container" style={{ width: "250px" }}>
        <Sidebar />
      </div>

      {/* Dashboard - Flexible layout */}
      <div className="flex-grow-1 bg-light">
        <Stock_4 />
      </div>
    </div>
  );
};

export default Stock_3Page;
