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
              <p>SEP conferences Monday (9/16) and Tuesday (9/17)</p>
              <p>Short day on Thursday (9/19)</p>
            </div>
          </section>
          <section className="card calendar medium">
            <h2>Calendar</h2>
            <iframe
              src="https://calendar.google.com/calendar/embed?src=ngmcqueen%40graniteschools.org&ctz=America%2FDenver"
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
              <p>iReady is always available on clever.</p>
              <p>Lexia Core 5 is always available on clever.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Home;
