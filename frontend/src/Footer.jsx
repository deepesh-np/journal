/** @format */

{
  /* Footer */
}
import React from 'react';

import { Link } from 'react-router';

export default function Footer() {
  return (
    <div className="mt-4">
      <footer className='container text-center py-4 mt-auto text-secondary'>
        <div className='d-flex justify-content-center gap-4 mb-3'>
          <Link to='/terms' className='text-decoration-none text-secondary'>
            Terms of Service
          </Link>
          <Link to='/privacy' className='text-decoration-none text-secondary'>
            Privacy Policy
          </Link>
          <Link to='/contact' className='text-decoration-none text-secondary'>
            Contact Us
          </Link>
        </div>
        <p className='mb-0'>© 2024 Career Journal. All rights reserved.</p>
      </footer>
    </div>
  );
}
