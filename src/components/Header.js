import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // For routing
import {
  FaHome,
  FaUser,
  FaCode,
  FaHandshake,
  FaBlog,
  FaProjectDiagram,
  FaCertificate,
  FaEnvelope,
} from "react-icons/fa"; // Import icons
import "../styles/Header.css"; // Assuming your CSS file is named Header.css
import { MdReportProblem } from "react-icons/md";
const Header = () => {
  const [text, setText] = useState("");
  const fullText = "Welcome to My Portfolio!";
  const typingSpeed = 100; // Speed of typing in milliseconds

  // Get the current route location
  const location = useLocation();

  // Typewriter effect
  useEffect(() => {
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="pratik-header">
      <div className="header-content">
        <h1 className="header-text">
          {text}
          <span className="cursor">|</span> {/* Blinking cursor */}
        </h1>

        {/* Navigation Icons */}
        <div className="header-icons">
          <Link
            to="/"
            className={`icon-link ${location.pathname === "/" ? "active" : ""}`}
          >
            <FaHome className="icon" />
          </Link>
          <Link
            to="/about"
            className={`icon-link ${
              location.pathname === "/about" ? "active" : ""
            }`}
          >
            <FaUser className="icon" />
          </Link>
          <Link
            to="/pratik-skills"
            className={`icon-link ${
              location.pathname === "/pratik-skills" ? "active" : ""
            }`}
          >
            <FaCode className="icon" />
          </Link>
          <Link
            to="/pratik-collaboration"
            className={`icon-link ${
              location.pathname === "/pratik-collaboration" ? "active" : ""
            }`}
          >
            <FaHandshake className="icon" />
          </Link>
          <Link
            to="/certificates"
            className={`icon-link ${
              location.pathname === "/certificates" ? "active" : ""
            }`}
          >
            <FaCertificate className="icon" />
          </Link>

          <Link
            to="/pratik-projects"
            className={`icon-link ${
              location.pathname === "/pratik-projects" ? "active" : ""
            }`}
          >
            <FaProjectDiagram className="icon" />
          </Link>
          <Link
            to="/form"
            className={`icon-link ${
              location.pathname === "/form" ? "active" : ""
            }`}
          >
            <MdReportProblem className="icon" />
          </Link>
          <Link
            to="/pratik-blogs"
            className={`icon-link ${
              location.pathname === "/pratik-blogs" ? "active" : ""
            }`}
          >
            <FaBlog className="icon" />
          </Link>
          <Link
            to="/contact"
            className={`icon-link ${
              location.pathname === "/contact" ? "active" : ""
            }`}
          >
            <FaEnvelope className="icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
