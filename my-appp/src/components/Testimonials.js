import React from "react";
import { Container, Card } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import user1 from "../assets/user1.png";
import user2 from "../assets/user2.png";
import user3 from "../assets/user3.png";
import "./Style/Testimonials.css";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      image: user1,
      name: "Sarah Johnson",
      review:
        "Amazing quality and the design tool is so easy to use! I created custom t-shirts for our team event and everyone loved them.",
      bgColor: "#fdeeee",
    },
    {
      id: 2,
      image: user2,
      name: "Michael Chen",
      review:
        "The customer service is outstanding! They helped me perfect my design and the delivery was faster than expected.",
      bgColor: "#eefdf4",
    },
    {
      id: 3,
      image: user3,
      name: "Emily Rodriguez",
      review:
        "Perfect for my small business! The custom mugs I ordered came out exactly as designed and my customers love them.",
      bgColor: "#fef9e6",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Container className="testimonials-container">
      <h3 className="testimonial-title text-center mb-4">What Our Customers Say</h3>
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-slide">
            <Card className="testimonial-card p-4 mb-4" style={{ background: testimonial.bgColor }}>
              <div className="testimonial-header">
                <img src={testimonial.image} alt={testimonial.name} className="testimonial-img" />
                <div>
                  <Card.Title className="testimonial-name">{testimonial.name}</Card.Title>
                  <p className="testimonial-stars">★★★★★</p>
                </div>
              </div>
              <Card.Body>
                <Card.Text className="testimonial-text">"{testimonial.review}"</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default Testimonials;
