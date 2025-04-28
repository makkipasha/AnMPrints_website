import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
const itemsPerPage = 12;

const Category5 = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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
    const fetchProducts = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL + "/product/category/5");

        // Ensure you access the products key in the response
        const data = response.data.products.map((item) => ({
          id: item.id,
          product_code: item.product_code, // ✅ Add this line
          name: item.description,
          image: `http://localhost:5005/uploads/${item.images[0]}`,
          price: parseFloat(item.price),
          original_price: parseFloat(item.price) * 1.2,
          rating: 4.5,
          reviews: Math.floor(Math.random() * 200) + 50,
        }));

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    fetchUserReviews();
  }, []);

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
      const message =
        error.response?.data?.message || "Failed to submit review";
      console.error("Error submitting review:", message);
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

  return (
    <div className="container mt-4">
      <div className="row">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="col-md-3 mb-4"
            onClick={() => navigate(`/products/detail1/${product.id}`)}
            style={{ cursor: "pointer" }}
          >
            <div className="card position-relative border-0 shadow-sm">
              {product.discount && (
                <span
                  className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1"
                  style={{ fontSize: "12px", borderRadius: "5px 0px 10px 0px" }}
                >
                  -{product.discount}%
                </span>
              )}
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ height: "300px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h6 className="card-title">{product.name}</h6>
                <p className="card-text">
                  <strong>₹{product.price.toFixed(2)}</strong>{" "}
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
        ))}
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
            className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
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

export default Category5;
