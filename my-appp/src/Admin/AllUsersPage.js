import React from "react";
import Sidebar from "./Sidebar";
import AllUsers from "./AllUsers";

const AllUsersPage = () => {
  return (
    <div className="d-flex">
      {/* Sidebar - Fixed width and proper border */}
      <div className="sidebar-container" style={{ width: "250px" }}>
        <Sidebar />
      </div>

      {/* Dashboard - Flexible layout */}
      <div className="flex-grow-1 bg-light">
        <AllUsers />
      </div>
    </div>
  );
};

export default AllUsersPage;
