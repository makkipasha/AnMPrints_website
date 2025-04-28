import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const itemsPerPage = 12;

const Category2 = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [userReviews, setUserReviews] = useState({});


  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/accessories/category/6");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchData();
    fetchUserReviews();
  }, []);

  const fetchUserReviews = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;
  
    try {
      const response = await axios.get("http://localhost:5005/api/reviews", {
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

  const handleReviewSubmit = async (rating, productCode) => {
    const token = localStorage.getItem("jwtToken");
  
    if (!token) {
      swal("Error", "You must be logged in to submit a review", "error");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:5005/api/reviews",
        {
          product_code: productCode,
          review: "Rated via card",
          rating: rating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      swal("Success", response.data.message, "success");
  
      // ⭐ Add this line here
      await fetchUserReviews();
  
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to submit review";
      swal("Error", message, "error");
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {currentProducts.map((product) => {
          // ✅ Show only the first image if there are multiple images
          const imagePath = product.images
            ? `http://localhost:5005/uploads/${product.images.split(",")[0].trim()}`
            : "https://via.placeholder.com/220";

          return (
            <div
              key={product.id}
              className="col-md-3 mb-4"
              onClick={() => navigate(`/products/detail/${product.id}`)}
            >
              <div className="card position-relative border-0 shadow-sm">
                <img
                  src={imagePath}
                  className="card-img-top"
                  alt={product.image_name || product.name || "Demo Name"}
                  style={{ height: "300px", objectFit: "cover" }}
                />

                <div className="card-body text-center">
                  <h6 className="card-title">{product.name || "Demo Name"}</h6>
                  <p className="card-text">
                    <strong>₹{product.price || "0.00"}</strong>
                    <span className="text-muted text-decoration-line-through ms-2">
                    ₹{product.original_price || "0.00"}
                    </span>
                  </p>
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
                  <button className="btn btn-warning w-100">Add to Cart</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &laquo; Previous
            </button>
          </li>

          {[...Array(totalPages)].map((_, i) => (
            <li key={i} className="page-item">
              <button
                className={`page-link ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                style={
                  currentPage === i + 1
                    ? { backgroundColor: "#8B5E3C", color: "white" }
                    : {}
                }
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next &raquo;
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Category2;
