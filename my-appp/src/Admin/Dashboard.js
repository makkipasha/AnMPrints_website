import React, { useEffect, useState } from "react";
import axios from "axios"; // <-- Make sure to import axios
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    // Fetch total users count
    axios.get(process.env.REACT_APP_API_BASE_URL + "/total-users")
      .then(response => setTotalUsers(response.data.totalUsers))
      .catch(error => console.error("Error fetching total users:", error));

    // Fetch recent users
    axios.get(process.env.REACT_APP_API_BASE_URL + "/recent-users")
      .then(response => {
        if (typeof response.data.users === "string") {
          setRecentUsers([]);
        } else {
          setRecentUsers(response.data.users);
        }
      })
      .catch(error => console.error("Error fetching recent users:", error));
  }, []);

  return (
    <div className="container-fluid mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center col-11 mx-auto">
        <h2 className="fw-bold mt-4">Admin Dashboard</h2>
      </div>

      {/* Summary Cards Section */}
      <div className="col-11 mt-4 mx-auto">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <div className="p-4 bg-white shadow-sm rounded">
              <h5 className="fw-semibold text-muted">Total Users</h5>
              <h3 className="fw-bold">{totalUsers}</h3>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="p-4 bg-white shadow-sm rounded">
              <h5 className="fw-semibold text-muted">Total Orders</h5>
              <h3 className="fw-bold">50</h3>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="p-4 bg-white shadow-sm rounded">
              <h5 className="fw-semibold text-muted">Pending Orders</h5>
              <h3 className="fw-bold">100</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="row mt-4 col-12 mx-auto">
        <div className="col-md-11 mx-auto">
          <div className="bg-white shadow-sm rounded p-3">
            <h5 className="fw-bold mb-3">Recent Added Users</h5>
            {recentUsers.length > 0 ? (
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.full_name}</td>
                      <td>{user.email}</td>
                      <td>
                        <span className="badge bg-warning">{user.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-muted">No users added recently</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
