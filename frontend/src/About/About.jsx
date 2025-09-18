import React from "react";
import CustomNavbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./About.css"; 
const About = () => {
  return (
    <>
  <CustomNavbar />
     <div className="Aboutmain position-relative">
      {/* 🔹 Background Video */}
      <video className="back-video" autoPlay loop muted>
        <source src="./src/Images_Videos/backvideo1.mp4" type="video/mp4" />
      </video>

      {/* 🔹 Content Section */}
      <div className="maincontainer text-center text-light">
        <h1 className="display-3 fw-bold" style={{ color: "#d9d176" }}>
          About SkillSwap
        </h1>
        <p
          className="lead mt-3 px-3"
          style={{
            fontFamily: "Poppins, sans-serif",
            maxWidth: "800px",
            margin: "0 auto",
            color: "floralwhite",
          }}
        >
          SkillSwap is a peer-to-peer learning platform where students and
          teachers connect directly. Share what you know, learn what you don't —
          without barriers, fees, or gatekeeping.  
        </p>

        {/* 🔹 Features Section */}
        <div className="row mt-5 g-4">
          <div className="col-md-4">
            <div className="card bg-dark text-light h-100 shadow-lg border-0">
              <div className="card-body">
                <i className="bi bi-lightbulb display-4 text-warning"></i>
                <h4 className="mt-3">Learn Freely</h4>
                <p>Access a variety of skills without paying anything.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-dark text-light h-100 shadow-lg border-0">
              <div className="card-body">
                <i className="bi bi-people display-4 text-danger"></i>
                <h4 className="mt-3">Connect Globally</h4>
                <p>Meet people worldwide who share your passions.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-dark text-light h-100 shadow-lg border-0">
              <div className="card-body">
                <i className="bi bi-star-fill display-4 text-info"></i>
                <h4 className="mt-3">Grow Together</h4>
                <p>Both teachers and learners gain real value.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 🔹 Call to Action */}
        <div className="mt-5">
          <a href="./#join" className="btn btn-warning btn-lg me-3">
            Join Now
          </a>
          <a href="./#contact" className="btn btn-outline-danger btn-lg">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  
    <Footer />
    </>
  );
};


export default About;
