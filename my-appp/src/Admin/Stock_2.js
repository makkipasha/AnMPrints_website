import React, { useState, useEffect } from "react";
import axios from "axios";

const Stock_2 = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    images: [],
    price: "",
    original_price:"",
    origial_price:"",
    quantity: "",
    colors: ["#000000"],
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/categories");
        if (Array.isArray(response.data.categories)) {
          setCategories(response.data.categories);
        } else {
          console.error("Invalid data format:", response.data);
          setCategories([]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...files],
    }));
  };

  const handleColorChange = (index, value) => {
    const updatedColors = [...formData.colors];
    updatedColors[index] = value;
    setFormData({ ...formData, colors: updatedColors });
  };

  const addColor = () => {
    setFormData({ ...formData, colors: [...formData.colors, "#000000"] });
  };

  const removeColor = (index) => {
    const updatedColors = formData.colors.filter((_, i) => i !== index);
    setFormData({ ...formData, colors: updatedColors });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("price", parseFloat(formData.price));
    data.append("original_price", parseFloat(formData.original_price));
    data.append("quantity", parseInt(formData.quantity));
    data.append("color", formData.colors.join(","));

    // Use "files" to match the backend field name
    formData.images.forEach((image) => {
      data.append("files", image);  // ✅ Change field name to "files"
    });

    try {
      const response = await axios.post(
        "http://localhost:5005/api/accessories",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Stock added successfully!");
      setFormData({
        name: "",
        description: "",
        category: "",
        images: [],
        price: "",
        original_price:"",
        quantity: "",
        colors: ["#000000"],
      });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Failed to add stock. Please try again.");
    }
  };

  return (
    <div className="container-fluid mt-4 col-11 mx-auto">
      <div className="card p-4 shadow border">
        <h2 className="fw-bold text-center text-warning mb-4">Add Stock</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="form-label fw-bold text-warning">Product Name</label>
            <input
              name="name"
              className="form-control"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold text-warning">Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
  <label className="form-label fw-bold text-warning">Product Category</label>
  <select
    name="category"
    className="form-control"
    value={formData.category}
    onChange={handleInputChange}
    required
  >
    <option value="">Select Category</option>
    {categories
      .filter((cat) => cat.id === 2 || cat.id === 6|| cat.id === 8)
      .map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
  </select>
</div>


          <div className="mb-3">
            <label className="form-label fw-bold text-warning">Price  (₹)</label>
            <input
              type="number"
              name="price"
              className="form-control"
              placeholder="Enter product price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold text-warning">Origial Price (₹)</label>
            <input
              type="number"
              name="original_price"
              className="form-control"
              placeholder="Enter product original price"
              value={formData.original_price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold text-warning">Quantity</label>
            <input
              type="number"
              name="quantity"
              className="form-control"
              placeholder="Enter product quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Color Picker */}
          <div className="mb-3">
            <label className="form-label fw-bold text-warning">Colors</label>
            <div className="d-flex flex-wrap gap-2">
              {formData.colors.map((color, index) => (
                <div key={index} className="d-flex align-items-center gap-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(index, e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeColor(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-warning mt-2"
              onClick={addColor}
            >
              Add Color
            </button>
          </div>

          {/* Image Upload */}
          <div className="mb-3">
            <label className="form-label fw-bold text-warning">Upload Images</label>
            <input
  type="file"
  name="files"   // ✅ Match backend field name
  className="form-control"
  multiple
  onChange={handleFileChange}
  required
/>

          </div>

          <button type="submit" className="btn btn-success w-100">
            Add Stock
          </button>
        </form>
      </div>
    </div>
  );
};

export default Stock_2;
