import React from "react";

import "./Schedule.scss";

const Schedule = () => {
  return (
    <div className="schedule-container">
      <table className="schedule-table">
        <thead>
          <tr>
            <th />
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
          </tr>
        </thead>
        <tbody>
          <tr className="white">
            <td>8:40 AM</td>
            <td colSpan="5" className="purple">
              Circles
            </td>
          </tr>
          <tr className="white">
            <td>8:55 AM</td>
            <td colSpan="5" className="orange">
              Whole Group Reading
            </td>
          </tr>
          <tr className="white">
            <td>9:55 AM</td>
            <td colSpan="5" className="orange">
              Tier 1 Small Groups Reading
            </td>
          </tr>
          <tr className="white">
            <td>10:25 AM</td>
            <td colSpan="5" className="white"></td>
          </tr>
          <tr className="white">
            <td>10:40 AM</td>
            <td colSpan="5" className="green">
              Recess
            </td>
          </tr>
          <tr className="white">
            <td>10:50 AM</td>
            <td colSpan="5" className="white"></td>
          </tr>
          <tr className="white">
            <td>11:05 AM</td>
            <td colSpan="5" className="orange">
              Tier 2 Small Groups
            </td>
          </tr>
          <tr className="white">
            <td>12:05 PM</td>
            <td colSpan="5" className="blue">
              Math Small Groups
            </td>
          </tr>
          <tr className="white">
            <td>12:30 PM</td>
            <td colSpan="5" className="green">
              Lunch
            </td>
          </tr>
          <tr className="white">
            <td>12:45 PM</td>
            <td colSpan="5" className="green">
              Recess
            </td>
          </tr>
          <tr className="white">
            <td>1:10 PM</td>
            <td colSpan="4" className="blue">
              Math Whole Group
            </td>
            <td className="white" />
          </tr>
          <tr className="white">
            <td>1:15 PM</td>
            <td colSpan="4" className="blue">
              Math Whole Group
            </td>
            <td colSpan="1" className="red">
              Dismissal Bell
            </td>
          </tr>
          <tr className="white">
            <td>2:05 PM</td>
            <td colSpan="4" className="green">
              Recess
            </td>
            <td className="black" />
          </tr>
          <tr className="white">
            <td>2:15 PM</td>
            <td colSpan="4" className="white"></td>
            <td className="black" />
          </tr>
          <tr className="white">
            <td>2:35 PM</td>
            <td className="pink">Science</td>
            <td className="pink">Library</td>
            <td className="pink">Art</td>
            <td className="pink">PE</td>
            <td className="black" />
          </tr>
          <tr className="white">
            <td>3:05 PM</td>
            <td className="pink">Science</td>
            <td className="white" />
            <td className="pink">Art</td>
            <td className="pink">PE</td>
            <td className="black" />
          </tr>
          <tr className="white">
            <td>3:20 PM</td>
            <td colSpan="4" className="red">
              Dismissal Bell
            </td>
            <td className="black" />
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
