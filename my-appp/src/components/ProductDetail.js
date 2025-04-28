import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Style/ProductDetail.css";
import hoodieImage from "../assets/hoodies.png"; // Change this to the correct image
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const ProductDetail = () => {
  const settings = {
    dots: true, // Enable dots for navigation
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show one image at a time
    slidesToScroll: 1,
    autoplay: true, // Enable auto-slide
    autoplaySpeed: 3000, // Slide every 3 seconds
  };
  return (
    
    <div className="container product-detail">
      <div className="row my-4">
        {/* Product Image Section */}
        <div className="col-md-6">
          <Slider {...settings}>
            <div className="product-image">
              <img src={hoodieImage} alt="Premium Cotton T-Shirt" className="img-fluid" />
            </div>
            <div className="product-image">
              <img src={hoodieImage} alt="Premium Cotton T-Shirt 2" className="img-fluid" />
            </div>
          </Slider>
        </div>

        {/* Product Info Section */}
        <div className="col-md-6">
          <h2 className="product-title my-4">Premium Cotton T-Shirt</h2>
          <p className="product-price my-4">$49.99</p>
          <div className="product-rating my-4">
            ⭐⭐⭐⭐⭐ <span>4.5 (128 reviews)</span>
          </div>

          {/* Size Selection */}
          <div className="size-selection my-4">
            <p className="text-dark">Size:</p>
            <div className="row g-2">
              {["S", "M", "L", "XL"].map((size) => (
                <div key={size} className="col-3">
                  <div className="size-box">{size}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="color-selection my-4">
            <p className="text-dark">Color:</p>
            <div className="color-options">
              <div className="color-circle color-black"></div>
              <div className="color-circle color-white"></div>
              <div className="color-circle color-blue"></div>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="row align-items-center my-4">
            <div className="col-3 bg-light border d-flex justify-content-around align-items-center p-2">
              <button className="btn bg-light text-dark">-</button>
              <span className="quantity bg-white">1</span>
              <button className="btn bg-light text-dark">+</button>
            </div>
            <div className="col-9">
              <button className="btn btn-warning w-100 p-3 fw-bold">Add to Cart</button>
            </div>
          </div>

          {/* Product Description */}
          <div className="product-description my-4">
            <h5>Description</h5>
            <p className="text-dark des-text">
              Experience ultimate comfort with our Premium Cotton T-Shirt. Made from 100%
              organic cotton, this shirt features:
            </p>
            <ul>
              <li>Breathable, lightweight fabric</li>
              <li>Reinforced stitching for durability</li>
              <li>Pre-shrunk to maintain perfect fit</li>
              <li>Machine washable</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="similar-products my-4">
  <h3>Similar Products</h3>
  <div className="row">
    {[
      { img: hoodieImage, title: "Classic Gray T-Shirt", price: "$39.99", rating: "⭐⭐⭐⭐" },
      { img: hoodieImage, title: "Navy Essential T-Shirt", price: "$44.99", rating: "⭐⭐⭐⭐⭐" },
      { img: hoodieImage, title: "Black Premium T-Shirt", price: "$49.99", rating: "⭐⭐⭐⭐" },
      { img: hoodieImage, title: "Striped Cotton T-Shirt", price: "$54.99", rating: "⭐⭐⭐⭐⭐" },
    ].map((product, index) => (
      <div key={index} className="col-md-3 text-start">
        <img src={product.img} alt={product.title} className="img-fluid rounded" />
        <h5 className="mt-2">{product.title}</h5>
        <p >{product.price}</p>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default ProductDetail;
