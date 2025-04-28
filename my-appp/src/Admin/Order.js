import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Order = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedAccessory, setSelectedAccessory] = useState(null);
  const [accessories, setAccessories] = useState([]);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    variants: [],
  });

  const apiUrl = process.env.REACT_APP_API_BASE_URL + "/merchandise";
  const imagePath = "http://localhost:5005/uploads/";

  // Fetch data from API
  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await axios.get(apiUrl);
        setAccessories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchAccessories();
  }, []);

  // Handle Edit Click
  const handleEditClick = (accessory) => {
    setSelectedAccessory(accessory);
    setEditData({ ...accessory });
    setShowModal(true);
  };

  // Handle Delete Click
  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${apiUrl}/${id}`);
          setAccessories(accessories.filter((item) => item.id !== id));
          Swal.fire("Deleted!", "Accessory has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting accessory:", error);
          Swal.fire("Error", "Failed to delete accessory.", "error");
        }
      }
    });
  };

  // Handle Update
  const handleUpdate = async () => {
    try {
      const updatedAccessories = accessories.map((item) =>
        item.id === editData.id ? editData : item
      );
      await axios.put(`${apiUrl}/${editData.id}`, editData);
      setAccessories(updatedAccessories);
      setShowModal(false);
      Swal.fire("Updated!", "Accessory has been updated.", "success");
    } catch (error) {
      console.error("Error updating accessory:", error);
      Swal.fire("Error", "Failed to update accessory.", "error");
    }
  };

  // Filter by search term
  const filteredAccessories = accessories.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center col-11 mx-auto">
        <h2 className="fw-bold mt-4">Accessories Dashboard</h2>
      </div>

      <div className="col-md-11 mx-auto mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row mt-4 col-12 mx-auto">
        <div className="col-md-11 mx-auto">
          <div className="bg-white shadow-sm rounded p-3">
            <h5 className="fw-bold mb-3">Accessory List</h5>
            <table className="table table-bordered table-striped">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Images</th>
                  <th>Color & Sizes</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccessories.length > 0 ? (
                  filteredAccessories.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        {item.variants && item.variants.length > 0 ? (
                          item.variants.map((variant, index) => (
                            <img
                              key={index}
                              src={`${imagePath}${variant.image}`}
                              alt={item.name}
                              style={{ width: "70px", height: "70px" }}
                              className="rounded me-1"
                            />
                          ))
                        ) : (
                          <span>No Image</span>
                        )}
                      </td>
                      <td>
                        {item.variants && item.variants.length > 0 ? (
                          item.variants.map((variant, index) => (
                            <div key={index} className="d-flex align-items-center mb-1">
                              <div
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  backgroundColor: variant.color,
                                  borderRadius: "50%",
                                  marginRight: "10px",
                                  border: "1px solid #ccc"
                                }}
                              />
                              <span>{JSON.parse(variant.sizes).join(", ")}</span>
                            </div>
                          ))
                        ) : (
                          <span>No Variants</span>
                        )}
                      </td>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>${item.price}</td>
                      <td>{item.quantity}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEditClick(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No accessories found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && selectedAccessory && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Accessory</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body">
                <div className="mb-2">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-2">
                  <label>Category:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editData.category}
                    onChange={(e) =>
                      setEditData({ ...editData, category: e.target.value })
                    }
                  />
                </div>
                <div className="mb-2">
                  <label>Price:</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editData.price}
                    onChange={(e) =>
                      setEditData({ ...editData, price: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={handleUpdate}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
