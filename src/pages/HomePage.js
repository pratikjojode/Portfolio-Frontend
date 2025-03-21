import React from "react";
import Layout from "../components/Layout";
import "../styles/Home.css";
import { Button } from "antd";
import logo from "../images/logo.png";

const HomePage = () => {
  return (
    <Layout>
      <div>
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <img src={logo} alt="logo" className="main-logo" />
            <h1 className="hero-title">Welcome to My Portfolio!</h1>
            <p className="tagline">
              <i className="fas fa-code"></i> Full-Stack Web Developer |{" "}
              <i className="fas fa-lightbulb"></i> Problem Solver |{" "}
              <i className="fas fa-rocket"></i> Tech Enthusiast
            </p>
            <div className="running-text-container">
              <div className="running-text">
                <span>
                  🚀 Building Scalable Web Apps | 🌐 Passionate About Modern Web
                  Technologies | 💡 Turning Ideas Into Reality
                </span>
              </div>
            </div>
            <button href="#about" className="cta-button">
              <i className="fas fa-user"></i> Learn More About Me
            </button>
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="about-section">
          <h2 className="about-title">
            <i className="fas fa-user"></i> About Me
          </h2>
          <p className="about-text">
            Hi, I'm Pratik Jojode, a passionate full-stack web developer with
            expertise in building scalable, responsive, and user-friendly web
            applications. I specialize in JavaScript, React, Node.js, and modern
            web technologies.
          </p>
          <div className="about-details">
            <div className="detail">
              <i className="fas fa-laptop-code"></i>
              <h3>Web Development</h3>
              <p>
                I build modern, responsive, and high-performance web
                applications using the latest technologies.
              </p>
            </div>
            <div className="detail">
              <i className="fas fa-mobile-alt"></i>
              <h3>Mobile-Friendly Design</h3>
              <p>
                I ensure that all my projects are optimized for mobile devices,
                providing a seamless user experience.
              </p>
            </div>
            <div className="detail">
              <i className="fas fa-cogs"></i>
              <h3>Problem Solving</h3>
              <p>
                I love tackling complex problems and finding efficient, scalable
                solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills-section">
          <h2 className="skills-title">
            <i className="fas fa-tools"></i> Skills
          </h2>
          <div className="skills-grid">
            {/* Frontend Skills */}
            <div className="skill">
              <i className="fab fa-js"></i>
              <h3>JavaScript</h3>
            </div>
            <div className="skill">
              <i className="fab fa-react"></i>
              <h3>React</h3>
            </div>
            <div className="skill">
              <i className="fab fa-html5"></i>
              <h3>HTML5</h3>
            </div>
            <div className="skill">
              <i className="fab fa-css3-alt"></i>
              <h3>CSS3</h3>
            </div>
            <div className="skill">
              <i className="fab fa-bootstrap"></i>
              <h3>Bootstrap</h3>
            </div>
            <div className="skill">
              <i className="fab fa-tailwind-css"></i>
              <h3>Tailwind CSS</h3>
            </div>

            {/* Backend Skills */}
            <div className="skill">
              <i className="fab fa-node-js"></i>
              <h3>Node.js</h3>
            </div>
            <div className="skill">
              <i className="fas fa-database"></i>
              <h3>MongoDB</h3>
            </div>
            <div className="skill">
              <i className="fas fa-server"></i>
              <h3>Express.js</h3>
            </div>
            <div className="skill">
              <i className="fas fa-code"></i>
              <h3>REST API</h3>
            </div>
            <div className="skill">
              <i className="fas fa-code-branch"></i>
              <h3>GraphQL</h3>
            </div>
            <div className="skill">
              <i className="fab fa-python"></i>
              <h3>Python</h3>
            </div>
            <div className="skill">
              <i className="fab fa-docker"></i>
              <h3>Docker</h3>
            </div>

            {/* DevOps & Others */}
            <div className="skill">
              <i className="fab fa-git-alt"></i>
              <h3>Git</h3>
            </div>
            <div className="skill">
              <i className="fab fa-github"></i>
              <h3>GitHub</h3>
            </div>
            <div className="skill">
              <i className="fab fa-aws"></i>
              <h3>AWS</h3>
            </div>
            <div className="skill">
              <i className="fab fa-linux"></i>
              <h3>Linux</h3>
            </div>
            <div className="skill">
              <i className="fas fa-cloud"></i>
              <h3>Cloud Computing</h3>
            </div>
          </div>
        </section>

        <section id="about" className="about-section">
          <div className="about-container">
            <div className="about-image">
              <img src={logo} alt="Pratik Jojode" />
            </div>
            <div className="about-content">
              <h2>
                Hi, I'm <span>Pratik Jojode</span>
              </h2>
              <h3>MERN Stack Developer | Software Engineer</h3>
              <p>
                I am a passionate **Full Stack Developer** specializing in
                **React, Node.js, Express, and MongoDB**. With expertise in
                building **scalable web applications**, I focus on writing
                **efficient, optimized, and user-friendly** code.
              </p>
              <div className="experience-box">
                <div>
                  <h3>3+</h3>
                  <p>Years of Experience</p>
                </div>
                <div>
                  <h3>50+</h3>
                  <p>Projects Completed</p>
                </div>
                <div>
                  <h3>20+</h3>
                  <p>Clients Worldwide</p>
                </div>
              </div>
              <a href="#contact" className="contact-btn">
                Let's Connect
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
