import React, { useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { message } from "antd";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import styles from "../styles/Contact.module.css";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Sending request with data:", formData);
      const res = await axios.post("/api/v1/contact/sendContact", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response received:", res.data);
      toast.success("Message sent successfully! ✅"); // Debug here
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error.response?.data);
      toast.error(error.response?.data?.error || "Failed to send message ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className={styles.contactContainer}>
        {/* Page Title */}
        <h1 className={styles.title}>Let's Connect! 🚀</h1>

        {/* Social Media Links */}
        <div className={styles.socialLinks}>
          <a
            href="https://www.linkedin.com/in/pratik-jojode-95319726b/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FaLinkedin /> LinkedIn
          </a>

          <a
            href="https://github.com/pratikjojode"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
          >
            <FaGithub /> GitHub
          </a>

          <a href="mailto:pratik@example.com" className={styles.socialLink}>
            <FaEnvelope /> Email
          </a>

          <a href="tel:+919876543210" className={styles.socialLink}>
            <FaPhone /> Phone
          </a>
        </div>

        {/* Contact Form */}
        <div className={styles.contactForm}>
          <h2 className={styles.formTitle}>Send Me a Message 📩</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className={styles.inputField}
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              className={styles.inputField}
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              className={styles.textarea}
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
