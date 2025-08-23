/** @format */

//** @format */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Signup from './components/Signup';
import Journal from './components/Journal';
import Footer from './Footer';
import Navbar from './Navbar';
import Login from './components/Login';
import JournalDetail from './components/JournalDetail';
import JournalEdit from './components/JournalEdit';
import AddJournal from './components/AddJournal';
import Dashboard from './components/Dashboard';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import Contact from './components/ContactUs';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/journal' element={<Journal />} />
        <Route path='/journal/:id' element={<JournalDetail />} />
        <Route path='/journal/edit/:id' element={<JournalEdit />} />
        <Route path='/add-journal' element={<AddJournal />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/privacy' element={<Privacy />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/terms' element={<Terms />} />
        <Route path='/contactus' element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
