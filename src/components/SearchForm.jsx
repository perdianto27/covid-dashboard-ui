import React, { useEffect, useState } from 'react';

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
} from '@mui/material';

import api from '../services/Api';

const SearchForm = ({ onSearch }) => {
  const [regions, setRegions] = useState([]);
  const [iso, setIso] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const res = await api.get('/dashboard/list-region');
        if (res.data.responseCode === 200) {
          setRegions(res.data.data);
          if (res.data.data.length > 0) {
            setIso(res.data.data[0].iso);
          }
        }
      } catch (err) {
        console.error('Gagal fetch regions:', err);
      }
    };

    fetchRegions();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!iso || !date) {
      alert('Mohon pilih ISO dan tanggal');
      return;
    }
    onSearch({ iso, date });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        gap: 2,
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap',
      }}
    >
      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel id="region-label">Region</InputLabel>
        <Select
          labelId="region-label"
          value={iso}
          label="Region"
          onChange={(e) => setIso(e.target.value)}
        >
          {regions.map((region) => (
            <MenuItem key={region.iso} value={region.iso}>
              {region.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Tanggal"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          max: new Date().toISOString().split('T')[0],
        }}
      />

      <Button type="submit" variant="contained" color="primary">
        Cari
      </Button>
    </Box>
  );
};

export default SearchForm;