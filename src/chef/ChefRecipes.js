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
import ShowRecipe from '../recipe/ShowRecipe';

const ChefRecipes = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [recipes, setRecipes] = useState([]);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);

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
                    setData(recipes_r);
                    setRecipes(recipes_r);
                }
            }
        };
        getRecipes();
    }, []);

    useEffect(() => {
        const filtered = recipes.filter((recipe) =>
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRecipes(filtered);
    }, [searchTerm, recipes]);

    //   const handleDelete = async (allergeniD) => {
    //     const user = localStorage.getItem("user");
    //     if (user) {
    //       const u = JSON.parse(user);
    //       const response = await fetch(`http://localhost:8080/project/allergens/${allergeniD}`, {
    //         method: "DELETE",
    //         headers: {
    //           Authorization: u.token,
    //           "Accept": "application/json",
    //           "Content-Type": "application/json",
    //         },
    //       });
    //       if (response.ok) {
    //         const updatedAllergens = allergens.filter(allergen => allergen.id !== allergeniD);
    //         setAllergens(updatedAllergens);
    //       } else {
    //         console.log("Error while deleting allergen");
    //       }
    //     }
    //   };

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
                {data.map((s) => <ShowRecipe recipe={s} key={s.id} />)}
            </Grid>
        </Container>
    );
};

export default ChefRecipes;