/** @format */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({ email: '', password: '' });

  const { email, password } = inputValue;

  //   useEffect(() => {
  //     const storedUser = localStorage.getItem('user');
  //     if (storedUser) {

  //     }
  //   }, [navigate]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleError = (err) => toast.error(err, { position: 'bottom-left' });
  const handleSuccess = (msg) =>
    toast.success(msg, { position: 'bottom-left' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:3002/auth/login',
        inputValue,
        { withCredentials: true }
      );

      const { success, message, user } = data; // assuming backend returns user object
      if (success) {
        handleSuccess(message);
        localStorage.setItem('user', 'exists'); // save user
        setTimeout(() => navigate('/'), 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
      handleError('Server error. Try again!');
    }

    setInputValue({ email: '', password: '' });
  };

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <div
        className='card shadow p-4'
        style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className='text-center mb-4'>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              className='form-control'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={handleOnChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              className='form-control'
              name='password'
              value={password}
              placeholder='Enter your password'
              onChange={handleOnChange}
            />
          </div>
          <button type='submit' className='btn btn-primary w-100 mb-3'>
            Login
          </button>
          <div className='text-center'>
            <span>
              Don’t have an account?{' '}
              <Link to='/signup' className='text-decoration-none'>
                Signup
              </Link>
            </span>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
