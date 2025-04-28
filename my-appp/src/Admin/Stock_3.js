import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for API calls

const Stock_3 = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    original_price: "",
    quantity: "",
    variants: [{ color: "#000000", sizes: ["S"], image: null }],
  });

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]); // State for categories

  // Fetch categories from API on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API_BASE_URL + "/categories");
        setCategories(response.data.categories);
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

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index][field] = value;
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleFileChange = (e, index) => {
    const files = Array.from(e.target.files);
    const updatedVariants = [...formData.variants];
    updatedVariants[index].image = files[0]; // Assign the first selected file to the specific variant
    setFormData({ ...formData, variants: updatedVariants });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [...formData.variants, { color: "#000000", sizes: ["S"], image: null }],
    });
  };

  const removeVariant = (index) => {
    const updatedVariants = formData.variants.filter((_, i) => i !== index);
    setFormData({ ...formData, variants: updatedVariants });
  };

  const addSize = (index) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index].sizes.push("");
    setFormData({ ...formData, variants: updatedVariants });
  };

  const handleSizeChange = (variantIndex, sizeIndex, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex].sizes[sizeIndex] = value;
    setFormData({ ...formData, variants: updatedVariants });
  };

  const removeSize = (variantIndex, sizeIndex) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[variantIndex].sizes.splice(sizeIndex, 1);
    setFormData({ ...formData, variants: updatedVariants });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("quantity", formData.quantity);
    formDataToSend.append("original_price", formData.original_price);

    // Convert variants (colorSizes) to a JSON string
    formDataToSend.append("colorSizes", JSON.stringify(formData.variants)); // Sending variants as JSON string

    // Append images for each variant
    formData.variants.forEach((variant, index) => {
      if (variant.image) {
        formDataToSend.append("images", variant.image);// Handling file upload
      }
    });

    // Log the form data that will be sent
    console.log("Request Data being sent to API:");
    formDataToSend.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/merchandise", // Corrected API endpoint
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      // Success handling
      alert(`Product added successfully!`);
      console.log("Response:", response.data);

      // Reset form after submission
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        original_price: "",
        quantity: "",
        variants: [{ color: "#000000", sizes: ["S"], image: null }],
      });
    } catch (error) {
      // Error handling
      console.error("Error submitting form:", error);

      // Log detailed error response if it exists
      if (error.response) {
        console.error("Response Data:", error.response.data);
        console.error("Response Status:", error.response.status);
        console.error("Response Headers:", error.response.headers);

        // If the response body is HTML (i.e., an error page), try to handle it better
        if (error.response.data.includes('<!DOCTYPE html>')) {
          alert("The server responded with an error page. Please check the server logs.");
        } else {
          alert(`Failed to add product: ${error.response.data.message || 'Unknown error'}`);
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        alert("The server did not respond. Please try again later.");
      } else {
        console.error("Error Message:", error.message);
        alert("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
};

  

  
  return (
    <div className="container-fluid mt-4 col-11 mx-auto">
      <div className="card p-4 shadow border">
        <h2 className="fw-bold text-center text-warning mb-4">Add Product</h2>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-3">
            <label className="form-label fw-bold text-warning">Product Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Product Description */}
          <div className="mb-3">
            <label className="form-label fw-bold text-warning">Product Description</label>
            <textarea
              name="description"
              className="form-control"
              rows="3"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Product Category */}
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
      .filter((cat) => cat.id === 4 || cat.id === 5)
      .map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
  </select>
</div>


          {/* Price */}
          <div className="mb-3">
            <label className="form-label fw-bold text-warning">Price ($)</label>
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
            <label className="form-label fw-bold text-warning">Original Price ($)</label>
            <input
              type="number"
              name="original_price"
              className="form-control"
              placeholder="Enter original price"
              value={formData.original_price}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Quantity */}
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

          {/* Variants */}
          <div className="mb-3">
            <label className="form-label fw-bold text-warning">Variants</label>
            {formData.variants.map((variant, index) => (
              <div key={index} className="border rounded p-3 mb-3">
                {/* Color Picker */}
                <div className="d-flex align-items-center mb-2">
                  <label className="form-label me-2 fw-bold">Color:</label>
                  <input
                    type="color"
                    value={variant.color}
                    onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                    className="form-control form-control-color"
                  />
                </div>

                {/* Sizes */}
                <div>
                  <label className="form-label fw-bold">Sizes:</label>
                  {variant.sizes.map((size, sizeIndex) => (
                    <div key={sizeIndex} className="d-flex align-items-center mb-2">
                      <input
                        type="text"
                        value={size}
                        onChange={(e) => handleSizeChange(index, sizeIndex, e.target.value)}
                        className="form-control me-2"
                        placeholder="Enter size"
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeSize(index, sizeIndex)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-secondary mt-2"
                    onClick={() => addSize(index)}
                  >
                    Add Size
                  </button>
                </div>

                {/* Image Upload */}
                <div className="mt-2">
                  <label className="form-label fw-bold">Image Upload</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, index)}
                    className="form-control"
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-danger mt-3"
                  onClick={() => removeVariant(index)}
                >
                  Remove Variant
                </button>
              </div>
            ))}

            <button type="button" className="btn btn-warning mt-3" onClick={addVariant}>
              Add Variant
            </button>
          </div>

          <button type="submit" className="btn btn-success w-100" disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Stock_3;
