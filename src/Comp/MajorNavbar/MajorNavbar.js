import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "./MajorNavbar.scss";

const MajorNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth <= 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      setShowSidebar(false);
    }
  }, [isSmallScreen]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  const handleSearch = () => {
    console.log("Search query:", searchQuery);
  };

  return (
    <nav className="major-navbar">
      <div className="brand">
        <h1 onClick={() => handleNavigation("/")}>Mr. McQueen's Class</h1>
      </div>
      <ul className={"menu"}>
        <li onClick={() => handleNavigation("/")}>Home</li>
        <li onClick={() => handleNavigation("/about")}>About</li>
        <li onClick={() => handleNavigation("/contact")}>Contact</li>
        <li onClick={() => handleNavigation("/resources")}>Resources</li>
      </ul>
      {!isSmallScreen && <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>}
      {isSmallScreen && (
        <FontAwesomeIcon
          icon={faBars}
          className="menu-icon"
          onClick={toggleSidebar}
        />
      )}
      {isSmallScreen && <div className={`blur ${showSidebar ? "show" : ""}`} />}
      {isSmallScreen && (
        <div
          onClick={toggleSidebar}
          className={`sidebar ${showSidebar ? "show" : ""}`}
        >
          <ul>
            <li onClick={() => handleNavigation("/login")}>Log In</li>
            <li onClick={() => handleNavigation("/signup")}>Sign Up</li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default MajorNavbar;
