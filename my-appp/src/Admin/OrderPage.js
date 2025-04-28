import React from "react";
import Order from "./Order";
import Sidebar from "./Sidebar";

const OrderPage = () => {
  return (
    <div className="d-flex">
      {/* Sidebar - Fixed width and proper border */}
      <div className="sidebar-container" style={{ width: "250px" }}>
        <Sidebar />
      </div>

      {/* Dashboard - Flexible layout */}
      <div className="flex-grow-1 bg-light">
        <Order />
      </div>
    </div>
  );
};

export default OrderPage;
