import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Layout from "../components/Layout";
import axios from "axios";
import "../styles/ProjectsPratik.css"; // Importing CSS

const ProjectsPratik = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/v1/projects/getProject");
      if (response.data && response.data.projects) {
        setProjects(response.data.projects);
      } else {
        console.log("No Projects Found");
      }
    } catch (error) {
      console.log("Error Fetching the Projects", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Layout>
      <motion.div
        className="projects-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          My Projects
        </motion.h1>

        {/* Engaging Text Below the Title */}
        <motion.p
          className="subtitle"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Here are some of the projects I've worked on. Each project reflects my
          passion for coding, problem-solving, and creating impactful solutions.
          Feel free to explore the code and live demos!
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
            className="projects-grid"
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
            {projects.length > 0 ? (
              projects.map((project) => (
                <motion.div
                  key={project._id}
                  className="project-card"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="project-image">
                    <motion.img
                      alt={project.name}
                      src={project.image ? `${project.image}` : ""}
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="project-content">
                    <h3>{project.name}</h3>
                    <p className="project-description">{project.description}</p>
                    <p className="project-technologies">
                      <strong>Technologies:</strong> {project.technologies}
                    </p>
                    <div className="project-links">
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                      >
                        GitHub
                      </motion.a>
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                      >
                        Live Demo
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p>No projects available</p>
            )}
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default ProjectsPratik;
