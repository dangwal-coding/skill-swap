import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // keep your custom animations + extras
import Cards from "./Cards";
import ReviewsSection from "../Components/Review";
import ContactSection from "../Components/Contact";
import backvideo from "../assets/backvideo1.mp4";

const Home = () => {
  return (
    <>
      {/* 🔹 Background Video Section */}
    <div className="main position-relative d-flex justify-content-center align-items-center mt-5">
      <video className="back-video mt-3 mt-lg-4" autoPlay loop muted>
          <source src={backvideo} type="video/mp4" />
        </video>
        {/* dim/blur overlay to improve contrast */}
        <div className="video-overlay" />
        <div className="container text-center my-5 px-4">
          <h1 className="fw-medium display-3 heading-primary">
            Learn anything.
          </h1>
          <h1 className="fw-medium display-3 heading-secondary">
            Teach what you love.
          </h1>

          <p className="fs-5 mt-3 hero-subtitle" style={{ fontFamily: "Poppins, sans-serif" }}>
            Real-time AI matching. No fees, no gatekeeping just human connection and meaningful growth.
          </p>

          <div className="d-flex justify-content-center gap-4 mt-4">
            <Link to="/#join" className="join-button">
              Join Free for Students
            </Link>
            <Link to="/#join" className="join-button">
              Upgrade Your Learning
            </Link>
          </div>
        </div>
      </div>
      {/* 🔹 cards section  */}
      <Cards />
     {/* 🔹 review section  */}
     <ReviewsSection className="w-100" />
     {/* 🔹 contact section  */}
     <ContactSection className="w-100" />
    </>
  );
};

export default Home;
