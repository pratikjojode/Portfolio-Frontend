import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./admin/AdminDashboard";
import { Toaster } from "react-hot-toast";
import "./App.css";
import AdminUsers from "./admin/AdminUsers";
import AdminSkills from "./admin/AdminSkills";
import AdminCollaborations from "./admin/AdminCollaborations";
import AdminProjects from "./admin/AdminProjects";
import AdminBlogs from "./admin/AdminBlogs";
import AdminProfile from "./admin/AdminProfile";
import TroubleshootingForm from "./components/TroubleshootingForm";
import AdminIssues from "./admin/AdminIssues";
import AdminRoute from "./components/AdminRoute";
import AboutPratik from "./pages/AboutPratik";
import ProjectsPratik from "./pages/ProjectsPratik";
import PratikSkills from "./pages/PratikSkills";
import BlogsPratik from "./pages/BlogsPratik";
import BlogDetails from "./pages/BlogDetails";
import PrCollab from "./pages/PrCollab";
import Contact from "./pages/Contact";
import Custom404 from "./components/Custom404";
import Certificates from "./pages/Certificates";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const DynamicTitle = () => {
  const location = useLocation();

  useEffect(() => {
    const routeTitleMap = {
      "/": "Home | Pratik's Portfolio",
      "/login": "Login | Pratik's Portfolio",
      "/register": "Register | Pratik's Portfolio",
      "/about": "About Pratik | Pratik's Portfolio",
      "/pratik-projects": "Projects | Pratik's Portfolio",
      "/pratik-skills": "Skills | Pratik's Portfolio",
      "/pratik-blogs": "Blogs | Pratik's Portfolio",
      "/pratik-collaboration": "Collaborations | Pratik's Portfolio",
      "/contact": "Contact | Pratik's Portfolio",
      "/certificates": "Certificates | Pratik's Portfolio",
      "/admin-dashboard": "Admin Dashboard | Pratik's Portfolio",
      "/admin-users": "Admin Users | Pratik's Portfolio",
      "/admin-skills": "Admin Skills | Pratik's Portfolio",
      "/admin-collab": "Admin Collaborations | Pratik's Portfolio",
      "/admin-projects": "Admin Projects | Pratik's Portfolio",
      "/admin-blogs": "Admin Blogs | Pratik's Portfolio",
      "/admin-profile": "Admin Profile | Pratik's Portfolio",
      "/admin-issues": "Admin Issues | Pratik's Portfolio",
      "/form": "Troubleshooting Form | Pratik's Portfolio",
    };

    // Set the title based on the current route
    document.title = routeTitleMap[location.pathname] || "Pratik's Portfolio";
  }, [location.pathname]);

  return null;
};

function App() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <ScrollToTop />
      <DynamicTitle />

      {/* Popup for Resume */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            backdropFilter: "blur(5px)",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              borderRadius: "15px",
              padding: "30px",
              maxWidth: "400px",
              width: "90%",
              textAlign: "center",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              animation: "fadeIn 0.5s ease-in-out",
            }}
          >
            <h2
              style={{
                fontSize: "1.8rem",
                color: "#ff6f61",
                marginBottom: "10px",
              }}
            >
              Download My Resume
            </h2>
            <p
              style={{ fontSize: "1rem", color: "#e0e0e0", lineHeight: "1.6" }}
            >
              Check out my latest resume to learn more about my skills and
              experience.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              <a
                href="/assets/Resume.pdf"
                download="Pratik_Resume.pdf"
                style={{
                  background: "linear-gradient(145deg, #007bff, #0056b3)",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "50px",
                  textDecoration: "none",
                  fontSize: "1rem",
                  fontWeight: "500",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(0, 123, 255, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background =
                    "linear-gradient(145deg, #0056b3, #007bff)";
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow =
                    "0 6px 20px rgba(0, 123, 255, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background =
                    "linear-gradient(145deg, #007bff, #0056b3)";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 15px rgba(0, 123, 255, 0.4)";
                }}
              >
                Download Resume
              </a>
              <button
                onClick={handleClosePopup}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "50px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.2)";
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.1)";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Custom404 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutPratik />} />
        <Route path="/pratik-projects" element={<ProjectsPratik />} />
        <Route path="/pratik-skills" element={<PratikSkills />} />
        <Route path="/pratik-blogs" element={<BlogsPratik />} />
        <Route path="/pratik-collaboration" element={<PrCollab />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route element={<AdminRoute />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-users" element={<AdminUsers />} />
          <Route path="/admin-skills" element={<AdminSkills />} />
          <Route path="/admin-collab" element={<AdminCollaborations />} />
          <Route path="/admin-projects" element={<AdminProjects />} />
          <Route path="/admin-blogs" element={<AdminBlogs />} />
          <Route path="/admin-profile" element={<AdminProfile />} />
          <Route path="/admin-issues" element={<AdminIssues />} />
        </Route>
        <Route path="/form" element={<TroubleshootingForm />} />
      </Routes>

      {/* Add fadeIn animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </BrowserRouter>
  );
}

export default App;
