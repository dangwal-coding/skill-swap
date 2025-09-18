import React from "react";
import "./Home.css"; // keep your custom animations + extras
const testimonials = [
  {
    img: "./src/Images_Videos/kannu.png",
    name: "Krishna Rajput",
    text: "It's like Uber for learning, but without money involved. Just value.",
    rating: 5,
  },
  {
    img: "./src/Images_Videos/kulshreshtha.png",
    name: "Kulshrestha Dangwal",
    text: "Learning made easy, meaningful, and free!",
    rating: 4.3,
  },
  {
    img: "./src/Images_Videos/kannu.png",
    name: "Aachal",
    text: "Learning made easy, meaningful, and free!",
    rating: 4,
  },
  {
    img: "./src/Images_Videos/kulshreshtha.png",
    name: "Kulshrestha Dangwal",
    text: "Learning made easy, meaningful, and free!",
    rating: 5,
  },
  {
    img: "./src/Images_Videos/kannu.png",
    name: "Aachal",
    text: "Learning made easy, meaningful, and free!",
    rating: 4.5,
  },
];

const Home = () => {
  return (
    <>
      {/* 🔹 Background Video Section */}
     <div className="main position-relative d-flex justify-content-center align-items-center">
        <video className="back-video" autoPlay loop muted>
          <source src="./src/Images_Videos/backvideo1.mp4" type="video/mp4" />
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
            Real-time AI matching. No fees, no gatekeeping  just human connection and meaningful growth.
          </p>

          <div className="d-flex justify-content-center gap-4 mt-4">
            <a href="./#join" className="join-button">
              Join Free for Students
            </a>
            <a href="./#join" className="join-button">
              Upgrade Your Learning
            </a>
          </div>
        </div>
      </div>

      {/* 🔹 Heading Section */}
      <div className="ReviewSection text-center py-5">
        <h1 className="display-4 fw-medium px-4" style={{ color: "Darkkhaki" }}>
          Trusted by early learners
        </h1>
        <h1 className="display-4 fw-medium px-4" style={{ color: "#ffc8c8" }}>
          and teachers worldwide.
        </h1>

        {/* 🔹 Testimonials Section */}
        <section className="overflow-hidden py-4">
          <div className="d-flex gap-3 scroll-track">
            {testimonials.concat(testimonials).map((t, idx) => (
              <div key={idx} className="Reviewcards text-white">
                <div className="d-flex align-items-center gap-2 p-2">
                  <img src={t.img} alt={t.name} className="testimonialimg" />
                  <h5 className="m-0">{t.name}</h5>
                </div>
                <p className="text-light p-3" style={{ fontFamily: "monospace" }}>{t.text}</p>
                {/* ⭐ Star Rating */}
                <div className="px-3 mb-2">
                  {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1;
                    if (ratingValue <= Math.floor(t.rating)) {
                      return <i key={i} className="bi bi-star-fill text-warning"></i>; // full star
                    } else if (ratingValue === Math.ceil(t.rating) && !Number.isInteger(t.rating)) {
                      return <i key={i} className="bi bi-star-half text-warning"></i>; // half star
                    } else {
                      return <i key={i} className="bi bi-star text-secondary"></i>; // empty star
                    }
                  })}
                </div>

              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
