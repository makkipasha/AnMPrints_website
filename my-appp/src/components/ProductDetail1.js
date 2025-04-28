import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style/ProductDetail.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Style/ProductDetail.css";
import axios from "axios";
import swal from "sweetalert";


const ProductDetail1 = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [userReviews, setUserReviews] = useState({});

  const fetchUserReviews = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;
  
    try {
      const response = await axios.get(process.env.REACT_APP_API_BASE_URL + "/reviews", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const reviewsByProduct = {};
      response.data.reviews.forEach((review) => {
        reviewsByProduct[review.product_code] = review.rating;
      });
  
      setUserReviews(reviewsByProduct);
    } catch (error) {
      console.error("Failed to fetch user reviews:", error);
    }
  };

  


  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5005/api/accessories/${id}`);
        if (!response.ok) throw new Error(`Failed to fetch: ${response.status}`);
        const text = await response.text();
        const data = JSON.parse(text);
        setProduct(data);
  
        // Set default selected color
        const colorArray = Array.isArray(data.colors)
          ? data.colors
          : typeof data.colors === "string"
          ? data.colors.split(",").map(color => color.trim())
          : [];
        if (colorArray.length > 0) {
          setSelectedColor(colorArray[0]);
        }
  
        fetchSimilarProducts(data.category);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to load product details.");
      }
    };
  
    const fetchSimilarProducts = async (category) => {
      try {
        const response = await fetch(`http://localhost:5005/api/accessories/category/${category}`);
        if (!response.ok) throw new Error(`Failed to fetch similar products: ${response.status}`);
        const data = await response.json();
        const filteredProducts = data.filter(item => item.id !== parseInt(id))
                                    .sort((a, b) => b.id - a.id)
                                    .slice(0, 4);
        setSimilarProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching similar products:", error);
      }
    };
  
    fetchProductDetails();
    fetchUserReviews();
  }, [id]);
  

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!product) return <div>Loading...</div>;

  const images = typeof product.images === "string"
    ? product.images.split(",").map(img => img.trim())
    : Array.isArray(product.images) ? product.images : [];

  const sliderImages = images.length === 1 ? [...images, ...images] : images;
  const handleAddToCart = async () => {
    const token = localStorage.getItem("jwtToken");
  
    const cartItem = {
      product_code: product.product_code || `P${product.id}`,
      name: product.name,
      price: product.price,
      original_price: product.original_price || product.price,
      quantity,
      color: selectedColor || "",
      size: "", // No size field in the product details
      image: Array.isArray(product.images)
        ? product.images[0]
        : typeof product.images === "string"
          ? product.images.split(",")[0]
          : "",
    };
  
    if (!token) {
      // No token, store in localStorage
      const existingCart = JSON.parse(localStorage.getItem("guestCart") || "[]");
      const updatedCart = [...existingCart, cartItem];
      localStorage.setItem("guestCart", JSON.stringify(updatedCart));
  
      Swal.fire("Saved!", "Item added to local cart (not logged in).", "info");
      navigate("/cart");
      return;
    }
  
    // If token is present, proceed with server request
    try {
      const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartItem),
      });
  
      const result = await response.json();
      if (response.ok) {
        Swal.fire("Success!", "Item added to cart!", "success");
        navigate("/cart");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Login Required",
          text: "Please login to add items to the cart.",
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      Swal.fire("Error!", "An unexpected error occurred.", "error");
    }
  };
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };
  const handleReviewSubmit = async (rating, productCode) => {
    const token = localStorage.getItem("jwtToken");
  
    if (!token) {
      swal("Error", "You must be logged in to submit a review", "error");
      return;
    }
  
    try {
      const reviewData = {
        product_code: productCode,
        review: "Rated via card",
        rating: rating,
      };
  
      console.log("Sending review data:", reviewData);
  
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/reviews",
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("Response from server:", response.data);
  
      swal("Success", response.data.message, "success");
  
      // ⭐ Add this line here
      await fetchUserReviews();
  
    } catch (error) {
      swal("Error", "Please Login First", "error");
  }
  
  };

  return (
    <div className="container product-detail">
      <div className="row my-4">
        <div className="col-md-6">
          <Slider {...settings}>
            {sliderImages.map((img, index) => (
              <div key={index} style={{ height: '600px', overflow: 'hidden' }}>
              <img
                src={`http://localhost:5005/uploads/${img}`}
                alt={product.description}
                style={{
                  width: '100%',
                  height: '600px',
                  objectFit: 'cover',
                  display: 'block',
                  margin: '0 auto'
                }}
              />
            </div>
            ))}
          </Slider>
        </div>

        <div className="col-md-6">
          <h2 className="product-title my-4">{product.name}</h2>

          <div className="product-price my-4">
            <span className="current-price">₹{product.price}</span>
            <span className="original-price text-muted ms-2" style={{ color: "red", textDecoration: "line-through" }}>
              ₹{product.original_price || "0.00"}
            </span>
          </div>

          <div className="mb-2">
{[1, 2, 3, 4, 5].map((star) => {
  const userRating = userReviews[product.product_code] || 0;

  // DEBUG LOG
  console.log(`Product: ${product.product_code}, Rating: ${userRating}`);

  const isFilled = star <= userRating;
  const StarIcon = isFilled ? FaStar : FaRegStar;

  return (
    <StarIcon
      key={star}
      color="#ffc107"
      style={{ cursor: "pointer" }}
      onClick={(e) => {
        e.stopPropagation();
        handleReviewSubmit(star, product.product_code);
      }}
    />
  );
})}


</div>

          <div className="color-selection my-4">
            <p className="text-dark">Color:</p>
            <div className="color-options">
  {Array.isArray(product.colors)
    ? product.colors.map((color, index) => (
        <div
          key={index}
          className={`color-circle ${selectedColor === color ? "selected" : ""}`}
          style={{ backgroundColor: color, cursor: "pointer" }}
          onClick={() => setSelectedColor(color)}
        ></div>
      ))
    : typeof product.colors === "string"
      ? product.colors.split(",").map((color, index) => (
          <div
            key={index}
            className={`color-circle ${selectedColor === color.trim() ? "selected" : ""}`}
            style={{ backgroundColor: color.trim(), cursor: "pointer" }}
            onClick={() => setSelectedColor(color.trim())}
          ></div>
        ))
      : <p>No colors available</p>
  }
</div>

          </div>

          <div className="row align-items-center my-4">
            <div className="col-3 bg-light border d-flex justify-content-around align-items-center p-2">
              <button className="btn bg-light text-dark" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span className="quantity bg-white">{quantity}</span>
              <button className="btn bg-light text-dark" onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            <div className="col-9">
              <button className="btn btn-warning w-100 p-3 fw-bold" onClick={handleAddToCart}>Add to Cart</button>
            </div>
          </div>

          <div className="product-description my-4">
            <h5>Description</h5>
            <p className="text-dark des-text">{product.description}</p>
          </div>
        </div>
      </div>

      <div className="similar-products my-4">
  <h3>Similar Products</h3>
  <div className="row">
    {similarProducts.length > 0 ? (
      similarProducts.map((item) => (
        <div key={item.id} className="col-md-3">
          <div className="card">
            <Link to={`/products/detail/${item.id}`}>
              <img 
                src={`http://localhost:5005/uploads/${item.images.split(",")[0]}`} 
                className="card-img-top img-fluid w-100" 
                alt={item.name} 
                style={{ height: "300px", cursor: "pointer" }} 
              />
            </Link>
            <div className="card-body">
              <h5 className="card-title">{item.name}</h5>
              <p className="card-text">
  <strong>₹{product.price || "0.00"}</strong>
  <span 
    className="text-muted text-decoration-line-through ms-2"
    style={{ color: "red" }}
  >
    ₹{product.original_price || "0.00"}
  </span>
</p>
              <Link to={`/products/detail/${item.id}`}>
              <button 
                className="btn btn-warning w-100"
              >
                Add to Cart
              </button>
              </Link>
            </div>
          </div>
        </div>
      ))
    ) : (
      <p>No similar products found.</p>
    )}
  </div>
</div>

    </div>
  );
};

export default ProductDetail1;
