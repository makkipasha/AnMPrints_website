import { useState, useEffect, useRef } from "react";
import { FaUpload, FaUndo, FaRedo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Moveable from "react-moveable";

const Process = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(3);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [history, setHistory] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const fileInputRef = useRef(null);
  const [mergedImagePath, setMergedImagePath] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [targetRef, setTargetRef] = useState(null);
  const productImgRef = useRef(null);
  const isMobile = window.innerWidth <= 768;
  const [alertMessage, setAlertMessage] = useState("");  // State for alert message
  const [alertType, setAlertType] = useState("");  // State for alert type (success or error)
  const [transform, setTransform] = useState({

    x: 150,
    y: 150,
    width: 200,
    height: 200,
  });



  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const merchandiseResponse = await fetch(process.env.REACT_APP_API_BASE_URL + "/merchandise");
        const merchandiseData = await merchandiseResponse.json();

        const accessoriesResponse = await fetch(process.env.REACT_APP_API_BASE_URL + "/accessories-customize");
        const accessoriesData = await accessoriesResponse.json();

        const combinedProducts = [...merchandiseData, ...accessoriesData].map((product) => ({
          ...product,
          variants: product.variants?.map((variant) => ({
            ...variant,
            sizes: JSON.parse(variant.sizes || "[]"),
          })),
        }));

        setProducts(combinedProducts);

        if (combinedProducts.length > 0) {
          setSelectedProduct(combinedProducts[0]);
          const firstVariant = combinedProducts[0].variants?.[0] || null;
          setSelectedColor(firstVariant?.color || null);
          setSelectedSize(firstVariant?.sizes?.[0] || null);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


  const handleDoneClick = async () => {
    if (!uploadedImage || !selectedProduct) {
      alert("Please upload an image first!");
      return;
    }
  
    setIsUploading(true);
    const selectedVariant = selectedProduct.variants.find((v) => v.color === selectedColor);
    const baseImageUrl = `http://localhost:5005/uploads/${selectedVariant?.image}`;
  
    const canvas = document.getElementById("mergeCanvas");
    const ctx = canvas.getContext("2d");
  
    try {
      const baseImg = await loadImage(baseImageUrl);
      const uploadedImg = await loadImage(uploadedImage);
  
      canvas.width = baseImg.width;
      canvas.height = baseImg.height;
  
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(baseImg, 0, 0);
  
      const displayedWidth = productImgRef.current?.clientWidth || baseImg.width;
      const displayedHeight = productImgRef.current?.clientHeight || baseImg.height;
  
      const scaleX = baseImg.width / displayedWidth;
      const scaleY = baseImg.height / displayedHeight;
  
      const finalX = transform.x * scaleX;
      const finalY = transform.y * scaleY;
      const finalWidth = transform.width * scaleX;
      const finalHeight = transform.height * scaleY;
  
      ctx.drawImage(uploadedImg, finalX, finalY, finalWidth, finalHeight);
  
      const mergedDataUrl = canvas.toDataURL("image/png");
      const mergedFile = dataURLtoFile(mergedDataUrl, "merged.png");
  
      const formData = new FormData();
      formData.append("image", mergedFile);
      formData.append("product_id", selectedProduct.id);
  
      const token = localStorage.getItem("jwtToken");
  
      const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/upload-merged-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await response.json();
      alert("Merged image uploaded successfully!");
  
      // Alert the merged image path
      alert(`Merged image path: ${data.image_url}`);
      setMergedImagePath(data.image_url);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong while processing the image.");
    } finally {
      setIsUploading(false);
    }
  };
  
  
  // Helper function to load image
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";  // Enable cross-origin requests if necessary
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };
  
  // Helper function to convert dataURL to file
  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };
  

  const handleAddToCart = async () => {
    const token = localStorage.getItem("jwtToken");
  
    const selectedVariant = selectedProduct?.variants.find(
      (variant) => variant.color === selectedColor
    );
  
    const cartItem = {
      product_code: selectedProduct?.product_code,
      name: selectedProduct?.name,
      price: selectedProduct?.price,
      original_price: selectedProduct?.original_price,
      quantity,
      color: selectedColor,
      size: selectedSize,
      image: mergedImagePath || selectedVariant?.image || "",
    };
  
    if (!token) {
      const localCart = JSON.parse(localStorage.getItem("guestCart")) || [];
    
      const guestCartItem = {
        ...cartItem,
        image: mergedImagePath || cartItem.image, // ensure merged image gets stored
      };
    
      localCart.push(guestCartItem);
      localStorage.setItem("guestCart", JSON.stringify(localCart));
      alert("Item added to cart (guest mode). Please login to save permanently.");
      return;
    }
    
    try {
      const base64Payload = token.split('.')[1];
      const payload = JSON.parse(atob(base64Payload));
      const user_id = payload.user_id;
  
      const cartData = {
        ...cartItem,
        user_id,
      };
  
      const response = await fetch(process.env.REACT_APP_API_BASE_URL + "/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartData),
      });
  
      const result = await response.json();
      alert(`Cart added: ${JSON.stringify(result, null, 2)}`);
      navigate("/cart");
    } catch (error) {
      console.error("Add to cart error:", error);
      alert("Add to cart failed. Try again.");
    }
  };
  

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHistory([...history, uploadedImage]);
        setUploadedImage(reader.result);
        setRedoStack([]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUndo = () => {
    if (history.length > 0) {
      setRedoStack([uploadedImage, ...redoStack]);
      setUploadedImage(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      setHistory([...history, uploadedImage]);
      setUploadedImage(redoStack[0]);
      setRedoStack(redoStack.slice(1));
    }
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    const firstVariant = product.variants?.[0] || null;
    setSelectedColor(firstVariant?.color || null);
    setSelectedSize(firstVariant?.sizes?.[0] || null);
  };

  const showNextProducts = () => {
    setCurrentOffset((prev) => Math.min(prev + visibleProducts, products.length - visibleProducts));
  };

  const showPreviousProducts = () => {
    setCurrentOffset((prev) => Math.max(prev - visibleProducts, 0));
  };

  const renderProducts = () => {
    return products.slice(currentOffset, currentOffset + visibleProducts).map((product) => (
      <div key={product.id} className="card mb-3 product-card" onClick={() => handleProductSelect(product)}>
        <div className="card-body text-center">
          <img
            src={`http://localhost:5005/uploads/${product.variants?.[0]?.image || "default.jpg"}`}
            alt={product.name}
            className="img-fluid"
            style={{ maxHeight: "150px" }}
          />
          <p>{product.name}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="container py-4">
      <div className="row">
        {/* Left Column */}
        <div className="col-md-3">
          <h4 className="mb-4">Select Product</h4>
          {renderProducts()}
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-secondary" onClick={showPreviousProducts} disabled={currentOffset === 0}>
              Previous 3
            </button>
            <button className="btn btn-secondary" onClick={showNextProducts} disabled={currentOffset + visibleProducts >= products.length}>
              Next 3
            </button>
          </div>
        </div>

        {/* Middle Column */}
        <div className="col-md-6 mt-5 pt-2">
          <div className="card p-4 bg-light text-center position-relative">
            {selectedProduct ? (
              <div
              className="position-relative mx-auto"
              style={{
                height: "auto",
                width: "100%",
                overflow: "hidden",
              }}
            >
             <img
  ref={productImgRef}
  src={`http://localhost:5005/uploads/${selectedProduct?.variants?.find(variant => variant.color === selectedColor)?.image || "default.jpg"}`}
  alt={selectedProduct?.name}
  style={{
    height: "auto",
    width: "100%",
  }}
/>

                <div
                  className="position-absolute"
                  style={{
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: "none",
                  }}
                >
                  {uploadedImage && (
                    <div
                      ref={(ref) => {
                        if (ref) setTargetRef(ref);
                      }}
                      style={{
                        position: "absolute",
                        top: transform.y,
                        left: transform.x,
                        width: transform.width,
                        height: transform.height,
                        backgroundImage: `url(${uploadedImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        pointerEvents: "auto",
                        border: "2px dashed gray",
                      }}
                    />
                  )}
                </div>
                {!uploadedImage && (


<div
  className="position-absolute d-flex align-items-center justify-content-center"
  style={{
    top: isMobile ? "50%" : `${transform.y}px`,
    left: isMobile ? "50%" : `${transform.x}px`,
    transform: isMobile ? "translate(-50%, -50%)" : "none",
    width: `${transform.width}px`,
    height: `${transform.height}px`,
    pointerEvents: "auto",
    border: "2px dashed gray",
  }}
  onClick={handleUploadClick}
>
  <FaUpload size={30} color="gray" />
</div>


                )}
              </div>
            ) : (
              <p>Select a product to preview</p>
            )}

            {uploadedImage && targetRef && (
              <Moveable
                bounds={{
                  left: 0,
                  top: 0,
                  right: 500,
                  bottom: 500,
                }}
                target={targetRef}
                container={null}
                origin={false}
                draggable={true}
                resizable={true}
                throttleResize={0}
                edge={false}
                keepRatio={false}
                onDrag={({ left, top }) => {
                  setTransform((prev) => ({
                    ...prev,
                    x: left,
                    y: top,
                  }));
                }}
                onResize={({ width, height, drag }) => {
                  const { left, top } = drag;
                  setTransform({
                    width,
                    height,
                    x: left,
                    y: top,
                  });
                }}
              />
            )}

            {isUploading && (
              <div className="text-center mt-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Uploading...</span>
                </div>
                <p>Uploading merged image...</p>
              </div>
            )}
          </div>

          <canvas id="mergeCanvas" style={{ display: "none" }} width="500" height="500" />

          <div className="d-flex justify-content-center gap-3 mt-3">
            <button className="btn btn-secondary" onClick={handleUndo} disabled={!history.length}>
              <FaUndo /> Undo
            </button>
            <button className="btn btn-secondary" onClick={handleRedo} disabled={!redoStack.length}>
              <FaRedo /> Redo
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="d-none"
              onChange={handleFileChange}
            />
          </div>

          <div className="d-flex justify-content-center gap-3 mt-3">
            <button className="btn btn-secondary" onClick={handleDoneClick}>
              Done
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-3 mt-5 pt-2">
          <h4 className="mb-3">Customize Options</h4>

          <div className="mb-3">
          <div className="mb-3">
  <h5 className="text-muted">
    <del>₹{selectedProduct?.original_price}</del>
  </h5>
  <h4 className="text-danger fw-bold">₹{selectedProduct?.price}</h4>
</div>


</div>


          <div className="mb-3">
            <label className="form-label">Color</label>
            <div className="d-flex gap-2">
              {selectedProduct?.variants?.map((variant, index) => (
                <div
                  key={index}
                  className="rounded-circle border p-2"
                  style={{
                    backgroundColor: variant.color?.toLowerCase(),
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                  }}
                  onClick={() => setSelectedColor(variant.color)}
                />
              ))}
            </div>
          </div>

          {selectedColor &&
            selectedProduct?.variants?.find((variant) => variant.color === selectedColor)?.sizes?.length > 0 && (
              <div className="mb-3">
                <label className="form-label">Size</label>
                <select
                  className="form-select"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {selectedProduct?.variants
                    .find((variant) => variant.color === selectedColor)
                    ?.sizes?.map((size, index) => (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    ))}
                </select>
              </div>
            )}

          <div className="mb-3">
            <label className="form-label">Quantity</label>
            <div className="input-group">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <input type="text" className="form-control text-center" value={quantity} readOnly />
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          <button className="btn btn-warning w-100" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Process;
