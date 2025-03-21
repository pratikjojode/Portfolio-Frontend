import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import axios from "axios";
import "../styles/BlogsPratik.css";

const BlogsPratik = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/blogs/getBlogs");
      if (response.data && Array.isArray(response.data)) {
        setBlogs(response.data);
      } else {
        console.log("No blogs found");
      }
    } catch (error) {
      console.log("Error Fetching Blogs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <Layout>
      <motion.div
        className="blogs-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="title">My Blogs</h1>

        {loading ? (
          <motion.div
            className="loading-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="spinner"></div>
            <p>Fetching latest blogs...</p>
          </motion.div>
        ) : (
          <div className="blogs-grid">
            {blogs.length === 0 ? (
              <div className="no-blogs">
                <p>No blogs available</p>
                <img src="/assets/no-data.svg" alt="No Blogs" />
              </div>
            ) : (
              blogs.map((blog) => (
                <motion.div
                  key={blog._id}
                  className="blog-card"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="blog-image">
                    <img
                      alt={blog.title}
                      src={blog.image || "/assets/default-blog.jpg"}
                    />
                  </div>
                  <div className="blog-content">
                    <h3>{blog.title}</h3>
                    <p className="blog-description">
                      {blog.content.length > 100
                        ? `${blog.content.substring(0, 100)}...`
                        : blog.content || "No description available"}
                    </p>
                    <div className="blog-meta">
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(blog.createdAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div className="blog-links">
                      <Link to={`/blogs/${blog._id}`} className="read-more">
                        Read More →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}
      </motion.div>
    </Layout>
  );
};

export default BlogsPratik;
