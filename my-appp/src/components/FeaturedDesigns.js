import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FeaturedDesigns = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dono category ke products fetch karo
        const [response4, response5] = await Promise.all([
          axios.get(process.env.REACT_APP_API_BASE_URL + "/product/category/4"),
          axios.get(process.env.REACT_APP_API_BASE_URL + "/product/category/5")
        ]);

        // Dono category ke products ko combine karo
        const combinedProducts = [...response4.data.products, ...response5.data.products];

        // Shuffle karke sirf 3 random products dikhao
        const shuffledProducts = combinedProducts
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        setProducts(shuffledProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container text-center featured mt-4">
      <h2 className="fw-bold">Featured Designs</h2>
      <div className="row mt-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="col-12 col-sm-6 col-md-4 mb-4"
            onClick={() => navigate(`/products/detail1/${product.id}`)}
          >
            <Card className="border-0 shadow-sm h-100">
              <Card.Img
                variant="top"
                src={`/uploads/${product.images[0]}`}
                alt={product.description}
                style={{ height: "400px"}} 
              />
              <Card.Body className="bg-light">
                <Card.Title className="fw-bold">{product.description}</Card.Title>
                <p className="text-warning mb-1">
                  {"\u2605\u2605\u2605\u2605\u2605"} <span className="text-muted">(124 reviews)</span>
                </p>
                <h5 className="text-danger fw-bold">₹{product.price}</h5>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedDesigns;
