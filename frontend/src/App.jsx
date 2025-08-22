/** @format */

//** @format */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Pricing from './components/Pricing';
import Journal from './components/Journal';
import Contact from './components/Contact';
import Footer from './Footer';
import Navbar from './Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/journal' element={<Journal />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
