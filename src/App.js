import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Comp/MajorNavbar/MajorNavbar";

import "./reset.scss";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <p className="not-supported">
        This device is not supported. A screen width of at least 300 pixels is
        required. If you somehow have a device that is this small, contact me
        and I will attempt to make my site support the thing.
      </p>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" component={() => <div />} />
          <Route exact path="/about" component={() => <div />} />
          <Route exact path="/contact" component={() => <div />} />
          <Route exact path="/resources" component={() => <div />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
