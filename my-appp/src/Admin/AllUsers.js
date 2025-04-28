// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";

// const AllUsers = () => {
//   // Sample user data
//   const usersData = [
//     { id: 8305, name: "Keya Halder", email: "keya@example.com", mobile: "8584915600" },
//     { id: 8304, name: "Nikhil Chettri", email: "nikhil@example.com", mobile: "9332624810" },
//     { id: 8306, name: "Amit Sharma", email: "amit@example.com", mobile: "9876543210" },
//     { id: 8307, name: "Priya Verma", email: "priya@example.com", mobile: "9564123789" },
//     { id: 8308, name: "Rahul Singh", email: "rahul@example.com", mobile: "7845123690" },
//     { id: 8309, name: "Neha Gupta", email: "neha@example.com", mobile: "8541236987" },
//     { id: 8310, name: "Raj Mehta", email: "raj@example.com", mobile: "7894561230" },
//     { id: 8311, name: "Pooja Agarwal", email: "pooja@example.com", mobile: "9638527410" },
//     { id: 8312, name: "Arjun Kapoor", email: "arjun@example.com", mobile: "7896541236" },
//     { id: 8313, name: "Sonali Mishra", email: "sonali@example.com", mobile: "7412589630" },
//   ];

//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const usersPerPage = 10;

//   // Filter users based on search term
//   const filteredUsers = usersData.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   // Pagination Logic
//   const indexOfLastUser = currentPage * usersPerPage;
//   const indexOfFirstUser = indexOfLastUser - usersPerPage;
//   const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
//   const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

//   return (
//     <div className="container-fluid mt-4">
//       {/* Header Section */}
//       <div className="d-flex justify-content-between align-items-center col-11 mx-auto">
//         <h2 className="fw-bold mt-4">Admin Dashboard</h2>
//       </div>

//       {/* Search Input */}
//       <div className="col-md-11 mx-auto mt-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search by name or email..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* User Table */}
//       <div className="row mt-4 col-12 mx-auto">
//         <div className="col-md-11 mx-auto">
//           <div className="bg-white shadow-sm rounded p-3">
//             <h5 className="fw-bold mb-3">User List</h5>
//             <table className="table">
//               <thead className="table-light">
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                   <th>Mobile</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentUsers.length > 0 ? (
//                   currentUsers.map((user) => (
//                     <tr key={user.id}>
//                       <td>{user.id}</td>
//                       <td>{user.name}</td>
//                       <td>{user.email}</td>
//                       <td>{user.mobile}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="text-center">
//                       No users found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>

//             {/* Pagination */}
//             <div className="d-flex justify-content-center">
//               <nav>
//                 <ul className="pagination">
//                   <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
//                     <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
//                       Previous
//                     </button>
//                   </li>
//                   {Array.from({ length: totalPages }, (_, i) => (
//                     <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
//                       <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
//                         {i + 1}
//                       </button>
//                     </li>
//                   ))}
//                   <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
//                     <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
//                       Next
//                     </button>
//                   </li>
//                 </ul>
//               </nav>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllUsers;


import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AllUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/users"); // Adjust API URL as needed
        console.log("Response:", response);
        
        if (!response.ok) {
          console.log("Errror");
          
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        console.log("loggg:", data);
        
        setUsersData(data.users); 
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search term
  const filteredUsers = usersData.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="container-fluid mt-4">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center col-11 mx-auto">
        <h2 className="fw-bold mt-4">Admin Dashboard</h2>
      </div>

      {/* Search Input */}
      <div className="col-md-11 mx-auto mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* User Table */}
      <div className="row mt-4 col-12 mx-auto">
        <div className="col-md-11 mx-auto">
          <div className="bg-white shadow-sm rounded p-3">
            <h5 className="fw-bold mb-3">User List</h5>

            {/* Loading State */}
            {loading ? (
              <p className="text-center">Loading users...</p>
            ) : error ? (
              <p className="text-center text-danger">{error}</p>
            ) : (
              <>
                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.length > 0 ? (
                      currentUsers.map((user) => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.full_name}</td>
                          <td>{user.email}</td>
                          <td>{user.status}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="d-flex justify-content-center">
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                          Previous
                        </button>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                          <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                            {i + 1}
                          </button>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
