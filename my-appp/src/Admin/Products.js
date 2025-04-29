import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    product_id: "",
    description: "",
    category: "",
    price: "",
    quantity: "",
    variants: [],
    image: null,
  });

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL + "/product";

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_BASE_URL);
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle Edit Click
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditData({
      product_id: product.product_id,
      description: product.description,
      category: product.category,
      price: product.price,
      quantity: product.quantity,
      variants: product.variants,
      image: product.image,
    });
    setShowModal(true);
  };

  // Handle Delete Click
  const handleDeleteClick = async (productId) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await axios.delete(`${API_BASE_URL}/${productId}`);
        Swal.fire("Deleted!", "Product has been deleted.", "success");
        
        // Refresh the product list after deletion
        setProducts(products.filter((product) => product.product_id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
        Swal.fire("Error", "Failed to delete the product.", "error");
      }
    }
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditData({ ...editData, image: files[0] });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      const data = {
        productId: editData.product_id,
        description: editData.description,
        price: editData.price,
        quantity: editData.quantity,
      };

      await axios.put(`${API_BASE_URL}/${editData.product_id}`, data, {
        headers: { "Content-Type": "application/json" },
      });

      Swal.fire("Success", "Product updated successfully!", "success");
      setShowModal(false);

      // Refresh product list after edit
      const response = await axios.get(API_BASE_URL);
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error updating product:", error);
      Swal.fire("Error", "Failed to update the product.", "error");
    }
  };

  // Filter products by search term
  const filteredProducts = products.filter(
    (product) =>
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center col-11 mx-auto">
        <h2 className="fw-bold mt-4">Products Dashboard</h2>
      </div>

      <div className="col-md-11 mx-auto mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by description or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row mt-4 col-12 mx-auto">
        <div className="col-md-11 mx-auto">
          <div className="bg-white shadow-sm rounded p-3">
            <h5 className="fw-bold mb-3">Product List</h5>
            <table className="table table-bordered table-striped">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Variants</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.product_id}>
                      <td>{product.product_id}</td>
                      <td>
  {product.images.length > 0 ? (
    product.images.map((img, index) => (
      <img
        key={index}
        src={`/uploads/${img}`}
        alt="product"
        style={{ width: "70px", height: "70px", marginRight: "5px" }}
        className="rounded"
      />
    ))
  ) : (
    <span>No Image</span>
  )}
</td>
                      <td>{product.description}</td>
                      <td>{product.category}</td>
                      <td>${product.price}</td>
                      <td>{product.quantity}</td>
                      <td>
  {Array.isArray(product.variants) && product.variants.length > 0 ? (
    product.variants.map((variant, index) => (
      <div key={index}>
        <span
          style={{
            display: "inline-block",
            width: "20px",
            height: "20px",
            backgroundColor: variant.color,
            marginRight: "5px",
            borderRadius: "50%",
          }}
        ></span>
        {Array.isArray(variant.sizes) ? variant.sizes.join(", ") : "No sizes"}
      </div>
    ))
  ) : (
    <span>No variants</span>
  )}
</td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEditClick(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteClick(product.product_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showModal && selectedProduct && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Product</h5>
                <button
                  type="button"
                  className="close btn btn-danger"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    className="form-control"
                    name="description"
                    value={editData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    className="form-control"
                    name="price"
                    value={editData.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Quantity</label>
                  <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    value={editData.quantity}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <button className="btn btn-warning" onClick={handleSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
