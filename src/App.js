import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Comp/MajorNavbar/MajorNavbar";
import Footer from "./Comp/Footer/Footer";

import Home from "./Pages/Home/Home";
import AboutMe from "./Pages/AboutMe/AboutMe";
import NotFound from "./Pages/NotFound/NotFound";
import Contact from "./Pages/Contact/Contact";
import Resources from "./Pages/Resources/Resrouces";
import Philosophy from "./Pages/Philosophy/Philosophy";
import ResourceDynamic from "./Pages/Resource/ResourceDynamic";
import { LayoutProvider, useLayout } from "./Utils/Context/LayoutContext";

import "./reset.scss";
import "./App.scss";

const AppContent = () => {
  const { showLayout } = useLayout();

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
            {showLayout && <Navbar />}
            <div className="app-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutMe />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/about/philosophy" element={<Philosophy />} />

                <Route path="/resource/:id" element={<ResourceDynamic />} />
                <Route
                  path="/resource/:grade/:subject/:standard/:file"
                  element={<ResourceDynamic />}
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            {showLayout && <Footer />}
          </div>
        </Router>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <LayoutProvider>
      <AppContent />
    </LayoutProvider>
  );
};

export default App;
