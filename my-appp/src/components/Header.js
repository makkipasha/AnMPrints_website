import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import "./Style/Header.css";
import logo from "../../src/assets/Logo.jpeg";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Profile from "./Profile"; // assuming you have this component
import Drawer from "@mui/material/Drawer";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("jwtToken");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
const [filteredProducts, setFilteredProducts] = useState([]);
const [showDropdown, setShowDropdown] = useState(false);

useEffect(() => {
  axios
    .get("http://localhost:5005/api/categories")
    .then((response) => {
      setCategories(response.data.categories);
    })
    .catch((error) => {
      console.error("Error fetching categories:", error);
    });

  axios
    .get("http://localhost:5005/api/product")
    .then((res) => {
      setProducts(res.data.products);
      setFilteredProducts(res.data.products);
    })
    .catch((err) => {
      console.error("Error fetching products:", err);
    });

  // Determine cart count
  if (token) {
    // Logged-in user
    axios
      .get("http://localhost:5005/api/cart-summary", {
        headers: { Authorization: token },
      })
      .then((response) => {
        setCartCount(response.data.total_items || 0);
      })
      .catch((error) => {
        console.error("Error fetching cart summary:", error);
      });
  } else {
    // Guest user
    const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    const guestCartCount = guestCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(guestCartCount);
  }
}, []);



  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    if (value.trim()) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowDropdown(filtered.length > 0); // Show dropdown only if filtered results are found
    } else {
      setFilteredProducts([]);
      setShowDropdown(false);
    }
  };
  
  const handleProductClick = (productId) => {
    setShowDropdown(false);
    setSearchTerm("");
    navigate(`/products/detail1/${productId}`);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  const handleProfileClick = () => {
    setDrawerOpen(true);
  };

  const handleCategoryClick = async (categoryId) => {
    let apiUrl = "";

    if ([4, 5].includes(categoryId)) {
      apiUrl = `http://localhost:5005/api/products/category/${categoryId}`;
    } else if ([2, 6, 8].includes(categoryId)) {
      apiUrl = `http://localhost:5005/api/accessories/cat/${categoryId}`;
    }

    if (apiUrl) {
      try {
        const response = await axios.get(apiUrl);
        console.log(`API response for category ${categoryId}:`, response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    navigate(`/category/${categoryId}`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container d-flex align-items-center">
        <a className="navbar-brand" href="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Logo" height="100" style={{ marginRight: "10px" }} />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/" style={{ fontSize: "1.2rem", fontWeight: "bold" , color:"black" }}>
                Home
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="categoriesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ fontSize: "1.2rem", fontWeight: "bold"  , color:"black" }}
              >
                Categories
              </a>
              <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a
                      className="dropdown-item"
                      onClick={() => handleCategoryClick(category.id)}
                      style={{ cursor: "pointer", fontSize: "1.1rem", fontWeight: "500"  , color:"black" }}
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about" style={{ fontSize: "1.2rem", fontWeight: "bold"  , color:"black" }}>
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/" style={{ fontSize: "1.2rem", fontWeight: "bold"  , color:"black" }}>
                Contact
              </a>
            </li>
          </ul>

          {/* Search Box */}
          <div className="position-relative ms-auto" style={{ width: "300px" }}>
  <FaSearch
    className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
    size={18}
    style={{ cursor: "pointer" }}
  />
  <input
    className="form-control ps-5"
    type="search"
    placeholder="Search designs..."
    value={searchTerm}
    onChange={handleSearchChange}
    onFocus={() => setShowDropdown(true)}
    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
    style={{
      border: "2px solid #BE6E02",
      borderRadius: "8px",
      height: "45px",
      fontSize: "1rem",
    }}
  />
{showDropdown && filteredProducts.length > 0 && (
  <ul
    className="list-group position-absolute w-100"
    style={{ top: "100%", zIndex: 10, maxHeight: "250px", overflowY: "auto", padding: 0, margin: 0 }}
  >
    {filteredProducts.map((product) => (
      <li
        key={product.product_id}
        className="list-group-item"
        onClick={() => handleProductClick(product.product_id)}
        style={{ cursor: "pointer", border: "none", textDecoration: "none" }}
      >
        {product.name}
      </li>
    ))}
  </ul>
)}


</div>



          {/* Cart and Profile Icons */}
          <div className="d-flex align-items-center ms-4">
            <a href="/cart" className="me-4 text-dark position-relative" style={{ fontSize: "1.5rem" }}>
              <FaShoppingCart size={25} />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                style={{
                  backgroundColor: "#BE6E02",
                  color: "white",
                  fontSize: "0.9rem",
                  padding: "5px 8px"
                }}
              >
                {cartCount}
              </span>
            </a>

            <button
              onClick={handleProfileClick}
              className="text-dark"
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: 'inherit',
                
              }}
            >
              <FaUser size={25} />
            </button>
          </div>

          {/* Drawer for profile */}
          <Drawer anchor="right" open={drawerOpen} onClose={handleClose}>
            <div style={{ width: 300, padding: "1rem" }}>
              <Profile />
            </div>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export default Header;
