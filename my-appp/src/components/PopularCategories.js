import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Style/PopularCategories.css";
import pc1 from "../assets/pc1.png";
import pc2 from "../assets/pc2.png";
import pc3 from "../assets/pc3.png";
import pc4 from "../assets/pc4.png";
import { useNavigate } from "react-router-dom";

const PopularCategories = () => {
  const categories = [
    { id: 1, image: pc1, alt: "Category 1", link: "/category/5" },
    { id: 2, image: pc2, alt: "Category 2", link: "/category/2" },
    { id: 3, image: pc3, alt: "Category 3", link: "/category/6" },
    { id: 4, image: pc4, alt: "Category 4", link: "/category/4" },
  ];

  const navigate = useNavigate();

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4 popular">Popular Categories</h3>
      <Row className="g-3">
        {categories.map((category) => (
          <Col
            key={category.id}
            xs={12}
            sm={6}
            md={3}
            className="text-center"
            onClick={() => navigate(category.link)}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex justify-content-center">
              <img
                src={category.image}
                alt={category.alt}
                className="img-fluid rounded image-category mb-4"
              />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PopularCategories;

