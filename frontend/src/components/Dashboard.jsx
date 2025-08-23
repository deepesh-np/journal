/** @format */

// Dashboard.js
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import api from './api';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);
import axios from 'axios';
const Dashboard = () => {
  const [stats, setStats] = useState(null);

    const user = localStorage.getItem('user');
  if (!user) return <Navigate to="/login" replace />;

  useEffect(() => {
    axios
      .get('http://localhost:3002/journals/stats', { withCredentials: true })
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!stats) return <p>Loading...</p>;

  const wordData = {
    labels: stats.labels,
    datasets: [
      {
        label: 'Words per Day',
        data: stats.wordsPerDay,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const moodData = {
    labels: stats.labels,
    datasets: [
      {
        label: 'Mood',
        data: stats.moodPerDay,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className='dashboard'>
      <h2 className='text-center mt-4 '>
        🔥 Streak: {stats.currentStreak} day{stats.currentStreak > 1 ? 's' : ''}
      </h2>

      <div style={{ width: '80%', margin: '20px auto' }}>
        <h3>Words Per Day</h3>
        <Bar data={wordData} />
      </div>

      <div style={{ width: '80%', margin: '20px auto' }}>
        <h3>Mood Over Last 7 Days</h3>
        <Line data={moodData} />
      </div>
    </div>
  );
};

export default Dashboard;
