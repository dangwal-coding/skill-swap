import React from "react";
import "./PopularSkills.css";
import { Link } from "react-router-dom";

const skills = [
  { key: "web", title: "Web Development", desc: "React, Node, HTML/CSS", emoji: "🌐" },
  { key: "uiux", title: "UI / UX Design", desc: "Figma, Prototyping", emoji: "🎨" },
  { key: "graphic", title: "Graphic Design", desc: "Photoshop, Illustrator", emoji: "🖼️" },
  { key: "data", title: "Data Science", desc: "Python, ML", emoji: "📊" },
  { key: "marketing", title: "Digital Marketing", desc: "SEO, Ads", emoji: "📣" },
  { key: "language", title: "Language Tutoring", desc: "English, Spanish...", emoji: "🗣️" },
  { key: "music", title: "Music Lessons", desc: "Guitar, Piano", emoji: "🎵" },
  { key: "photo", title: "Photography", desc: "Editing, Composition", emoji: "📸" },
];

const PopularSkills = () => {
  return (
    <section className="cards-section">
        <div className="cards-panel">
          <div className="cards-header text-center">
          <h2 className="gradient-title">Popular Skills</h2>
          <p className="muted">Discover top-trending skills to swap</p>
        </div>
          <div className="panel-inner">
            <div className="cards-grid">
              
              {skills.map((s) => (
                <Link to={`/Find?skill=${encodeURIComponent(s.title)}`} key={s.key} className="card text-decoration-none">
                  <div className="card-icon" aria-hidden>
                    <span className="emoji">{s.emoji}</span>
                  </div>
                  <div className="card-body">
                    <div className="card-title">{s.title}</div>
                    <div className="card-desc muted">{s.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
    </section>
  );
};

export default PopularSkills;
