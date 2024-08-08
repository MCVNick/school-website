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
              <p>Check out the latest announcements here.</p>
              {/* Add more announcements here */}
            </div>
          </section>
          <section className="card calendar medium">
            <h2>Calendar</h2>
            <iframe
              src="https://calendar.google.com/calendar/embed?src=ngmcqueen%40graniteschools.org&ctz=America%2FDenver"
              style={{ border: 0 }}
              width="100%"
              height="600"
            />
          </section>
          <section className="card class-schedule medium">
            <h2>Class Schedule</h2>
            <Schedule />
          </section>
          <section className="card assignments small">
            <h2>Assignments</h2>
            <div className="scrollable-content">
              <p>Check out the latest homework and project assignments.</p>
              {/* Add more assignments here */}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
