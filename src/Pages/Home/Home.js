import React from "react";
import Schedule from "../../Comp/Schedule/Schedule";

import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to Mr. McQueen's Class</h1>
        <p>Empowering students through education</p>
      </header>
      <main className="home-main">
        <div className="home-cards">
          <section className="card announcements small">
            <h2>Announcements</h2>
            <div className="scrollable-content">
              <p>Website Updated (9/20/2025)</p>
              <p></p>
            </div>
          </section>
          <section className="card calendar medium">
            <h2>Calendar</h2>
            <iframe
              src="https://calendar.google.com/calendar/embed?showTitle=0&showPrint=0&showTabs=0&showCalendars=0&showTz=0&mode=MONTH&height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FDenver&src=c_332eb2d5945327784ef848699df577d7bf08b4dd6011cdc767926d56624da3a4%40group.calendar.google.com&color=%23B1440E&src=c_classroom1eb827d2%40group.calendar.google.com&color=%231E8FE1&src=c_classroomaa339a9e%40group.calendar.google.com&color=%231E8FE1&src=c_classroomcbca0a25%40group.calendar.google.com&color=%231E8FE1&src=c_classroomaa80fcf7%40group.calendar.google.com&color=%231E8FE1&src=c_classroom4bb1fa4a%40group.calendar.google.com&color=%231E8FE1&src=c_classroom9d22d0cd%40group.calendar.google.com&color=%231E8FE1"
              style={{ border: 0 }}
              width="100%"
              height="600"
              title="Google Calendar"
            />
          </section>
          <section className="card class-schedule medium">
            <h2>Class Schedule</h2>
            <Schedule />
          </section>
          <section className="card assignments small">
            <h2>Assignments</h2>
            <div className="scrollable-content">
              <p>Check out Google Classroom for assignments.</p>
              <p>Log into clever to get into Google Classroom.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
