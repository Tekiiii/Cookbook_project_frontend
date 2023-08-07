import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Container, Grid, InputAdornment, OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router';
import { UserContext } from "../App.js";
import ShowRecipe from './ShowRecipe.js';

const normalizeText = (text) => {
  return text
    .replace("Đ", 'DJ')
    .replace("Ž", 'Z')
    .replace("Ć", 'C')
    .replace("Č", 'C')
    .replace("Š", 'S');
}

const ShowRecipes = () => {
  const [recipes, setAllRecipes] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { user, login, logout } = useContext(UserContext);

  useEffect(() => {
    if (search === '') {
      setAllRecipes(recipes);
      setData(recipes);
    } else {
      const normalizedSearch = normalizeText(search.toUpperCase());
      const filteredData = recipes.filter((recipe) => {
        const normalizedText = normalizeText(recipe.name.toUpperCase());
        return normalizedText.includes(normalizedSearch);
      })
      setData(filteredData);
    }
  }, [search]);

  useEffect(() => {
    const getRecipes = async () => {
   //  const user = localStorage.getItem("user");
   //   if (user) {
   //    const u = JSON.parse(user);
        let result = await fetch("http://localhost:8080/project/recipe", {
          method: 'GET',
          headers: {
    //        Authorization: u.token,
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
        });
        console.log(result);
        if (result.ok) {
          let recipes_r = await result.json();
          setData(recipes_r);
          setAllRecipes(recipes_r);
        }
   //   }
    };
    getRecipes();
  }, []);

  const handleDelete = (recipeId) => {
    const fileteredRecipes = recipes.filter((s) => s.ID != recipeId);
    setData(fileteredRecipes);
    setAllRecipes(fileteredRecipes);
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
  {/*   {user && user.role === "ROLE_CHEF" || user.role === "ROLE_ADMIN" ? */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-45px' }}>
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
        </Box> 
        {/* : <></>}  */}
      <Grid sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(196px, 1fr))',
        gridGap: '36px',
        margin: '40px auto',
      }}>
        {data.map((s) => <ShowRecipe recipe={s} key={s.ID} onDelete={handleDelete} />)}
      </Grid>
    </Container>
  );
};

export default ShowRecipes;