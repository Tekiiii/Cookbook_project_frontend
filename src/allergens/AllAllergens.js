import React, { useContext, useState, useEffect } from 'react';
import { Box, OutlinedInput, InputAdornment, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { UserContext } from '../App';

const AllAllergens = () => {
  const { user } = useContext(UserContext);
  const [allergens, setAllergens] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAllergens, setFilteredAllergens] = useState([]);

  useEffect(() => {
    const getAllergens = async () => {
        const user = localStorage.getItem("user");
      if (user) {
    const u = JSON.parse(user);
        let result = await fetch('http://localhost:8080/project/allergens/userAllergens', {
          method: 'GET',
          headers: {
            Authorization: user.token,
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
        });

        if (result.ok) {
          let allergens_a = await result.json();
          setData(allergens_a);
          setAllergens(allergens_a);
        }
      }
    };
    getAllergens();
  }, [user]);

  useEffect(() => {
    const filtered = allergens.filter((allergen) =>
      allergen.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAllergens(filtered);
  }, [searchTerm, allergens]);

  return (
    <div>
      <Typography sx={{ marginBottom: '20px', fontSize: '22px', color: '#E01E9B' }}>
        All Allergens
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

export default AllAllergens;
