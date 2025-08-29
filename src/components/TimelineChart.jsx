import React, { useEffect, useState } from 'react';
import api from '../services/Api';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const TimelineChart = ({ iso, date }) => {
  const [timelines, setTimelines] = useState([]);

  useEffect(() => {
    if (!iso || !date) return;

    const fetchData = async () => {
      try {
        const res = await api.get('/dashboard/timeline', { params: { iso, date } });
        if (res.data.responseCode === 200) {
          console.log('Timeline:', res.data.data);
          setTimelines(res.data.data.timeline);
        }
      } catch (error) {
        console.error('Error fetching timeline:', error);
      }
    };

    fetchData();
  }, [iso, date]);

  if (!timelines.length) return <p>Belum ada data timeline.</p>;

  // Siapkan data chart
  const labels = timelines.map(item => item.date);

  const data = {
    labels,
    datasets: [
      {
        label: 'Terkonfirmasi',
        data: timelines.map(item => item.positif),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Sembuh',
        data: timelines.map(item => item.sembuh),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Meninggal',
        data: timelines.map(item => item.meninggal),
        borderColor: 'rgba(53, 162, 235, 1)',
        backgroundColor: 'rgba(53, 162, 235, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Grafik Kasus COVID Harian' },
    },
  };

  return <Line data={data} options={options} />;
};

export default TimelineChart;