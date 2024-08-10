import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

import "./Resources.scss";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [resourceType, setResourceType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const resourcesPerPage = 9;

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("query");
    const resourceType = params.get("type");
    if (query) {
      setSearchQuery(query);
    }
    if (resourceType) {
      setResourceType(resourceType);
    }
  }, [location.search]);

  const resources = [
    // Dummy data for resources
    {
      id: 1,
      title: "Resource 1",
      description: "Description 1",
      internalLink: "/internal1",
      type: "student",
    },
    {
      id: 2,
      title: "Resource 2",
      description: "Description 2",
      externalLink: "https://example.com",
      externalLinkTitle: "Visit Example",
      type: "teacher",
    },
    {
      id: 3,
      title: "Resource 3",
      description: "Description 3",
      photo: "path/to/photo.jpg",
      type: "parent",
    },
    {
      id: 4,
      title: "Resource 4",
      description: "Description 4",
      iframe: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      type: "student-work",
    },
    // Add more resources as needed
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleResourceTypeChange = (e) => {
    setResourceType(e.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCardClick = (internalLink) => {
    navigate(internalLink);
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearchQuery = resource.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesResourceType =
      resourceType === "all" || resource.type === resourceType;
    return matchesSearchQuery && matchesResourceType;
  });

  const indexOfLastResource = currentPage * resourcesPerPage;
  const indexOfFirstResource = indexOfLastResource - resourcesPerPage;
  const currentResources = filteredResources.slice(
    indexOfFirstResource,
    indexOfLastResource
  );

  const totalPages = Math.ceil(filteredResources.length / resourcesPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 5;

    if (totalPages <= maxPageNumbersToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={currentPage === i}
          >
            {i}
          </button>
        );
      }
    } else {
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (startPage > 1) {
        pageNumbers.push(<span key="start-ellipsis">...</span>);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            disabled={currentPage === i}
          >
            {i}
          </button>
        );
      }

      if (endPage < totalPages) {
        pageNumbers.push(<span key="end-ellipsis">...</span>);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="resources-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search resources..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="resource-type-selector">
        <select value={resourceType} onChange={handleResourceTypeChange}>
          <option value="all">All</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="parent">Parent</option>
          <option value="student-work">Student Work</option>
          <option value="student-projects">Student Projects</option>
        </select>
      </div>
      <div className="resource-cards">
        {currentResources.map((resource) => (
          <div
            key={resource.id}
            className={`card ${!resource.internalLink && "no-internal"}`}
            onClick={() =>
              resource.internalLink && handleCardClick(resource.internalLink)
            }
          >
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <div className="content">
              {resource.photo && (
                <img src={resource.photo} alt={resource.title} />
              )}
              {resource.iframe && (
                <iframe src={resource.iframe} title={resource.title} />
              )}
            </div>
            {resource.externalLink && (
              <a
                href={resource.externalLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>{resource.externalLinkTitle}</button>
              </a>
            )}
          </div>
        ))}
      </div>
      {resources.length > 9 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Resources;
