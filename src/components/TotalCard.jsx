import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';

import StatCard from "./StatCard";
import api from "../services/Api";

const TotalCard = ({ iso = "IDN", date }) => {
  const [totals, setTotals] = useState(null);
  const [potensi, setPotensi] = useState(null);

  useEffect(() => {
    if (!date) return;

    const fetchData = async () => {
      try {
        const [totalRes, potensiRes] = await Promise.all([
          api.get("/dashboard/total", { params: { iso, date } }),
          api.get("/dashboard/potensi", { params: { iso, date } })
        ]);

        if (totalRes.data.responseCode === 200) {
          console.log('Total:', totalRes.data.data);
          setTotals(totalRes.data.data);
        }

        if (potensiRes.data.responseCode === 200) {
          console.log('Potensi:', potensiRes.data.data);
          setPotensi(potensiRes.data.data);
        }

      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [iso, date]);

  if (!totals || !potensi) {
    return <p>Loading...</p>;
  }

  const stats = [
    { title: "Total Positif", value: totals.total_positif, bgColor: "bg-yellow-50", icon: "🦠" },
    { title: "Total Sembuh", value: totals.total_sembuh, bgColor: "bg-green-50", icon: "✔️" },
    { title: "Total Meninggal", value: totals.total_kematian, bgColor: "bg-red-50", icon: "⚰️" },
    { title: "Potensi Positif", value: `${potensi.potensi_positif}%`, bgColor: "bg-blue-50", icon: "📈" },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      <Box
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
          gap: 2,
        }}
      >
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            bgColor={stat.bgColor}
          />
        ))}
      </Box>
    </div>
  );
};

export default TotalCard;