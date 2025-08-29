import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';

import api from '../services/Api';

const TimelineCard = ({ iso, date }) => {
  const [timelines, setTimelines] = useState([]);

  useEffect(() => {
    if (!date || !iso) return;

    const fetchData = async () => {
      try {
        const res = await api.get('/dashboard/timeline', {
          params: { iso, date },
        });
        if (res.data.responseCode === 200) {
          console.log('Timeline:', res.data.data);
          setTimelines(res.data.data.timeline);
        }
      } catch (err) {
        console.error('Error fetching timeline:', err);
      }
    };

    fetchData();
  }, [iso, date]);

  if (!timelines || timelines.length === 0) {
    return <p>Belum ada data timeline.</p>;
  }

  return (
    <Box>
      <Timeline position="right">
        {timelines.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent color="text.secondary">
              {item.date}
            </TimelineOppositeContent>

            <TimelineSeparator>
              <TimelineDot color="primary" />
              {index < timelines.length - 1 && <TimelineConnector />}
            </TimelineSeparator>

            <TimelineContent sx={{ py: '12px', px: 2 }}>
              <Typography>
                Terkonfirmasi: {item.positif}<br />
                Sembuh: {item.sembuh}<br />
                Meninggal: {item.meninggal}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
};

export default TimelineCard;