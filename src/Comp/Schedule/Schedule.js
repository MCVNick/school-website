import React from "react";

import schedule from "../../Utils/Assets/Schedule/schedule.webp";

import "./Schedule.scss";

const Schedule = () => {
  return (
    <div className="schedule-container">
      <img src={schedule} alt="schedule" />
    </div>
  );
};

export default Schedule;
