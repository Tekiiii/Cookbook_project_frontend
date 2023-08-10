import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Tooltip,
    Typography,
    Grid,
    Button,
    Container
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from '@mui/icons-material/Search';
import { UserContext } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { check_login, get_login } from '../login_logic';
import ChefRecipe from './ChefRecipe.js';

const normalizeText = (text) => {
    return text
      .replace("Đ", 'DJ')
      .replace("Ž", 'Z')
      .replace("Ć", 'C')
      .replace("Č", 'C')
      .replace("Š", 'S');
  }

const ChefRecipes = () => {

    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (searchTerm === '') {
            setRecipes(recipes);
            setData(recipes);
        } else {
          const normalizedSearch = normalizeText(searchTerm.toUpperCase());
          const filteredData = recipes.filter((recipe) => {
            const normalizedText = normalizeText(recipe.name.toUpperCase());
            return normalizedText.includes(normalizedSearch);
          })
          setData(filteredData);
        }
      }, [searchTerm]);

    useEffect(() => {
        const getRecipes = async () => {
            const user = localStorage.getItem("user");
            if (user) {
                const u = JSON.parse(user);
                let result = await fetch(`http://localhost:8080/project/recipe/chefRecipes`, {
                    method: 'GET',
                    headers: {
                        Authorization: u.token,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                });

                console.log(result);
                if (result.ok) {
                    let recipes_r = await result.json();
                    setRecipes(recipes_r);
                    setData(recipes_r);
                }
            }
        };
        getRecipes();
    }, []);

    const handleDelete = (recipeId) =>{
        const updatedRecipes = recipes.filter(r => r.id !== recipeId);
        setRecipes(updatedRecipes);
        setData(updatedRecipes);
    }

    return (
        <Container>
            <Typography sx={{ fontSize: '22px', color: '#E01E9B', }}>
                Chef Recipes
            </Typography>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
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
            <Grid sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(196px, 1fr))',
                gridGap: '36px',
                margin: '40px auto',
            }}>
                {data.map((s) => <ChefRecipe recipe={s} key={s.id} onDelete={handleDelete}/>)}
            </Grid>
        </Container>
    );
};

export default ChefRecipes;