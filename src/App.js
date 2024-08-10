import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Comp/MajorNavbar/MajorNavbar";
import Footer from "./Comp/Footer/Footer";

import Home from "./Pages/Home/Home";
import AboutMe from "./Pages/AboutMe/AboutMe";
import NotFound from "./Pages/NotFound/NotFound";
import Contact from "./Pages/Contact/Contact";
import Resources from "./Pages/Resources/Resrouces";
import Philosophy from "./Pages/Philosophy/Philosophy";

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
          <div className="app-container">
            <Navbar />
            <div className="app-content">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/about" element={<AboutMe />} />
                <Route exact path="/contact" element={<Contact />} />
                <Route exact path="/resources" element={<Resources />} />
                <Route
                  exact
                  path="/about/philosophy"
                  element={<Philosophy />}
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </div>
    </div>
  );
};

export default App;
