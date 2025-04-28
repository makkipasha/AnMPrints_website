import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style/Cart.css";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import Swal from 'sweetalert2';


const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [discountedTotal, setDiscountedTotal] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [showCoupons, setShowCoupons] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [guestCart, setGuestCart] = useState([]);



  const fetchCart = async () => {
    const token = localStorage.getItem("jwtToken");
    try {
      const response = await axios.get("http://localhost:5005/api/cartdata", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCart(response.data.cart);
      calculateTotal(response.data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
  
    if (token) {
      setIsLoggedIn(true);
      console.log("Fetching cart for logged-in user");
  
      // Check for guest cart and sync
      const guestCartData = JSON.parse(localStorage.getItem("guestCart") || "[]");
      if (guestCartData.length > 0) {
        console.log("Syncing guest cart with user cart...");
        syncGuestCartToUser(guestCartData, token);
      }
  
      fetchCart(); 
      fetchCoupons();
    } else {
      setIsLoggedIn(false);
      console.log("Fetching guest cart");
      fetchGuestCart();
      fetchCoupons();
    }
  }, []);

  
  const syncGuestCartToUser = async (guestCartData, token) => {
    try {
      for (const item of guestCartData) {
        const payload = {
          product_code: item.product_code,
          name: item.name,
          price: item.price,
          original_price: item.original_price || item.price, // fallback
          quantity: item.quantity,
          color: item.color,
          size: item.size,
          image: item.image,
        };
  
        await axios.post("http://localhost:5005/api/add", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
  
      // Clear guest cart after sync
      localStorage.removeItem("guestCart");
      console.log("Guest cart synced and cleared");
  
      // Refresh cart from server
      fetchCart();
    } catch (error) {
      console.error("Error syncing guest cart:", error);
    }
  };
  
  

  const fetchCoupons = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/coupons");
      setCoupons(response.data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    }
  };
  

  const fetchGuestCart = () => {
    const localCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
    setGuestCart(localCart);
    calculateTotal(localCart);
  };
  
  const calculateTotal = (cartItems) => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(totalPrice);
    setDiscountedTotal(null);
    setSelectedCoupon(null);
  };

  const removeItem = async (id) => {
    console.log("Removing item with id:", id);  // Debug log
    if (!id) {
      console.error("Item id is missing or undefined");
      return; // Return if no valid ID is provided
    }
  
    if (isLoggedIn) {
      const token = localStorage.getItem("jwtToken");
      try {
        await axios.delete(`http://localhost:5005/api/remove/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchCart();
      } catch (error) {
        console.error("Error removing item:", error);
      }
    } else {
      // Handle guest cart
      const localCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      const updatedCart = localCart.filter(item => item.id !== id && item.product_code !== id);
      console.log("Updated cart after removal:", updatedCart);  // Debug log
      setGuestCart(updatedCart);
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      calculateTotal(updatedCart);
    }
  };
  
  
  
  
  const handleProceedToCheckout = () => {
    console.log("Proceed to checkout function called"); // Debug log to check if it's being triggered
  
    const token = localStorage.getItem("jwtToken");
  
    if (!token) {
      // If no JWT token is found, show error alert to log in
      Swal.fire({
        icon: 'error',
        title: 'Please Login',
        text: 'You must be logged in to proceed with the order.',
      });
      return;
    }
  
    if (cart.length === 0) {
      // Show SweetAlert if cart is empty
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Your cart is empty. Please add items to your cart.',
      });
      return;
    }
  
    // Collect checkout data for each item
    const checkoutData = cart.map(item => ({
      product_code: item.product_code,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      subtotal: item.price * item.quantity,
      image: item.image,
      color: item.color,
      size: item.size
    }));
  
    // Calculate total subtotal (before discount)
    const originalTotal = checkoutData.reduce((acc, item) => acc + item.subtotal, 0);
  
    // Calculate discounted total if coupon is applied
    let finalTotal = originalTotal;
    let discountAmount = 0;
  
    if (selectedCoupon) {
      if (selectedCoupon.type === "fixed") {
        discountAmount = parseFloat(selectedCoupon.value);
      } else if (selectedCoupon.type === "percentage") {
        discountAmount = (originalTotal * parseFloat(selectedCoupon.value)) / 100;
      }
      finalTotal = originalTotal - discountAmount;
    }
  
    // Final data object to send or use
    const finalCheckoutPayload = {
      items: checkoutData,
      originalTotal: parseFloat(originalTotal.toFixed(2)),
      discount: parseFloat(discountAmount.toFixed(2)),
      finalTotal: parseFloat(finalTotal.toFixed(2)),
      appliedCoupon: selectedCoupon ? selectedCoupon.code : null
    };
  
    // Show success message
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Your order has been successfully added to checkout.',
    });
  
    console.log("Proceeding to Checkout with data:", finalCheckoutPayload);
  
    // Example to show where you'd proceed to checkout:
    // axios.post("http://localhost:5005/api/checkout", finalCheckoutPayload)
    //   .then(response => { /* handle success */ })
    //   .catch(error => { console.error("Checkout error:", error); });
  
    // Or navigate:
    // history.push("/checkout", { checkout: finalCheckoutPayload });
  };
  
  
  const groupCartItems = (items) => {
    const grouped = {};
  
    items.forEach(item => {
      const key = `${item.product_code}_${item.color || "N/A"}_${item.size || "N/A"}`;
      if (!grouped[key]) {
        grouped[key] = { ...item }; // shallow clone
      } else {
        grouped[key].quantity += item.quantity; // merge quantity
      }
    });
  
    return Object.values(grouped);
  };
  
  
  const handleQuantityChange = async (id, quantity) => {
    if (isLoggedIn) {
      const token = localStorage.getItem("jwtToken");
      try {
        await axios.put(
          `http://localhost:5005/api/update-quantity/${id}`,
          { quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchCart();
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    } else {
      // Guest cart update
      const updatedGuestCart = guestCart.map((item) => {
        if (item.id === id || item.product_code === id) {
          return { ...item, quantity };
        }
        return item;
      });
  
      setGuestCart(updatedGuestCart);
      localStorage.setItem("guestCart", JSON.stringify(updatedGuestCart));
      calculateTotal(updatedGuestCart);
    }
  };
  

  const applyCoupon = (coupon) => {
    if (total >= parseFloat(coupon.min_cart_value)) {
      setSelectedCoupon(coupon);
      let discount = 0;

      if (coupon.type === "fixed") {
        discount = parseFloat(coupon.value);
      } else if (coupon.type === "percentage") {
        discount = (total * parseFloat(coupon.value)) / 100;
      }

      const newTotal = total - discount;
      setDiscountedTotal(newTotal);
      setShowCoupons(false);
    } else {
      alert(
        `Cart total must be at least ₹ ${coupon.min_cart_value} to use this coupon.`
      );
    }
  };

  useEffect(() => {
    fetchCart();
    fetchCoupons();
  }, []);

  return (
    <div className="container bg-light py-4">
      <div className="bg-white rounded p-4 shadow">
        <div className="col-12">
          <p className="text-dark review fw-bold">Review Your Order</p>
          <hr />

          {groupCartItems(isLoggedIn ? cart : guestCart).map((item, index) => (
        <div className="row align-items-center mb-3" key={index}>
          <div className="col-4 d-flex">
            <img
              src={
                item.image
                  ? item.image.startsWith("http")
                    ? item.image
                    : `http://localhost:5005/${item.image}`
                  : "https://via.placeholder.com/100"
              }
              alt={item.name}
              className="img-fluid rounded"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <div className="px-4">
              <p className="text-dark">{item.name}</p>
              <div className="d-flex align-items-center">
                {item.color ? (
                  <>
                    <div
                      style={{
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        backgroundColor: item.color,
                        border: "1px solid #ccc",
                        marginRight: "8px",
                      }}
                    ></div>
                    <span className="text-dark">{item.color}</span>
                  </>
                ) : (
                  <span className="text-muted">Color N/A</span>
                )}
                <span className="mx-2">•</span>
                <span className="text-dark">Size: {item.size || "N/A"}</span>
              </div>
              <div className="d-flex align-items-center">
  <span className="me-2 text-dark">Qty:</span>
  <select
    className="form-select form-select-sm"
    style={{ width: "70px" }}
    value={item.quantity}
    onChange={(e) =>
      handleQuantityChange(item.id || item.product_code, parseInt(e.target.value))
    }
  >
    {[...Array(10).keys()].map((x) => (
      <option key={x + 1} value={x + 1}>
        {x + 1}
      </option>
    ))}
  </select>
</div>

            </div>
          </div>

          <div className="col-8 d-flex justify-content-end">
            <div className="d-flex flex-column justify-content-end align-items-end">
              <p className="text-dark fw-bold">
                ₹{(item.price * item.quantity).toFixed(2)}
              </p>
              <FaTrash
                style={{ color: "orange", cursor: "pointer" }}
                onClick={() => {
                  const itemId = item.id || item.product_code; // Use product_code if id is not available
                  console.log("Removing item with ID or product_code:", itemId);
                  removeItem(itemId);  // Pass the correct identifier
                }}
              />
            </div>
          </div>
        </div>
      ))}

    </div>

        {/* Subtotal */}
        <div className="col-12 pt-4">
          <div className="row align-items-center">
            <div className="col-6">
              <p className="text-dark">Subtotal</p>
              <p className="text-muted">
                Shipping and taxes calculated at checkout.
              </p>
              {selectedCoupon && (
                <p className="text-success">
                  Applied Coupon: <strong>{selectedCoupon.code}</strong> (
                  {selectedCoupon.type === "fixed"
                    ? `₹${selectedCoupon.value}`
                    : `${selectedCoupon.value}%`}{" "}
                  off)
                </p>
              )}
            </div>
            <div className="col-6 text-end justify-content-end">
              {discountedTotal !== null ? (
                <>
                  <div className="text-dark text-decoration-line-through">
                    ${total.toFixed(2)}
                  </div>
                  <div className="text-danger fw-bold">
                    ₹{Math.abs(total - discountedTotal).toFixed(2)} off
                  </div>
                  <div className="text-dark fw-bold">
                    ₹{discountedTotal.toFixed(2)}
                  </div>
                </>
              ) : (
                <p className="text-dark fw-bold">
                  ₹{total.toFixed(2)}
                </p>
              )}
            </div>
          </div>

          {/* Coupon Input + Show Coupons */}
          <div className="mt-4">
            <h5 className="fw-bold text-dark">Apply Coupon</h5>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter coupon code"
                value={selectedCoupon ? selectedCoupon.code : ""}
                readOnly
              />
              {selectedCoupon ? (
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    setSelectedCoupon(null);
                    setDiscountedTotal(null);
                  }}
                >
                  Remove
                </button>
              ) : (
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setShowCoupons(!showCoupons)}
                >
                  {showCoupons ? "Hide Coupons" : "Show Coupons"}
                </button>
              )}
            </div>

            {/* Coupon List */}
            {showCoupons && coupons.length > 0 && (
              <div className="coupon-list">
                {coupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className="border p-2 mb-2 rounded d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <p className="mb-0 fw-bold">
                        {coupon.code} -{" "}
                        {coupon.type === "fixed"
                          ? `₹${coupon.value}`
                          : `${coupon.value}% off`}
                      </p>
                      <small className="text-muted">{coupon.description}</small>
                      <br />
                      <small>Min Cart Value: ₹{coupon.min_cart_value}</small>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-success"
                      onClick={() => applyCoupon(coupon)}
                      disabled={!!selectedCoupon}
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-12 mt-4">
          <button 
  className="btn btn-warning w-100 py-2 fw-bold" 
  // disabled={!isLoggedIn || cart.length === 0}
  onClick={handleProceedToCheckout}
>
  Proceed to Checkout
</button>



            <div className="text-center mt-3">
              <a href="#" className="text-decoration-none">
                or <span className="text-warning">Continue Shopping</span>
              </a>
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Cart;
