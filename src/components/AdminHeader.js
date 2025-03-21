import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import styles from "../styles/Header.css";
import {
  FaUserShield,
  FaNewspaper,
  FaProjectDiagram,
  FaUsers,
  FaHandshake,
  FaUserCog,
  FaTools,
  FaCogs,
  FaTasks,
  FaTachometerAlt,
  FaExclamationTriangle,
} from "react-icons/fa"; // Import icons

const AdminHeader = () => {
  const location = useLocation(); // Get current route
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.name || "Admin"; // Default name

  return (
    <div className="pratik-header">
      <div className="header-content">
        {/* Wrap the glowing icon and text together */}
        <div className="header-title">
          <FaUserShield className="glowing-icon" />
          <h1 className="header-text">Welcome, {userName}!</h1>
        </div>

        {/* Navigation Icons */}
        <div className="header-icons">
          <Link
            to="/admin-dashboard"
            className={`icon-link ${
              location.pathname === "/admin-dashboard" ? "active" : ""
            }`}
            title="Dashboard"
          >
            <FaTachometerAlt className="icon" />
          </Link>
          <Link
            to="/admin-blogs"
            className={`icon-link ${
              location.pathname === "/admin-blogs" ? "active" : ""
            }`}
            title="Manage Blogs"
          >
            <FaNewspaper className="icon" />
          </Link>
          <Link
            to="/admin-collab"
            className={`icon-link ${
              location.pathname === "/admin-collab" ? "active" : ""
            }`}
            title="Collaborations"
          >
            <FaHandshake className="icon" />
          </Link>
          <Link
            to="/admin-profile"
            className={`icon-link ${
              location.pathname === "/admin-profile" ? "active" : ""
            }`}
            title="Admin Profile"
          >
            <FaUserCog className="icon" />
          </Link>
          <Link
            to="/admin-skills"
            className={`icon-link ${
              location.pathname === "/admin-skills" ? "active" : ""
            }`}
            title="Skills Management"
          >
            <FaTools className="icon" />
          </Link>
          <Link
            to="/admin-projects"
            className={`icon-link ${
              location.pathname === "/admin-projects" ? "active" : ""
            }`}
            title="Projects"
          >
            <FaProjectDiagram className="icon" />
          </Link>
          <Link
            to="/admin-users"
            className={`icon-link ${
              location.pathname === "/admin-users" ? "active" : ""
            }`}
            title="User Management"
          >
            <FaUsers className="icon" />
          </Link>
          <Link
            to="/admin-issues"
            className={`icon-link ${
              location.pathname === "/admin-issues" ? "active" : ""
            }`}
            title="Admin Tasks"
          >
            <FaExclamationTriangle className="icon" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
