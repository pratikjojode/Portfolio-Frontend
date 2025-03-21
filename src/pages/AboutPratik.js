import React from "react";
import Layout from "../components/Layout";
import styles from "../styles/AboutPratik.module.css";
import { motion } from "framer-motion";
import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css"; // Default styling for tabs
import pratik from "../images/pratik.jpg";

const AboutPratik = () => {
  return (
    <Layout>
      <motion.div
        className={styles.aboutContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Tabs Section */}
        <motion.div
          className={styles.tabsContainer}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Tabs>
            <TabList className={styles.tabList}>
              <Tab className={styles.tab}>About Me</Tab>
              <Tab className={styles.tab}>Experience</Tab>
              <Tab className={styles.tab}>Education</Tab>
              <Tab className={styles.tab}>Hobbies</Tab>
            </TabList>

            {/* About Me Tab */}
            <TabPanel>
              <motion.div
                className={styles.aboutContent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className={styles.title}>About Pratik</h1>
                <img
                  src={pratik}
                  alt="pratikimage"
                  className={styles.myImage}
                />
                <p className={styles.description}>
                  Hi, I'm Pratik! A passionate{" "}
                  <strong>Full Stack Developer</strong> specializing in the{" "}
                  <strong>
                    MERN Stack (MongoDB, Express.js, React, Node.js)
                  </strong>
                  . With a strong foundation in both frontend and backend
                  development, I love building scalable, efficient, and
                  user-friendly web applications. Let's turn your ideas into
                  reality!
                </p>
                <div className={styles.skillsSection}>
                  <h3 className={styles.skillsTitle}>Technical Skills</h3>
                  <ul className={styles.skillsList}>
                    <li>
                      Frontend: React, Redux, HTML5, CSS3, JavaScript (ES6+)
                    </li>
                    <li>Backend: Node.js, Express.js, RESTful APIs, GraphQL</li>
                    <li>Database: MongoDB, MySQL, Firebase</li>
                    <li>DevOps: Docker, AWS, CI/CD Pipelines</li>
                    <li>Tools: Git, VS Code, Postman, Figma</li>
                  </ul>
                </div>
              </motion.div>
            </TabPanel>

            {/* Experience Tab */}
            <TabPanel>
              <motion.div
                className={styles.experienceContent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className={styles.sectionTitle}>Experience</h2>
                <div className={styles.experienceList}>
                  <motion.div
                    className={styles.experienceItem}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3>Full Stack Developer at XYZ Company</h3>
                    <p>Jan 2022 - Present</p>
                    <ul>
                      <li>
                        Developed and maintained web applications using MERN
                        stack.
                      </li>
                      <li>
                        Collaborated with cross-functional teams to deliver
                        projects on time.
                      </li>
                      <li>
                        Implemented RESTful APIs and integrated third-party
                        services.
                      </li>
                      <li>
                        Optimized application performance, reducing load times
                        by 30%.
                      </li>
                      <li>
                        Mentored junior developers and conducted code reviews.
                      </li>
                    </ul>
                  </motion.div>
                  <motion.div
                    className={styles.experienceItem}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3>Frontend Developer at ABC Inc.</h3>
                    <p>Jun 2020 - Dec 2021</p>
                    <ul>
                      <li>
                        Built responsive and interactive user interfaces using
                        React.
                      </li>
                      <li>Optimized web performance and improved SEO.</li>
                      <li>
                        Worked closely with designers to implement UI/UX
                        designs.
                      </li>
                      <li>Integrated APIs and managed state using Redux.</li>
                      <li>Conducted A/B testing to improve user engagement.</li>
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </TabPanel>

            {/* Education Tab */}
            <TabPanel>
              <motion.div
                className={styles.educationContent}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className={styles.sectionTitle}>Education</h2>
                <div className={styles.educationList}>
                  <motion.div
                    className={styles.educationItem}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3>Bachelor of Technology in Computer Science</h3>
                    <p>University of Tech, 2016 - 2020</p>
                    <p>Graduated with Honors</p>
                    <ul>
                      <li>
                        Relevant Coursework: Data Structures, Algorithms, Web
                        Development, Machine Learning
                      </li>
                      <li>
                        Projects: Built a real-time chat application using MERN
                        stack
                      </li>
                      <li>Awards: Dean's List (2018, 2019)</li>
                    </ul>
                  </motion.div>
                  <motion.div
                    className={styles.educationItem}
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3>High School Diploma</h3>
                    <p>ABC School, 2014 - 2016</p>
                    <p>Major in Science</p>
                    <ul>
                      <li>
                        Activities: Science Club President, Coding Competitions
                      </li>
                      <li>
                        Achievements: 1st Place in National Coding Challenge
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </TabPanel>

            {/* Hobbies Tab */}
            <TabPanel>
              <motion.div
                className={styles.hobbiesSection}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className={styles.sectionTitle}>My Hobbies</h2>
                <motion.div
                  className={styles.hobbiesList}
                  whileHover={{ scale: 1.02 }}
                >
                  <p>
                    🎮 Gaming: Avid gamer with a love for strategy and RPG
                    games.
                  </p>
                  <p>
                    📚 Reading Tech Blogs: Stay updated with the latest in tech
                    and development trends.
                  </p>
                  <p>
                    🎨 Designing: Passionate about UI/UX design and creating
                    visually appealing interfaces.
                  </p>
                  <p>
                    🚀 Exploring New Technologies: Always experimenting with new
                    frameworks and tools.
                  </p>
                  <p>
                    🏋️‍♂️ Fitness: Regularly hit the gym to stay active and
                    healthy.
                  </p>
                  <p>
                    ✈️ Traveling: Love exploring new places and experiencing
                    different cultures.
                  </p>
                </motion.div>
              </motion.div>
            </TabPanel>
          </Tabs>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          className={styles.ctaSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className={styles.ctaTitle}>Let's Connect!</h2>
          <p className={styles.ctaText}>
            Whether you have a project idea, a collaboration opportunity, or
            just want to chat about tech, feel free to reach out! 😊
          </p>
          <motion.a
            href="mailto:pratik@example.com"
            className={styles.ctaButton}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Contact Me
          </motion.a>
        </motion.div>
      </motion.div>
    </Layout>
  );
};

export default AboutPratik;
