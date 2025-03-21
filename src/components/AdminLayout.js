import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import AdminHeader from "./AdminHeader";
import {
  FaTachometerAlt,
  FaUsers,
  FaTools,
  FaProjectDiagram,
  FaBlog,
  FaUserCircle,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaHandshake,
  FaHome,
  FaExclamationTriangle,
} from "react-icons/fa"; // Import icons
import logo from "../images/logo.png";
const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Get user from localStorage
  const isAdmin = user?.isAdmin; // Check if user is admin

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
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
      <div className={`left-sidebar ${isOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          ×
        </button>
        <img src={logo} alt="logo" className="logo" />
        <h2>PJ WebWorks</h2>
        <ul>
          <li>
            <NavLink to="/admin-dashboard" onClick={toggleSidebar}>
              <FaTachometerAlt /> Pratik-Dashboard
            </NavLink>
          </li>
          {/* Show login only if user is NOT an admin and not logged in */}
          {!isAdmin && !user && (
            <li>
              <NavLink to="/login" onClick={toggleSidebar}>
                <FaSignOutAlt /> Login
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to="/admin-collab" onClick={toggleSidebar}>
              <FaHandshake /> Pratik-Collaboration
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-users" onClick={toggleSidebar}>
              <FaUsers /> Pratik-All-Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-skills" onClick={toggleSidebar}>
              <FaTools /> Pratik-Skills
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-projects" onClick={toggleSidebar}>
              <FaProjectDiagram /> Pratik-Projects
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin-issues" onClick={toggleSidebar}>
              <FaExclamationTriangle /> Issue Management
            </NavLink>
          </li>

          <li>
            <NavLink to="/admin-blogs" onClick={toggleSidebar}>
              <FaBlog /> Pratik-Blogs
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin-profile" onClick={toggleSidebar}>
              <FaUserCircle /> Pratik-Profile
            </NavLink>
          </li>
          {/* Show Logout only if user is logged in */}
          {user && (
            <li>
              <NavLink onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </NavLink>
            </li>
          )}
        </ul>
        {/* Dark Mode Toggle Button */}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <AdminHeader />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
