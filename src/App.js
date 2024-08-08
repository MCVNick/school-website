import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Comp/MajorNavbar/MajorNavbar";
import Footer from "./Comp/Footer/Footer";

import Home from "./Pages/Home/Home";

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
      <div className="big-routes">
        <Router>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<div />} />
            <Route exact path="/contact" element={<div />} />
            <Route exact path="/resources" element={<div />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
};

export default App;
