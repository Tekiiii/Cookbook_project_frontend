import { useNavigate } from 'react-router-dom';
import '../index.css';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Grid, IconButton,
    Tooltip,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { UserContext } from '../App';
import { useContext, useEffect, useState } from 'react';
import MyCookbook from '../Cookbook/MyCookbook';

const ShowRecipe = ({ recipe, onDelete }) => {
    const { user, login, logout } = useContext(UserContext);
    const [regularUser, setRegularUser] = useState({});
    const [isFavorite, setIsFavorite] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const favoriteStatus = localStorage.getItem(`favorite_${recipe.id}`);
        if (favoriteStatus !== null) {
            setIsFavorite(JSON.parse(favoriteStatus));
        }
    }, []);

    const deleteRecipe = async () => {
        console.log("Deleting recipe...");
        const user = localStorage.getItem("user");
        if (user) {
            const u = JSON.parse(user);
            try {
                const response = await fetch(`http://localhost:8080/project/recipe/${recipe.id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: u.token,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    }
                });

                if (response.ok) {
                    onDelete(recipe.id);
                    console.log("Successfully deleted recipe");
                } else {
                    console.log("Error while deleting recipe");
                }
            } catch (error) {
                console.error("Error while deleting recipe:", error);

            }
        }
    }

    
        const getRegularUser = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            console.log(user.role);
            console.log(user && user.role === "ROLE_REGULAR_USER");
            if (user) {
                console.log(user + "ovo je user");
                let response = await fetch(`http://localhost:8080/project/regularuser/${user.id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: user.token,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    }
                });
                console.log(response);
                if (response.ok) {
                    let userData = await response.json();
                    console.log("Successfully fetched user");
                    console.log(userData);
                    setRegularUser(userData);
                } else {
                    console.log("Error while fetching user");
                }
            }
        }
        
        if (user != null && user.role === "ROLE_REGULAR_USER") {
            getRegularUser();
        }

    const favouriteRecipe = async () => {
        const user = localStorage.getItem("user");
        if (user) {
            const u = JSON.parse(user);
            let response = await fetch(`http://localhost:8080/project/cookbook/cookbook_id/${regularUser.myCookBook.id}/recipe_id/${recipe.id}`, {
                method: "PUT",
                headers: {
                    Authorization: u.token,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                let d = await response.json();
                console.log("Successfully updated recipe");
                setIsFavorite(prevFavorite => !prevFavorite);
                localStorage.setItem(`favorite_${recipe.id}`, JSON.stringify(!isFavorite));
            } else {
                console.log("Error while updating recipe");
            }
        }
    }

    return (
        <Grid item xs={4}>
            <Card variant="outlined" sx={{
                marginBottom: 1,
                border: '1px solid #6bb187',
                fontFamily: "RobotoL",
                fontWeight: "bold",
                lineHeight: "1.7",
                backgroundColor: "rgba(233, 240, 199, 0.396)",
                backdropFilter: "blur(10px)",
                color: "#418258",
                borderRadius: "0px 0px 9px 9px",
                '&.MuiCard-root': {
                    border: '1px solid #6bb187',
                    borderRadius: '10px',
                },
            }}>
                <CardHeader
                    sx={{
                        display: "flex",
                        textAlign: "center",
                        color: "white",
                        borderRadius: "9px 9px 0px 0px",
                        fontSize: "1.3em",
                        backgroundColor: "#6bb187",
                        padding: "7% 0%",
                        height: '30px'
                    }}

                    title={recipe.name}
                />
                <CardMedia
                    sx={{ height: 140 }}
                    image="https://cdn.cancer.ca/-/media/images/stock-images/recipes-main-banner-generic.png?rev=4a884cb602214bb3bc1ce51b84ef8a5f&cx=0.5&cy=0.5&cw=1200&ch=630&hash=B3798D04B58C0F94406103D32F09B1C5"
                />
                <CardContent
                    sx={{
                        padding: "5px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <Grid container spacing={0.5} item xs={12} alignItems='center' justifyContent='space-between'
                        sx={{
                            textAlign: 'left',
                            padding: '15px 20px 10px 20px'
                        }}>
                        <Grid item xs={12}>
                            Time: {recipe.time}
                        </Grid>
                    </Grid>
                </CardContent>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Tooltip title="Info">
                        <IconButton
                            sx={{ margin: '0px 8px 15px 8px', color: '#6bb187', fontSize: '1em' }}
                            aria-label="info"
                            onClick={() => navigate(`recipe_details/${recipe.id}`)}>
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                    {user && (user.role === "ROLE_ADMIN" ) ? 
                    <>
                        <Tooltip title="Edit">
                            <IconButton sx={{ margin: '0px 8px 15px 8px', color: '#6bb187' }} aria-label="edit" onClick={() => navigate(`edit_recipe/${recipe.id}`)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton sx={{ margin: '0px 8px 15px 8px', color: '#6bb187' }} aria-label="delete" onClick={deleteRecipe}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip> </>
                     : <></>}  
                     {user && user.role === "ROLE_REGULAR_USER" ? 
                    <Tooltip title={isFavorite ? "Added to my Cookbook" : "Add to my Cookbook"}>
                    <IconButton
                        sx={{ margin: '0px 8px 15px 8px', color: isFavorite ? '#6bb187' : 'inherit' }}
                        aria-label={isFavorite ? "Added to my Cookbook" : "Add to my Cookbook"}
                        onClick={favouriteRecipe}
                    >
                        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                    </Tooltip>
                     : <></>} 
                </ Box>
            </Card>
        </Grid>
    )
}

export default ShowRecipe;