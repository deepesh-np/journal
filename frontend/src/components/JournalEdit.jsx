/** @format */

// JournalEdit.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function JournalEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [journal, setJournal] = useState({
    title: '',
    entry: '',
    mood: '',
    tags: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/journals/${id}`, {
          withCredentials: true,
        });
        setJournal({
          title: res.data.title,
          entry: res.data.entry,
          mood: res.data.mood,
          tags: res.data.tags.join(', '),
        });
      } catch (err) {
        setError('Failed to load journal.');
      } finally {
        setLoading(false);
      }
    };
    fetchJournal();
  }, [id]);

  const handleChange = (e) => {
    setJournal({ ...journal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3002/journals/${id}`,
        {
          ...journal,
          tags: journal.tags.split(',').map((t) => t.trim()),
        },
        { withCredentials: true }
      );
      navigate(`/journal/${id}`);
    } catch (err) {
      console.log(err);

      setError('Update failed. Try again.');
    }
  };

  if (loading) return <div className='text-center mt-5'>Loading...</div>;
  if (error) return <div className='alert alert-danger mt-3'>{error}</div>;

  return (
    <div className='container mt-5'>
      <div className='card shadow-lg p-4 rounded-4'>
        <h2 className='mb-4 text-primary fw-bold'>Edit Journal</h2>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className='mb-3'>
            <label className='form-label fw-semibold'>Title</label>
            <input
              type='text'
              name='title'
              className='form-control rounded-3'
              value={journal.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Entry */}
          <div className='mb-3'>
            <label className='form-label fw-semibold'>Entry</label>
            <textarea
              name='entry'
              rows='6'
              className='form-control rounded-3'
              value={journal.entry}
              onChange={handleChange}
              required></textarea>
          </div>

          {/* Mood */}
          <div className='mb-3'>
            <label className='form-label fw-semibold'>Mood</label>
            <select
              name='mood'
              className='form-select rounded-3'
              value={journal.mood}
              onChange={handleChange}
              required>
              <option value=''>Select Mood</option>
              <option value='happy'>Happy</option>
              <option value='sad'>Sad</option>
              <option value='neutral'>Neutral</option>
              <option value='excited'>Excited</option>
            </select>
          </div>

          {/* Tags */}
          <div className='mb-4'>
            <label className='form-label fw-semibold'>
              Tags (comma-separated)
            </label>
            <input
              type='text'
              name='tags'
              className='form-control rounded-3'
              value={journal.tags}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className='d-flex justify-content-between'>
            <button type='submit' className='btn btn-success px-4 rounded-3'>
              Save Changes
            </button>
            <button
              type='button'
              className='btn btn-secondary px-4 rounded-3'
              onClick={() => navigate(`/journal/${id}`)}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
