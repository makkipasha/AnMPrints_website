import React, { useEffect, useState } from "react";
import axios from "axios";

const ShowReview = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(5); // Number of reviews per page
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_BASE_URL + "/review/all")
      .then((response) => {
        if (response.data && response.data.reviews) {
          setReviews(response.data.reviews);
        }
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  useEffect(() => {
    // Filter reviews based on search query
    setFilteredReviews(
      reviews.filter((review) => {
        return (
          review.product_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.review.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.user_id.toString().includes(searchQuery)
        );
      })
    );
  }, [searchQuery, reviews]);

  // Get the current reviews to display on the page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  return (
    <div className="p-3">
      <h2>Customer Reviews</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by product code, review, or user ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredReviews.length > 0 ? (
        <>
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Product Code</th>
               
                <th>Rating</th>
                <th>User ID</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {currentReviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.id}</td>
                  <td>{review.product_code}</td>
            
                  <td>{review.rating} / 5</td>
                  <td>{review.user_id}</td>
                  <td>{new Date(review.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <p>No reviews found.</p>
      )}
    </div>
  );
};

export default ShowReview;
