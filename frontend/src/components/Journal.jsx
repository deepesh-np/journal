/** @format */
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import axios from 'axios';
import JournalTable from './JournalTbale';
export default function Journal() {
  const [journals, setJournals] = useState([]);

  const user = localStorage.getItem('user');
  if (!user) return <Navigate to='/login' replace />;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3002/journals', {
          withCredentials: true,
        });
        console.log(res.data);
        setJournals(res.data);
      } catch (e) {
        console.error('Error fetching journals:', e);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <JournalTable journals={journals} />
      <Dashboard />
    </div>
  );
}
