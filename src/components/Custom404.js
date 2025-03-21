import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "../styles/Custom404.css";

const Custom404 = () => {
  return (
    <div className="container">
      <motion.h1
        className="error-code"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>
      <motion.p
        className="error-message"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Oops! The page you are looking for does not exist.
      </motion.p>
      <motion.p
        className="error-subtext"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        It might have been moved or deleted.
      </motion.p>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="button-container"
      >
        <Link to="/" className="home-button">
          Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default Custom404;
