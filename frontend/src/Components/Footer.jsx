import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient( #212121ff)",
        color: "#fff",
      }}
      className="mt-5 pt-5 pb-4"
    >
      <div className="container px-4 mx-auto">
        <div className="row text-center text-md-start">
          {/* 🔹 Brand */}
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <Link to="/" className="text-decoration-none text-white">
              <h2 className="fw-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
                SkillSwap
              </h2>
            </Link>
            <p className="small mt-2">
              Learn anything. Teach what you love.  
              Connecting people through skills.
            </p>
          </div>

          {/* 🔹 Product */}
          <div className="col-6 col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Product</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white text-decoration-none d-block mb-2">Home</Link></li>
              <li><Link to="/howitworks" className="text-white text-decoration-none d-block mb-2">How it works</Link></li>
              <li><Link to="/#features" className="text-white text-decoration-none d-block mb-2">Features</Link></li>
              <li><Link to="/#join" className="text-white text-decoration-none d-block mb-2">Join early access</Link></li>
            </ul>
          </div>

          {/* 🔹 Resources */}
          <div className="col-6 col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Resources</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-white text-decoration-none d-block mb-2">About us</Link></li>
              <li><Link to="/team" className="text-white text-decoration-none d-block mb-2">Team</Link></li>
              <li><Link to="/careers" className="text-white text-decoration-none d-block mb-2">Careers</Link></li>
              <li><Link to="/blog" className="text-white text-decoration-none d-block mb-2">Blog & Changelog</Link></li>
              <li><Link to="/faq" className="text-white text-decoration-none d-block mb-2">FAQ</Link></li>
              <li><Link to="/contact" className="text-white text-decoration-none d-block mb-2">Contact</Link></li>
            </ul>
          </div>

          {/* 🔹 Legal */}
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <h5 className="fw-bold mb-3">Legal</h5>
            <ul className="list-unstyled">
              <li><Link to="/legal/privacy-policy" className="text-white text-decoration-none d-block mb-2">Privacy Policy</Link></li>
              <li><Link to="/legal/terms-of-use" className="text-white text-decoration-none d-block mb-2">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        {/* 🔹 Bottom Line */}
        <div className="text-center mt-4 pt-3 border-top border-light">
          <p className="mb-0 small">
            © {new Date().getFullYear()} SkillSwap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
 