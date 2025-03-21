import React, { useState } from "react";
import Layout from "../components/Layout";
import "../styles/pratikCollaboration.css"; // Normal CSS file
import toast from "react-hot-toast";

const PrCollab = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectIdea: "",
    qualifications: "",
    additionalDetails: "",
    contact: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "/api/v1/collaboration/submitCollaboration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Collaboration request submitted successfully!");
        setFormData({
          name: "",
          email: "",
          projectIdea: "",
          qualifications: "",
          additionalDetails: "",
          contact: "",
        });
      } else {
        toast.error(data.message || "Error submitting request!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="collab-container">
        <h2 className="title t">Collaborate with Me</h2>

        <p className="collab-info">
          🚀 Have an innovative project idea? Looking for a collaboration on
          MERN stack development or software solutions? I’m open to working on
          exciting projects and bringing ideas to life. Fill out the form below
          and let's discuss how we can work together!
        </p>

        <form onSubmit={handleSubmit} className="collab-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="projectIdea"
            placeholder="Describe your project idea..."
            value={formData.projectIdea}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="qualifications"
            placeholder="Your Qualifications"
            value={formData.qualifications}
            onChange={handleChange}
            required
          />
          <textarea
            name="additionalDetails"
            placeholder="Additional Details"
            value={formData.additionalDetails}
            onChange={handleChange}
          />
          <input
            type="text"
            name="contact"
            placeholder="Your Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default PrCollab;
