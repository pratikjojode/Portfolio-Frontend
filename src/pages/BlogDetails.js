import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import axios from "axios";
import "../styles/BlogDetails.css"; // Updated CSS file name

const SingleBlog = () => {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBlogDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/v1/blogs/getBlog/${id}`);
      if (response.data) {
        setBlog(response.data);
      } else {
        console.log("Blog not found");
      }
    } catch (error) {
      console.log("Error Fetching Blog Details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetails();
  }, [id]);

  return (
    <Layout>
      <div className="single-blog-container">
        {loading ? (
          <div className="blog-loading">Loading...</div>
        ) : blog ? (
          <div className="single-blog-content">
            <h1 className="single-blog-title">
              <b>Title:</b>
              {blog.title}
            </h1>
            <p className="single-blog-meta">
              <strong>Date:</strong>{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <div className="single-blog-image">
              <img src={blog.image || "default_image_url"} alt={blog.title} />
            </div>
            <p className="single-blog-description">{blog.description}</p>
            <div className="single-blog-text">
              <strong>Content:</strong> {blog.content}
            </div>
          </div>
        ) : (
          <p className="single-blog-notfound">Blog not found</p>
        )}
      </div>
    </Layout>
  );
};

export default SingleBlog;
