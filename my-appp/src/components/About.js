import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <div className="container my-5">
      {/* Who We Are Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 text-center">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpOo2cGRo45GqL6VhbHfZ8SFivsO4Fv26aLA&s"
            alt="About Us"
            className="img-fluid rounded shadow-lg"
            style={{ height: "300px", width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="text-primary fw-bold">Who We Are</h2>
          <p className="text-secondary fs-5">
            We are a team of dedicated professionals committed to delivering 
            high-quality products and services to our customers. Our journey 
            began with a vision to innovate and create solutions that make 
            a difference in people's lives.
          </p>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6 order-md-2 text-center">
          <img
            src="https://t4.ftcdn.net/jpg/00/96/54/53/360_F_96545306_cX6N4Fv2TTVRMKahA3aoCvxlUOGm2KkV.jpg"
            alt="Our Mission"
            className="img-fluid rounded shadow-lg"
            style={{ height: "300px", width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6 order-md-1">
          <h2 className="text-primary fw-bold">Our Mission</h2>
          <p className="text-secondary fs-5">
            Our mission is to provide innovative and reliable solutions tailored 
            to meet our customers' needs. We strive for excellence in every 
            project we undertake and work towards building a better future 
            through cutting-edge technology and creativity.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img
            src="https://media.istockphoto.com/id/655887334/photo/why-choose-us.jpg?s=612x612&w=0&k=20&c=TJLPS91NH3rTJhdcAgB92M984kcJ80S910X-4XnTpNE="
            alt="Why Choose Us"
            className="img-fluid rounded shadow-lg"
            style={{ height: "300px", width: "100%", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="text-primary fw-bold">Why Choose Us</h2>
          <p className="text-secondary fs-5">
            We stand out because of our commitment to quality, customer 
            satisfaction, and continuous improvement. Our expert team ensures 
            that every service we provide exceeds expectations and adds 
            value to our clients.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
