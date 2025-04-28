import React from "react";
import Headline from './headline.js';
import Sidebar from "./Sidebar";


const HeadlinePage = () => {
  return (
    <div className="d-flex">
    {/* Sidebar - Fixed width and proper border */}
    <div className="sidebar-container" style={{ width: "250px" }}>
      <Sidebar />
    </div>

    {/* Dashboard - Flexible layout */}
    <div className="flex-grow-1 bg-light">
      <Headline />
    </div>
  </div>
  );
};

export default HeadlinePage;
