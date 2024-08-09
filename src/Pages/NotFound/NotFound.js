import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="content-wrapper">
        <FontAwesomeIcon icon={faExclamationTriangle} className="icon" />
        <h1>404 - Not Found</h1>
        <p>This page is lost at sea.</p>
        <p>Maybe one day it'll wash up.</p>
      </div>
    </div>
  );
};

export default NotFound;
