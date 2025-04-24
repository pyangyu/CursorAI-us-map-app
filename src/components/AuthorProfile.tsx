import React from 'react';
import '../styles/AuthorProfile.css';

interface AuthorProfileProps {
  onClose: () => void;
}

const AuthorProfile: React.FC<AuthorProfileProps> = ({ onClose }) => {
  return (
    <div className="profile-modal">
      <div className="profile-content">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="profile-header">
          <div className="profile-avatar">
            <img src="https://via.placeholder.com/120" alt="Puyu Yang" />
          </div>
          <div className="profile-info">
            <h2>Puyu Yang</h2>
            <p>Embedded Software Engineer at John Deere</p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat">
            <span className="stat-value">2+</span>
            <span>Years Experience</span>
          </div>
          <div className="stat">
            <span className="stat-value">6+</span>
            <span>Companies</span>
          </div>
          <div className="stat">
            <span className="stat-value">2</span>
            <span>Degrees</span>
          </div>
        </div>

        <div className="profile-bio">
          <p>Computer Engineering graduate from UIUC with diverse experience in embedded systems, mobile development, and data analysis. Currently pursuing a Master's in Computer Science while working as an Embedded Software Engineer.</p>
        </div>

        <div className="experience">
          <h3>Experience</h3>
          <div className="experience-item">
            <h4>Embedded Software Engineer</h4>
            <p>John Deere • Jan 2024 - Present</p>
            <p>Quad Cities Metropolitan Area • Full-time</p>
          </div>
          <div className="experience-item">
            <h4>City Scholar Intern</h4>
            <p>John Deere • Aug 2023 - Dec 2023</p>
            <p>Chicago, Illinois • Internship</p>
          </div>
          <div className="experience-item">
            <h4>Laboratory Assistant</h4>
            <p>University of Illinois Urbana-Champaign • Jun 2023 - Jul 2023</p>
            <p>Champaign, Illinois • Electronics and Problem Solving</p>
          </div>
          <div className="experience-item">
            <h4>Mobile Application Developer</h4>
            <p>Fitch Ratings • Jan 2023 - Jul 2023</p>
            <p>Chicago, Illinois • Dart and Flutter</p>
          </div>
          <div className="experience-item">
            <h4>Database Analyst</h4>
            <p>SpeedX • Apr 2023 - Jun 2023</p>
            <p>Elk Grove Village, Illinois • Pandas and Excel</p>
          </div>
        </div>

        <div className="education">
          <h3>Education</h3>
          <div className="experience-item">
            <h4>Master of Science in Computer Science</h4>
            <p>University of Illinois Urbana-Champaign • May 2024 - Dec 2025</p>
          </div>
          <div className="experience-item">
            <h4>Bachelor of Engineering in Computer Engineering</h4>
            <p>University of Illinois Urbana-Champaign • Jun 2021 - Dec 2023</p>
          </div>
        </div>

        <div className="skills-container">
          <h3>Skills</h3>
          <div className="skills">
            <span className="skill-tag">Embedded Systems</span>
            <span className="skill-tag">Flutter</span>
            <span className="skill-tag">Dart</span>
            <span className="skill-tag">Python</span>
            <span className="skill-tag">Pandas</span>
            <span className="skill-tag">Excel</span>
            <span className="skill-tag">Electronics</span>
            <span className="skill-tag">Problem Solving</span>
            <span className="skill-tag">Database Management</span>
          </div>
        </div>

        <div className="profile-links">
          <a href="https://github.com/puyuyang" target="_blank" rel="noopener noreferrer" className="social-link">
            GitHub
          </a>
          <a href="https://linkedin.com/in/puyuyang" target="_blank" rel="noopener noreferrer" className="social-link">
            LinkedIn
          </a>
          <a href="mailto:pyang33@illinois.edu" className="social-link">
            Email
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthorProfile; 