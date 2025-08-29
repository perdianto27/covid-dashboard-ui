import React, { useState } from 'react';
import TotalCard from './TotalCard';
import TimelineCard from './TimelineCard';
import TimelineChart from './TimelineChart';
import SearchForm from './SearchForm';

function Dashboard() {
  const [params, setParams] = useState({ iso: 'ALB', date: '2020-03-15' });

  const handleSearch = ({ iso, date }) => {
    setParams({ iso, date });
  };

  return (
    <>
      <SearchForm onSearch={handleSearch} />
      <TotalCard iso={params.iso} date={params.date} />
      <TimelineChart iso={params.iso} date={params.date} />
      <TimelineCard iso={params.iso} date={params.date} />
    </>
  );
}

export default Dashboard;