import React from "react";
import Sidebar from "./Sidebar";
import Categories from "./Categories";

const CategoriesPage = () => {
  return (
    <div className="d-flex">
      {/* Sidebar - Fixed width and proper border */}
      <div className="sidebar-container" style={{ width: "250px" }}>
        <Sidebar />
      </div>

      {/* Dashboard - Flexible layout */}
      <div className="flex-grow-1 bg-light">
        <Categories />
      </div>
    </div>
  );
};

export default CategoriesPage;
