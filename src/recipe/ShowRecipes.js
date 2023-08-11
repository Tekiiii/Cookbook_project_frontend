import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShowRecipe from './ShowRecipe';

const normalizeText = (text) => {
  return text
    .replace("Đ", 'DJ')
    .replace("Ž", 'Z')
    .replace("Ć", 'C')
    .replace("Č", 'C')
    .replace("Š", 'S');
}

const ShowRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await fetch("http://localhost:8080/project/recipe", {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
        });

        if (response.ok) {
          const recipesData = await response.json();
          setRecipes(recipesData);
          setFilteredRecipes(recipesData);
        }
      } catch (error) {
        console.error("Error while fetching recipes:", error);
      }
    };
    getRecipes();
  }, []);

  useEffect(() => {
    if (search === '') {
      setFilteredRecipes(recipes);
    } else {
      const normalizedSearch = normalizeText(search.toUpperCase());
      const filteredData = recipes.filter((recipe) => {
        const normalizedText = normalizeText(recipe.name.toUpperCase());
        return normalizedText.includes(normalizedSearch);
      });
      setFilteredRecipes(filteredData);
    }
  }, [search, recipes]);

  const handleDelete = (recipeId) => {
    console.log("Deleting recipe with ID:", recipeId);
    const updatedRecipes = filteredRecipes.filter((recipe) => recipe.id !== recipeId);
    setFilteredRecipes(updatedRecipes);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <OutlinedInput
          className='custom-textfield'
          type='text'
          placeholder='Search...'
          onChange={(e) => setSearch(e.target.value)}
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
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Box>
      {/* {user && user.role === "ROLE_CHEF" || user.role === "ROLE_ADMIN" ? */}
      {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-45px' }}>
          <Button variant="outlined" onClick={() => navigate("new_recipe")}
            sx={{
              padding: '10px 15px',
              backgroundColor: "rgba(253, 246, 238, 0.396)",
              backdropFilter: "blur(4px)",
              color: "#418258",
              borderRadius: "15px",
              border: '0.5px solid #6bb187',
              "&:hover": {
                border: '0.5px solid #6bb187',
                backgroundColor: "rgba(253, 246, 238, 0.7)",
                backdropFilter: "blur(4px)",
              }
            }}>
            {" "}Add new recipe{" "}
          </Button>
        </Box> */}
      {/* : <></>} */}
      <Grid sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(196px, 1fr))',
        gridGap: '36px',
        margin: '40px auto',
      }}>
        {filteredRecipes.map((recipe) => (
          <ShowRecipe recipe={recipe} key={recipe.id} onDelete={handleDelete} />
        ))}
      </Grid>
    </Container>
  );
};

export default ShowRecipes;