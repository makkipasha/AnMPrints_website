import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaRegStar } from "react-icons/fa";

const itemsPerPage = 4;

const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await fetch(`http://localhost:5005/api/accessories/cat/6`);
        const data = await response.json();

        if (data && data.accessories) {
          // Add demo fields for consistent UI
          const accessoriesWithDemo = data.accessories.map((item) => ({
            ...item,
            originalPrice: (item.price * 1.2).toFixed(2), // Add a fake original price
            discount: 20, // Add a demo discount
            rating: 4.5, // Add a demo rating
            reviews: 128, // Add demo reviews
          }));
          setAccessories(accessoriesWithDemo);
        } else {
          setAccessories([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching accessories:", error);
        setLoading(false);
      }
    };

    fetchAccessories();
  }, [id]);

  // Pagination logic
  const totalPages = Math.ceil(accessories.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAccessories = accessories.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Accessories in Category {id}</h2>

      {loading ? (
        <p>Loading...</p>
      ) : currentAccessories.length > 0 ? (
        <div className="row">
          {currentAccessories.map((item) => (
            <div
              key={item.id}
              className="col-md-3 mb-4"
              onClick={() => navigate(`/products/detail/${item.id}`)}
            >
              <div className="card position-relative border-0 shadow-sm">
                {/* Discount badge */}
                {item.discount && (
                  <span
                    className="position-absolute top-0 start-0 bg-danger text-white px-2 py-1"
                    style={{ fontSize: "12px", borderRadius: "5px 0px 10px 0px" }}
                  >
                    -{item.discount}%
                  </span>
                )}
                <img
                  src={`http://localhost:5005/uploads/${item.images}`}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h6 className="card-title">{item.name}</h6>
                  <p className="card-text">
                    <strong>${item.price}</strong>{" "}
                    <span className="text-muted text-decoration-line-through">
                      ${item.originalPrice}
                    </span>
                  </p>

                  {/* Ratings */}
                  <div className="mb-2">
                    {Array.from({ length: 5 }, (_, i) =>
                      i < Math.floor(item.rating) ? (
                        <FaStar key={i} color="#ffc107" />
                      ) : (
                        <FaRegStar key={i} color="#ffc107" />
                      )
                    )}
                    <span className="ms-1 text-muted">({item.reviews})</span>
                  </div>

                  <button className="btn btn-warning w-100">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No accessories found for this category.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
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
                  className={`page-link ${currentPage === i + 1 ? "active" : ""}`}
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
      )}
    </div>
  );
};

export default CategoryPage;
