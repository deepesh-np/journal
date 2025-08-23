/** @format */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
export default function Navbar() {
  const DiamondIcon = () => (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='me-2'>
      <path
        d='M12 2L2 8.5L12 22L22 8.5L12 2Z'
        stroke='#050505'
        strokeWidth='2'
        strokeLinejoin='round'
      />
    </svg>
  );
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const handleLogout = async (e) => {
  e.preventDefault();

  try {
    await axios.post(
      "http://localhost:3002/auth/logout",
      {}, // empty body
      { withCredentials: true } // important: sends cookies
    );
  } catch (err) {
    console.log("Logout request failed:", err);
  } finally {
    // clear localStorage anyway
    localStorage.removeItem("user");
    navigate("/login");
  }
};
  return (
    <div>
      {/* Navbar */}

      <nav className='navbar navbar-expand-lg bg-light'>
        <div className='container-fluid'>
          <Link
            to='/'
            className='navbar-brand d-flex align-items-center fw-bold fs-5'>
            <DiamondIcon />
            Career Journal
          </Link>

          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'>
            <span className='navbar-toggler-icon'></span>
          </button>

          <div
            className='collapse navbar-collapse justify-content-end'
            id='navbarNav'>
            <ul className='navbar-nav gap-3'>
              <li className='nav-item'>
                <Link to='/' className='nav-link text-secondary fw-medium'>
                  Home
                </Link>
              </li>
              <li className='nav-item'>
                <Link to='/about' className='nav-link text-secondary fw-medium'>
                  About
                </Link>
              </li>
              {user ? (
                <li className='nav-item'>
                  <a
                    href='/logout'
                    onClick={handleLogout}
                    className='nav-link text-danger fw-medium'>
                    Logout
                  </a>
                </li>
              ) : (
                <li className='nav-item'>
                  <Link
                    to='/login'
                    className='nav-link text-secondary fw-medium'>
                    Login
                  </Link>
                </li>
              )}
              <li className='nav-item'>
                  <Link
                    to='/dashboard'
                    className='nav-link text-secondary fw-medium'>
                    Dashboard
                  </Link>
                </li>
            </ul>
            <Link to='/journal' className='btn btn-primary ms-3'>
              Start My Journal
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
