import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #a99f43, darkred)",
        color: "#fff",
      }}
      className="pt-5 pb-4"
    >
      <div className="container">
        <div className="row text-center text-md-start">
          {/* 🔹 Brand */}
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <a href="/" className="text-decoration-none text-white">
              <h2 className="fw-bold" style={{ fontFamily: "Poppins, sans-serif" }}>
                SkillSwap
              </h2>
            </a>
            <p className="small mt-2">
              Learn anything. Teach what you love.  
              Connecting people through skills.
            </p>
          </div>

          {/* 🔹 Product */}
          <div className="col-6 col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Product</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white text-decoration-none d-block mb-2">Home</a></li>
              <li><a href="/howitworks" className="text-white text-decoration-none d-block mb-2">How it works</a></li>
              <li><a href="/#features" className="text-white text-decoration-none d-block mb-2">Features</a></li>
              <li><a href="/#join" className="text-white text-decoration-none d-block mb-2">Join early access</a></li>
            </ul>
          </div>

          {/* 🔹 Resources */}
          <div className="col-6 col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Resources</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-white text-decoration-none d-block mb-2">About us</a></li>
              <li><a href="/team" className="text-white text-decoration-none d-block mb-2">Team</a></li>
              <li><a href="/careers" className="text-white text-decoration-none d-block mb-2">Careers</a></li>
              <li><a href="/blog" className="text-white text-decoration-none d-block mb-2">Blog & Changelog</a></li>
              <li><a href="/faq" className="text-white text-decoration-none d-block mb-2">FAQ</a></li>
              <li><a href="/contact" className="text-white text-decoration-none d-block mb-2">Contact</a></li>
            </ul>
          </div>

          {/* 🔹 Legal */}
          <div className="col-12 col-md-6 col-lg-3 mb-4">
            <h5 className="fw-bold mb-3">Legal</h5>
            <ul className="list-unstyled">
              <li><a href="/legal/privacy-policy" className="text-white text-decoration-none d-block mb-2">Privacy Policy</a></li>
              <li><a href="/legal/terms-of-use" className="text-white text-decoration-none d-block mb-2">Terms of Use</a></li>
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
 