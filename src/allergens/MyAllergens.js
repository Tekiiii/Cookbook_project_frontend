import React, { useState, useEffect } from 'react';
import { OutlinedInput, InputAdornment, Box, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const MyAllergens = () => {
  const [allergens, setAllergens] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAllergens, setFilteredAllergens] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/project/allergens')
      .then((response) => response.json())
      .then((data) => {
        setAllergens(data);
        setFilteredAllergens(data);
      })
      .catch((error) => {
        console.error('Error fetching allergens:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = allergens.filter((allergen) =>
      allergen.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAllergens(filtered);
  }, [searchTerm, allergens]);

  return (
    <div>
      <Typography sx={{ marginBottom: '20px', fontSize: '22px', color: '#E01E9B' }}>
        My Allergens
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <OutlinedInput
          className='custom-textfield'
          type='text'
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            border: 'none',
            borderRadius: '20px',
            '& .MuiOutlinedInput-notchedOutline': {
              border: '0.5px solid #6bb187',
            },
            '&:hover': {
              boxShadow: '0 0 5px #6bb187',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #6bb187',
              },
            },
          }}
          startAdornment={
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Box>
      <ul>
        {filteredAllergens.map((allergen) => (
          <li key={allergen.id}>{allergen.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyAllergens;
