import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

import Me from "../../Utils/Assets/AboutMe/Me.webp";

import "./Contact.scss";

const Contact = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, []);

  return (
    <main id="contact-page">
      <div className="contact-page-container">
        <div className="header">
          <h1>Contact</h1>
        </div>
        <h2>Nick McQueen</h2>
        <div className="contact-info">
          <div className="col-1">
            <div className="photo-of-me-container">
              <img
                src={Me}
                alt="Myself in a suit."
                draggable={false}
                className="photo-of-me"
              />
            </div>
          </div>
          <div className="col-2">
            <h2>Contact Me</h2>
            <span>
              <FontAwesomeIcon icon={faEnvelope} />
              <p>nickmcqueen@alpinedistrict.org</p>
            </span>
            <span>
              <FontAwesomeIcon icon={faMessage} />
              <p>+1 (385) 501-7370</p>
            </span>
            <div className="social-icons">
              <a href="https://github.com/MCVNick" aria-label="Github">
                <FontAwesomeIcon icon={faGithub} />
              </a>
              <a
                href="https://www.linkedin.com/in/n-mcqueen/"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              {/* list more as an a tag */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
