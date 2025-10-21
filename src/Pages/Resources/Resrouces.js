import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

import "./Resources.scss";

const GET_RESOURCE_CARDS = gql`
  query GetResourceCards {
    getResourceCards {
      id
      title
      description
      internalLink
      externalLink
      externalLinkTitle
      photo
      iframe
      type
    }
  }
`;

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
    const resourceTypeParam = params.get("type");
    if (query) setSearchQuery(query);
    if (resourceTypeParam) setResourceType(resourceTypeParam);
  }, [location.search]);

  const { loading, error, data } = useQuery(GET_RESOURCE_CARDS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const resources = data.getResourceCards;

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleResourceTypeChange = (e) => setResourceType(e.target.value);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const handleCardClick = (e, internalLink) => {
    e.preventDefault();

    if (!internalLink) return;

    let path = internalLink.trim();

    if (path.startsWith("/")) {
      path = path.substring(1);
    }

    if (path.startsWith("resource/")) {
    }

    const finalPath = `/resource/${path}`;

    navigate(finalPath);
  };

  const handleExternalLinkClick = (e) => {
    e.stopPropagation();
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
            onClick={(e) =>
              resource.internalLink && handleCardClick(e, resource.internalLink)
            }
            style={{ cursor: resource.internalLink ? "pointer" : "default" }}
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
                onClick={handleExternalLinkClick}
              >
                <button onClick={handleExternalLinkClick}>
                  {resource.externalLinkTitle}
                </button>
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
