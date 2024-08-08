import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

import "./Footer.scss";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <span onClick={() => navigate("/")}>Home</span>
            </li>
            <li>
              <span onClick={() => navigate("/about")}>About</span>
            </li>
            <li>
              <span onClick={() => navigate("/contact")}>Contact</span>
            </li>
            <li>
              <span onClick={() => navigate("/resources")}>Resources</span>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <span>
            <FontAwesomeIcon icon={faEnvelope} />
            <p>ngmcqueen@graniteschools.org</p>
          </span>
          <span>
            <FontAwesomeIcon icon={faPhone} />
            <p>+1 (385) 646-0526</p>
          </span>
          <span>
            <FontAwesomeIcon icon={faMessage} />
            <p>+1 (385) 501-7370</p>
          </span>
        </div>
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://github.com/MCVNick">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a href="https://www.linkedin.com/in/n-mcqueen/">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            {/* list more as an a tag */}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Mr. McQueen's Class. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
