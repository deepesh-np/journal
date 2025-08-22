/** @format */

// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import hero from '../assets/hero.jpg';

const Home = () => {
  return (
    <div className='d-flex flex-column min-vh-100 bg-light text-dark'>

    {/* Main */}
      <main className='flex-grow-1 container text-center'>
        <h1 className='fw-bold my-4'>Welcome to Career Journal!</h1>

        <div
          className='position-relative w-100 rounded-0 overflow-hidden d-flex justify-content-center align-items-center text-white'
          style={{
            backgroundImage: `url(${hero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '500px',
          }}>
          <div className='bg-dark bg-opacity-50 p-5 text-center'>
            <h2 className='display-4 fw-bold'>Your Career, Documented</h2>
            <p className='lead mb-4'>
              Track your professional journey with ease. Reflect on your
              achievements, set goals, and stay organized.
            </p>
            <Link to='/journal' className='btn btn-primary btn-lg'>
              Start My Journal
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
