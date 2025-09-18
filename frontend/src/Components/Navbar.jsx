import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const CustomNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("token"))
  );

  // Close when clicking a nav link or outside the menu
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    const onClickOutside = (e) => {
      if (!navRef.current) return;
      if (isOpen && !navRef.current.contains(e.target)) setIsOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);

    // prevent body scroll when menu open on small screens
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // keep auth state in sync (other tabs) and on mount
  useEffect(() => {
    const onStorage = () => setIsAuthenticated(Boolean(localStorage.getItem("token")));
    const onAuthChanged = () => setIsAuthenticated(Boolean(localStorage.getItem("token")));
    window.addEventListener("storage", onStorage);
    // also listen for a custom in-tab event so the navbar updates immediately after login
    window.addEventListener("authChanged", onAuthChanged);
    // refresh auth state on mount
    setIsAuthenticated(Boolean(localStorage.getItem("token")));
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("authChanged", onAuthChanged);
    };
  }, []);

  const handleNavLink = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    // Remove auth token (or other auth keys) and navigate home
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsOpen(false);
    navigate("/login");
  };

  // profile dropdown open state (separate from mobile menu)
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // close profile dropdown on outside click or Escape
  useEffect(() => {
    const onClickOutside = (e) => {
      if (!profileRef.current) return;
      if (profileOpen && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setProfileOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [profileOpen]);

  return (
    <header className={`site-header ${isOpen ? "scrolled" : ""}`} ref={navRef}>
      <nav className="navbar container">
        <Link to="/" className="brand" onClick={handleNavLink}>
          <img src="/image.jpg" alt="SkillSwap" className="brand-logo" />
          <span className="brand-text">SkillSwap</span>
        </Link>

        <button
          className={`hamburger ${isOpen ? "is-active" : ""}`}
          style={{ marginLeft: "auto" }}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((s) => !s)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-menu ${isOpen ? "open" : ""}`}>
          <ul className="nav-list">
            <li>
              <Link to="/Find" onClick={handleNavLink} className="nav-link">
                Find Globally
              </Link>
            </li>
            <li>
              <Link to="/" onClick={handleNavLink} className="nav-link">
                How it works
              </Link>
            </li>
            <li>
              <Link to="/blog" onClick={handleNavLink} className="nav-link">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={handleNavLink} className="nav-link">
                About us
              </Link>
            </li>
            <li>
              {isAuthenticated ? (
                // show profile icon with dropdown
                <div className="profile-wrapper" ref={profileRef}>
                  <button
                    type="button"
                    className="profile-btn"
                    aria-haspopup="menu"
                    aria-expanded={profileOpen}
                    onClick={() => setProfileOpen((s) => !s)}
                  >
                    <span className="avatar" aria-hidden="true">KS</span>
                    <span className="visually-hidden">Open profile menu</span>
                  </button>

                  {profileOpen && (
                    <div className="profile-dropdown" role="menu">
                      <Link to="/user" className="dropdown-item" onClick={() => { setProfileOpen(false); handleNavLink(); }} role="menuitem">
                        Profile
                      </Link>
                      <button type="button" className="dropdown-item" onClick={() => { setProfileOpen(false); handleLogout(); }} role="menuitem">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" onClick={handleNavLink} className="cta">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>

        {/* subtle overlay for mobile when menu open */}
        <div className={`overlay ${isOpen ? "visible" : ""}`} onClick={() => setIsOpen(false)} />
      </nav>
    </header>
  );
};

export default CustomNavbar;
