import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import pc1 from "../assets/pc1.png";
import pc2 from "../assets/pc2.png";
import pc3 from "../assets/pc3.png";
import pc4 from "../assets/pc4.png";
import "./Style/FooterTop.css";
import { useNavigate } from "react-router-dom";

const FooterTop = () => {

  const navigate = useNavigate("");

  const categories = [
    { id: 1, image: pc1, title: "Brand Identity", description: "Create consistent brand merchandise", bgColor: "#f5f1f9" },
    { id: 2, image: pc2, title: "Event Merchandise", description: "Stand out at your next event", bgColor: "#fdeeee" },
    { id: 3, image: pc3, title: "Team Uniforms", description: "Unite your team with custom gear", bgColor: "#eefdf4" },
    { id: 4, image: pc4, title: "Promotional Items", description: "Boost your marketing efforts", bgColor: "#fef9e6" },
  ];

  return (
    <Container className="footer-top-container">
      <Row className="justify-content-center">
        {categories.map((category) => (
          <Col key={category.id} md={3} sm={6} xs={12} onClick={() => {
            navigate('/products')
          }}>
            <Card className="footer-top-card" style={{ background: category.bgColor }}>
              <Card.Img variant="top" src={category.image} className="category-image" />
              <Card.Body>
                <Card.Title className="category-title">{category.title}</Card.Title>
                <Card.Text className="category-description">{category.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FooterTop;
