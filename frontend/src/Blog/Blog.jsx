import React, { useState } from "react";
import "./Blog.css";
import blog1 from "../assets/images/blog1.png";
import p1 from "../assets/images/p1.png";
import p2 from "../assets/images/p2.png";
import p3 from "../assets/images/p3.png";

const blogs = [
  {
    id: 1,
    title: "The Future of Skill Sharing",
    author: "Krishna Rajput",
    category: "Innovation",
    date: "Sept 2, 2025",
    img: blog1,
    excerpt: "This article explores modern approaches to learning, teaching, and community building with inspiring insights and practical tips.",
  },
  {
    id: 2,
    title: "Top Digital Skills to Learn in 2025",
    author: "Aachal",
    category: "Skills",
    date: "Sept 3, 2025",
    img: p1,
    excerpt: "This article explores modern approaches to learning, teaching, and community building with inspiring insights and practical tips.",
  },
  {
    id: 3,
    title: "Teaching That Inspires",
    author: "Neha Sharma",
    category: "Education",
    date: "Sept 4, 2025",
    img: p2,
    excerpt: "This article explores modern approaches to learning, teaching, and community building with inspiring insights and practical tips.",
  },
  {
    id: 5,
    title: "Building Community Through Mentorship",
    author: "Ravi Kumar",
    category: "Community",
    date: "Sept 5, 2025",
    img: p3,
    excerpt: "How small mentorship circles can create lasting learning ecosystems.",
  },
    {
    id: 6,
    title: "The Future of Skill Sharing",
    author: "Krishna Rajput",
    category: "Innovation",
    date: "Sept 2, 2025",
    img: blog1,
    excerpt: "This article explores modern approaches to learning, teaching, and community building with inspiring insights and practical tips.",
  },
  {
    id: 7,
    title: "Top Digital Skills to Learn in 2025",
    author: "Aachal",
    category: "Skills",
    date: "Sept 3, 2025",
    img: p1,
    excerpt: "This article explores modern approaches to learning, teaching, and community building with inspiring insights and practical tips.",
  },
  {
    id: 8,
    title: "Teaching That Inspires",
    author: "Neha Sharma",
    category: "Education",
    date: "Sept 4, 2025",
    img: p2,
    excerpt: "This article explores modern approaches to learning, teaching, and community building with inspiring insights and practical tips.",
  },
  {
    id: 9,
    title: "Building Community Through Mentorship",
    author: "Ravi Kumar",
    category: "Community",
    date: "Sept 5, 2025",
    img: p3,
    excerpt: "How small mentorship circles can create lasting learning ecosystems.",
  },  {
    id: 10,
    title: "The Future of Skill Sharing",
    author: "Krishna Rajput",
    category: "Innovation",
    date: "Sept 2, 2025",
    img: blog1,
    excerpt: "This article explores modern approaches to learning, teaching, and community building with inspiring insights and practical tips.",
  },
  {
    id: 11,
    title: "Top Digital Skills to Learn in 2025",
    author: "Aachal",
    category: "Skills",
    date: "Sept 3, 2025",
    img: p1,
    excerpt: "This article explores modern approaches to learning, teaching, and community building with inspiring insights and practical tips.",
  },
  {
    id: 12,
    title: "Teaching That Inspires",
    author: "Neha Sharma",
    category: "Education",
    date: "Sept 4, 2025",
    img: p2,
    excerpt: "This article explores modern approaches to learning, teaching, and community building with inspiring insights and practical tips.",
  },
  {
    id: 13,
    title: "Building Community Through Mentorship",
    author: "Ravi Kumar",
    category: "Community",
    date: "Sept 5, 2025",
    img: p3,
    excerpt: "How small mentorship circles can create lasting learning ecosystems.",
  },
];


const Blog = () => {
  const [activeTab, setActiveTab] = useState("All");

  const categories = ["All", "Innovation", "Skills", "Education", "Community", "Growth"];

  const filteredBlogs =
    activeTab === "All" ? blogs : blogs.filter((b) => b.category === activeTab);

  return (
    <>

      {/* 🔹 Blog Hero Section */}
      <section className="blog-hero">
        <div>
           <h1 className="fw-bold display-4">🌟 Explore Inspiring Stories & Ideas 🌟</h1>
          <p>Dive into the latest blogs about innovation, skills, teaching, and communities.</p>
        </div>
      </section>

  <div className="Blog-main">

      {/* 🔹 Blog Cards */}
      <main className="Blogcontainer container ">
        {/* 🔹 Category Tabs */}
      <div className="container py-4 text-center">
        <ul className="nav justify-content-center mb-4">
          {categories.map((cat) => (
            <li key={cat} className="nav-item">
              <button
                className={`nav-link tab-btn ${activeTab === cat ? "active" : ""}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>
        <div className="row g-4">
          {filteredBlogs.map((blog) => (
            <article key={blog.id} className="col-md-6 col-lg-4">
              <div className="blog-card shadow-lg border-0 h-100" data-category={blog.category}>
                <div className="blog-img-wrapper">
                  <img src={blog.img} alt={blog.title} className="blog-img" />
                  <span className="blog-category">{blog.category}</span>
                </div>
                <div className="card-body p-4 d-flex flex-column">
                  <h5 className="fw-bold">{blog.title}</h5>
                  <p className="text-muted small mb-2">
                    <i className="bi bi-person-circle"></i> {blog.author} | {" "}
                    <i className="bi bi-calendar-event"></i> {blog.date}
                  </p>
                  <p className="text-secondary flex-grow-1">{blog.excerpt}</p>
                  <button type="button" className="btn btn-primary btn-read mt-3 align-self-start" aria-label={`Read more about ${blog.title}`}>
                    Read More <i className="bi bi-arrow-right-circle ms-2"></i>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

     
      </main>

      {/* 🔹 Featured Section */}
      <section className="container py-5">
        <h2 className="fw-bold text-center mb-4 text-white">Featured Articles</h2>
        <div className="row g-4">
          {blogs.slice(0, 3).map((b) => (
            <div key={b.id} className="col-md-4">
              <div className="featured-card p-4 h-100">
                <h5>{b.title}</h5>
                <p>{b.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
</div>
    
      {/* 🔹 Newsletter CTA */}
      <section className="newsletter py-5 text-center">
        <h3 className="fw-bold">Join 10,000+ readers</h3>
        <p className="mb-4">Get inspiring blogs delivered straight to your inbox weekly.</p>
        <form className="d-flex justify-content-center gap-2 flex-wrap">
          <input type="email" className="form-control w-auto px-3" placeholder="Enter your email" />
          <button type="submit" className="btn btn-gradient btn-sm fw-bold">
            Subscribe
          </button>
        </form>
      </section>

    
    </>
  );
};

export default Blog;
