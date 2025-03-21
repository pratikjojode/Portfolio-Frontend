import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { motion } from "framer-motion";
import "../styles/PratikSkills.css"; // Importing the regular CSS

const PratikSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch skills from the API
  const fetchSkills = async () => {
    setLoading(true); // Set loading to true while fetching
    try {
      const response = await axios.get("/api/v1/skills/getSkills");
      console.log(response.data); // Log the response to see its structure
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        setSkills(response.data); // Set skills array directly
      } else {
        console.log("No skills found");
      }
    } catch (error) {
      console.log("Error Fetching the Skills", error);
    } finally {
      setLoading(false); // Set loading to false once the fetching is done
    }
  };

  // Fetch skills on component mount
  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <Layout>
      <motion.div
        className="skills-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          My Skills
        </motion.h1>

        {/* Engaging Text Below the Title */}
        <motion.p className="subtitle">
          🚀 Here are some of the skills I've honed over the years. From
          programming languages to frameworks and tools, I'm always eager to
          learn and grow. Explore my skill set below! 💻
        </motion.p>

        {loading ? (
          <motion.div
            className="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading...
          </motion.div>
        ) : (
          <motion.div
            className="skills-grid"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            {skills.length > 0 ? (
              skills.map((skill) => (
                <motion.div
                  key={skill._id}
                  className="skill-card"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="skill-image">
                    <img
                      alt={skill.name}
                      src={skill.image ? `${skill.image}` : ""}
                    />
                  </div>
                  <motion.div
                    className="skill-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h3>{skill.name}</h3>
                    <p className="skill-description">{skill.description}</p>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <p>No skills available</p>
            )}
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default PratikSkills;
