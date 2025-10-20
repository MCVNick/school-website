import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./MajorNavbar.scss";

const MajorNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isTabletScreen, setIsTabletScreen] = useState(false);
  const [isLaptopScreen, setIsLaptopScreen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const navigate = useNavigate();

  const handleResize = () => {
    const width = window.innerWidth;
    setIsSmallScreen(width <= 870);
    setIsTabletScreen(width > 600 && width <= 1024);
    setIsLaptopScreen(width > 1024 && width <= 1440);
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
    navigate(`/resources?type=all&query=${searchQuery}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    } else if (event.key === "Escape") {
      setShowSearchPopup(false);
    }
  };

  const toggleSearchPopup = () => {
    setShowSearchPopup(!showSearchPopup);
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
      {isLaptopScreen && (
        <FontAwesomeIcon
          icon={faSearch}
          className="search-icon"
          onClick={toggleSearchPopup}
        />
      )}
      {!isSmallScreen && !isTabletScreen && !isLaptopScreen && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
      {isTabletScreen && (
        <FontAwesomeIcon
          icon={faSearch}
          className="search-icon"
          onClick={toggleSearchPopup}
        />
      )}
      {isSmallScreen && (
        <FontAwesomeIcon
          icon={faBars}
          className="menu-icon"
          onClick={toggleSidebar}
        />
      )}
      {isSmallScreen && <div className={`blur ${showSidebar ? "show" : ""}`} />}
      {isSmallScreen && (
        <div className={`sidebar ${showSidebar ? "show" : ""}`}>
          <FontAwesomeIcon
            icon={faTimes}
            className="close-icon"
            onClick={toggleSidebar}
          />
          <ul>
            <li
              onClick={() => {
                handleNavigation("/");
                toggleSidebar();
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                handleNavigation("/about");
                toggleSidebar();
              }}
            >
              About
            </li>
            <li
              onClick={() => {
                handleNavigation("/contact");
                toggleSidebar();
              }}
            >
              Contact
            </li>
            <li
              onClick={() => {
                handleNavigation("/resources");
                toggleSidebar();
              }}
            >
              Resources
            </li>
            <li>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <button onClick={handleSearch}>Search</button>
            </li>
          </ul>
        </div>
      )}
      {showSearchPopup && (
        <div className="search-popup">
          <div className="close-icon-container">
            <FontAwesomeIcon
              icon={faTimes}
              className="close-icon"
              onClick={toggleSearchPopup}
            />
          </div>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      )}
    </nav>
  );
};

export default MajorNavbar;
