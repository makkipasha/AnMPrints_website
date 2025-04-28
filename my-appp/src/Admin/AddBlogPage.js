import React from "react";
import Sidebar from "./Sidebar";
import AddBlog from "./AddBlog";

const AddBlogPage = () => {
  return (
    <div className="d-flex">
      {/* Sidebar - Fixed width and proper border */}
      <div className="sidebar-container" style={{ width: "250px" }}>
        <Sidebar />
      </div>

      {/* Dashboard - Flexible layout */}
      <div className="flex-grow-1 bg-light">
        <AddBlog />
      </div>
    </div>
  );
};

export default AddBlogPage;
