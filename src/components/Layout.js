import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaInfoCircle,
  FaHandshake,
  FaTools,
  FaBlog,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaReact,
  FaArrowLeft,
  FaEnvelope,
  FaCertificate,
  FaArrowRight,
} from "react-icons/fa"; // Import icons
import "../styles/Layout.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import logo from "../images/logo.png";
import { MdReportProblem } from "react-icons/md";
const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // For mobile sidebar toggle
  const [isCollapsed, setIsCollapsed] = useState(false); // For desktop sidebar collapse
  const [isDarkMode, setIsDarkMode] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.isAdmin;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Toggle Collapse/Expand Sidebar on Desktop
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    localStorage.removeItem("user"); // Remove user data
    navigate("/login"); // Redirect to login page
  };

  // Apply Dark/Light Mode to Body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div className={`layout ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      {/* Hamburger Menu - Visible on Small Screens */}
      <div className="hamburger" onClick={toggleSidebar}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Sidebar */}
      <div
        className={`left-sidebar ${isOpen ? "open" : ""} ${
          isCollapsed ? "collapsed" : ""
        }`}
      >
        <button className="close-btn" onClick={toggleSidebar}>
          ×
        </button>

        {/* Collapse/Expand Button for Desktop */}
        <button className="collapse-btn" onClick={toggleCollapse}>
          {isCollapsed ? <FaArrowRight /> : <FaArrowLeft />}
        </button>

        {!isCollapsed && (
          <>
            <img src={logo} alt="logo" width="100px" className="logo" />
            <h2>PJ WebWorks</h2>
          </>
        )}

        <ul>
          <li>
            <NavLink to="/" onClick={toggleSidebar}>
              <FaHome /> {!isCollapsed && "My Self"}
            </NavLink>
          </li>
          {/* Show login only if user is NOT an admin and not logged in */}
          {!isAdmin && !user && (
            <li>
              <NavLink to="/login" onClick={toggleSidebar}>
                <FaSignInAlt /> {!isCollapsed && "Login"}
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to="/register" onClick={toggleSidebar}>
              <FaUserPlus /> {!isCollapsed && "Register"}
            </NavLink>
          </li>

          <li>
            <NavLink to="/about" onClick={toggleSidebar}>
              <FaInfoCircle /> {!isCollapsed && "About"}
            </NavLink>
          </li>
          <li>
            <NavLink to="/pratik-collaboration" onClick={toggleSidebar}>
              <FaHandshake /> {!isCollapsed && "Collaboration"}
            </NavLink>
          </li>
          <li>
            <NavLink to="/certificates" onClick={toggleSidebar}>
              <FaCertificate /> {!isCollapsed && "Certificates"}
            </NavLink>
          </li>
          <li>
            <NavLink to="/pratik-skills" onClick={toggleSidebar}>
              <FaReact /> {!isCollapsed && "Skills"}
            </NavLink>
          </li>
          <li>
            <NavLink to="/pratik-projects" onClick={toggleSidebar}>
              <FaTools /> {!isCollapsed && "Projects"}
            </NavLink>
          </li>

          <li>
            <NavLink to="/pratik-blogs" onClick={toggleSidebar}>
              <FaBlog /> {!isCollapsed && "Blogs"}
            </NavLink>
          </li>
          <li>
            <NavLink to="/form" onClick={toggleSidebar}>
              <MdReportProblem /> {!isCollapsed && "Submit Issue"}
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={toggleSidebar}>
              <FaEnvelope /> {!isCollapsed && "Contact Me"}
            </NavLink>
          </li>
          {/* Show Logout only if user is logged in */}
          {user && (
            <li>
              <NavLink onClick={handleLogout}>
                <FaSignOutAlt /> {!isCollapsed && "Logout"}
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className={`main-content ${isCollapsed ? "collapsed" : ""}`}>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
