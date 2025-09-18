import React from "react";
import "./Blog.css";

const blogs = [
  {
    id: 1,
    title: "The Future of Skill Sharing",
    author: "Krishna Rajput",
    category: "Innovation",
    date: "Sept 12, 2025",
    img: "https://source.unsplash.com/600x700/?future,technology",
    excerpt: "Discover how peer-to-peer learning is revolutionizing the way people grow and connect globally.",
  },
  {
    id: 2,
    title: "Top Digital Skills to Learn in 2025",
    author: "Aachal",
    category: "Skills",
    date: "Sept 10, 2025",
    img: "https://source.unsplash.com/600x700/?coding,computer",
    excerpt: "From AI to personal branding — these are the top skills that will make you future-ready.",
  },
  {
    id: 3,
    title: "Teaching That Inspires",
    author: "Neha Sharma",
    category: "Education",
    date: "Sept 8, 2025",
    img: "https://source.unsplash.com/600x700/?teacher,classroom",
    excerpt: "Great teaching is not about transferring knowledge, but about sparking curiosity.",
  },
  {
    id: 4,
    title: "Why Communities Matter",
    author: "Aman Gupta",
    category: "Community",
    date: "Sept 5, 2025",
    img: "https://source.unsplash.com/600x700/?community,people",
    excerpt: "Communities create impact and accelerate growth. Here’s why they are essential in SkillSwap.",
  },
  {
    id: 5,
    title: "Balancing Learning & Teaching",
    author: "Kulshrestha Dangwal",
    category: "Growth",
    date: "Sept 2, 2025",
    img: "https://source.unsplash.com/600x700/?balance,knowledge",
    excerpt: "Being both a teacher and learner gives you an edge. Learn how to balance the two worlds.",
  },
];

const Blog = () => {
  return (
    <>
      {/* 🔹 Blog Cards */}
      <main className="Blogcontainer">
        <div className="row g-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="col-md-6 col-lg-4">
              <div className="blog-card shadow-lg border-0 h-100">
                <div className="blog-img-wrapper">
                  <img src={blog.img} alt={blog.title} className="blog-img" />
                  <span className="blog-category">{blog.category}</span>
                </div>
                <div className="card-body p-4">
                  <h5 className="fw-bold">{blog.title}</h5>
                  <p className="text-muted small mb-2">
                    <i className="bi bi-person-circle"></i> {blog.author} |{" "}
                    <i className="bi bi-calendar-event"></i> {blog.date}
                  </p>
                  <p className="text-secondary">{blog.excerpt}</p>
                  <a href="#" className="btn btn-gradient btn-sm">
                    Read More <i className="bi bi-arrow-right-circle"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Blog;
