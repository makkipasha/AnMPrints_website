import React from "react";
import Products from "../Admin/Products";
import Sidebar from "./Sidebar";


const ProductsPage = () => {
  return (
    <div className="d-flex">
    {/* Sidebar - Fixed width and proper border */}
    <div className="sidebar-container" style={{ width: "250px" }}>
      <Sidebar />
    </div>

    {/* Dashboard - Flexible layout */}
    <div className="flex-grow-1 bg-light">
      <Products />
    </div>
  </div>
  );
};

export default ProductsPage;
