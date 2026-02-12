import React from "react";
import Typical from "react-typical";
import "./Profile.css";
import ScrollService from "../../../utilities/ScrollService";
import awsLogo from "../../../assets/tech-logos/aws-logo.png";

export default function Profile() {
  const techStack = [
    "ReactJS", "TypeScript", "Node.js", "Next.js", "NestJS", 
    "AWS", "Docker", "PostgreSQL", "GraphQL", "Kubernetes"
  ];

  return (
    <div className="profile-container">
      <div className="profile-tech-background">
        <div className="tech-grid"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
      </div>
      <div className="profile-parent">
        <div className="profile-details">
          <div className="profile-badge">
            <span className="badge-text">🚀 Available for Opportunities</span>
          </div>

          <div className="profile-details-name">
            <span className="greeting-text">Hello, I'm</span>
            <span className="highlighted-text">Nghiem Pham</span>
          </div>

          <div className="profile-details-role">
            <div className="role-animation">
              <Typical
                loop={Infinity}
                steps={[
                  "Senior Fullstack Engineer 💻",
                  2500,
                  "Project Lead 🎯",
                  2500,
                  "Cloud Architect ☁️",
                  2500,
                  "Tech Innovator 🚀",
                  2500,
                ]}
              />
            </div>
            <p className="profile-description">
              Building scalable web applications and enterprise systems with modern technologies. 
              Specialized in full-stack development, cloud infrastructure, and technical leadership.
            </p>
          </div>

          <div className="tech-stack-badges">
            {techStack.map((tech, index) => (
              <span key={index} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>

          <div className="profile-options">
            <button
              className="btn modern-primary-btn"
              onClick={() => ScrollService.scrollHandler.scrollToHireMe()}
            >
              <span>Hire Me</span>
              <i className="fa fa-arrow-right"></i>
            </button>
            <a href="Pham_Nguyen_Thanh_Nghiem.pdf" download="Pham_Nguyen_Thanh_Nghiem.pdf">
              <button className="btn modern-highlighted-btn">
                <span>Download CV</span>
                <i className="fa fa-download"></i>
              </button>
            </a>
          </div>

          <div className="colz">
            <div className="colz-icon">
              <a href="https://www.facebook.com/nghiempham47/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fa fa-facebook-square"></i>
              </a>
              <a href="https://github.com/nghiemph95" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <i className="fa fa-github-square"></i>
              </a>
              <a href="https://www.instagram.com/nghiemilo/?hl=en" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com/channel/UC5ZlCHQqHL2qEclS6bfe_ag" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <i className="fa fa-youtube-square"></i>
              </a>
              <a href="https://twitter.com/NghiemPh95" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fa fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="profile-picture">
          <div className="profile-picture-background"></div>
          <div className="profile-picture-glow"></div>
          
          {/* Floating logos around avatar */}
          <div className="floating-tech-logo react-logo">
            <div className="tech-logo-3d">
              <div className="tech-logo-wrapper">
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" 
                  alt="React" 
                  className="tech-logo-img"
                  onError={(e) => {
                    e.target.src = require("../../../assets/tech-logos/react-logo.svg").default;
                  }}
                />
              </div>
              <span className="tech-name">React</span>
            </div>
          </div>
          <div className="floating-tech-logo aws-logo">
            <div className="tech-logo-3d">
              <div className="tech-logo-wrapper">
                <img 
                  src={awsLogo}
                  alt="AWS" 
                  className="tech-logo-img"
                />
              </div>
              <span className="tech-name">AWS</span>
            </div>
          </div>
          <div className="floating-tech-logo nodejs-logo">
            <div className="tech-logo-3d">
              <div className="tech-logo-wrapper">
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" 
                  alt="Node.js" 
                  className="tech-logo-img"
                  onError={(e) => {
                    e.target.src = require("../../../assets/tech-logos/nodejs-logo.svg").default;
                  }}
                />
              </div>
              <span className="tech-name">Node.js</span>
            </div>
          </div>
          <div className="floating-tech-logo nextjs-logo">
            <div className="tech-logo-3d">
              <div className="tech-logo-wrapper">
                <img 
                  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" 
                  alt="Next.js" 
                  className="tech-logo-img"
                  onError={(e) => {
                    e.target.src = require("../../../assets/tech-logos/nextjs-logo.svg").default;
                  }}
                />
              </div>
              <span className="tech-name">Next.js</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
