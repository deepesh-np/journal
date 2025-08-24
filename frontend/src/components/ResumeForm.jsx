/** @format */
import React, { useState } from 'react';
import ResumeAnalysis from './ResumeAnalysis';
import axios from 'axios';

export default function ResumeForm() {
  const [fileUrl, setFileUrl] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post(
        'http://localhost:3002/resume/analyze',
        { fileUrl },
        {
          withCredentials: true, // sends cookies
          headers: {
            'Content-Type': 'application/json',
            // If your API needs Bearer token:
            // Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setAnalysis(res.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Failed to analyze resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mt-5'>
      <h2 className='mb-4'>Resume Analyzer</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='fileUrl' className='form-label'>
            Resume URL
          </label>
          <input
            type='url'
            className='form-control'
            id='fileUrl'
            placeholder='Enter resume PDF/DOCX URL'
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='btn btn-primary' disabled={loading}>
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </form>

      {error && <div className='alert alert-danger mt-3'>{error}</div>}
      {analysis && <ResumeAnalysis data={analysis} />}
    </div>
  );
}
