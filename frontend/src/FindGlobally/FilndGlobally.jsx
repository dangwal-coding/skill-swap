import React from "react";
import CustomNavbar from "../Components/Navbar.jsx";
import "./FindGlobally.css"; // 🔹 we'll style it separately

// Import images so bundlers (Vite/webpack) can resolve them
import kulshreshtha from "../assets/images/p1.png";
import kannu from "../assets/images/p2.png";
import img from "../assets/images/p3.png";
import img1 from "../assets/images/p4.png";

const profiles = [
  {
    id: "p1",
    img: kulshreshtha,
    name: "Aditya Sharma",
    skill: "Data Scientist",
    bio: "Turning data into insights with Python & ML.",
  },
  {
    id: "p2",
    img: img,
    name: "Krishna Rajput",
    skill: "Full Stack Developer",
    bio: "Building apps with React, .NET, and Azure. Love mentoring.",
  },
  {
    id: "p3",
    img: img1,
    name: "Aachal",
    skill: "Digital Marketing",
    bio: "Helping businesses grow online with creative campaigns.",
  },
  {
    id: "p4",
    img: kannu,
    name: "Aditya Sharma",
    skill: "Data Scientist",
    bio: "Turning data into insights with Python & ML.",
  },
  {
    id: "p5",
    img: kulshreshtha,
    name: "Ravi Verma",
    skill: "UI/UX Designer",
    bio: "Designs that are simple, modern, and user-focused.",
  },
  {
    id: "p6",
    img: kannu,
    name: "Aditya Sharma",
    skill: "Data Scientist",
    bio: "Turning data into insights with Python & ML.",
  },
   {
    id: "p7",
    img: img,
    name: "Ravi Verma",
    skill: "UI/UX Designer",
    bio: "Designs that are simple, modern, and user-focused.",
  },
  {
    id: "p8",
    img: kannu,
    name: "Aditya Sharma",
    skill: "Data Scientist",
    bio: "Turning data into insights with Python & ML.",
  },
];

const FindGlobally = () => {
  return (
    <>
      <div className="profiles-header text-center">
        <h1 className="fw-bold display-4">🌟 Skill Community 🌟</h1>
        <p className="lead">
          Connect, Learn, and Grow with people who share their passions.
        </p>
      </div>
<div className="Find-main">
      <div className="container py-5">
        <div className="row g-4">
          {profiles.map((p) => (
            <div key={p.id} className="col-md-4 col-lg-3 col-sm-6">
              <div className="profile-card shadow-lg border-0 rounded-4 text-center p-3">
                <div className="profile-img-wrapper mx-auto">
                  <img src={p.img} alt={p.name} className="profile-img" />
                </div>
                <h5 className="mt-3 fw-bold">{p.name}</h5>
                <p className="text-danger fw-semibold">{p.skill}</p>
                <p className="text-muted small">{p.bio}</p>
                <button className="btn connect-btn mt-2">
                  <i className="bi bi-people-fill me-2"></i> Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default FindGlobally;
