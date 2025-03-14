import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Homepage from './Homepage';
import About from './About';
import Portfolio from './Portfolio';
import ErrorPage from './ErrorPage';
import Header from './Header';
import Footer from './Footer';

function App() {
  return (
    <Router>
      <div>
        <Header/>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer id="footer"/>
      </div>
    </Router>
  );
}

export default App;
