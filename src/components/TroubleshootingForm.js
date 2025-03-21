import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./Layout";
import styles from "../styles/TroubleshootingForm.css";

const TroubleshootingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    codeSnippet: "",
    category: "General",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/v1/issues/submitIssue", formData);
      toast.success("🚀 Your issue has been submitted successfully!");
      setFormData({
        name: "",
        email: "",
        title: "",
        description: "",
        codeSnippet: "",
        category: "General",
      });
    } catch (error) {
      toast.error("⚠️ Oops! Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Layout>
        <div className="troubleshoot-container">
          <h2>🛠 Need Help? Submit Your Issue!</h2>
          <p className="subtitle">
            Having trouble? Don't worry! Fill out the form below, and our team
            (or community) will assist you as soon as possible. 🚀
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="👤 Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="📧 Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="title"
              placeholder="🔍 Issue Title (e.g., API not responding)"
              value={formData.title}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="📝 Describe your issue in detail..."
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
            <textarea
              name="codeSnippet"
              placeholder="💻 Paste your code here (if applicable)"
              value={formData.codeSnippet}
              onChange={handleChange}
            ></textarea>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="General">📌 General</option>
              <option value="MERN">🌐 MERN Stack</option>
              <option value="Deployment">🚀 Deployment</option>
              <option value="API">🔗 API Issues</option>
            </select>
            <button type="submit">🚀 Submit Issue</button>
          </form>
        </div>
      </Layout>
    </>
  );
};

export default TroubleshootingForm;
