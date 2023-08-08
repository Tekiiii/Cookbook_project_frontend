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
import { UserContext } from '../App';
import { useContext } from 'react';

const ShowRecipe = ({ recipe, onDelete }) => {
    const { user, login, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const deleteRecipe = async () => {
        const user = localStorage.getItem("user");
        // if (user) {
            // const u = JSON.parse(user);
            let response = await fetch(`http://localhost:8080/project/recipe/${recipe.id}`, {
                method: "DELETE",
                headers: {
                    // Authorization: u.token,
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            });
            if (response.ok) {
                let d = await response.json();
                console.log("Successfully deleted recipe");
                onDelete(recipe.ID);
            } else {
                console.log("Error while deleting recipe");
            }
        // }
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
                    {/* {user && user.role === "ROLE_REGULAR_USER" || user.role === "ROLE_CHEF" || user.role === "ROLE_ADMIN" ? */}
                        <Tooltip title="Info">
                            <IconButton
                                sx={{ margin: '0px 8px 15px 8px', color: '#6bb187', fontSize: '1em' }}
                                aria-label="info"
                                onClick={() => navigate(`recipe_details/${recipe.ID}`)}>
                                Informacije&nbsp;&nbsp;<InfoIcon />
                            </IconButton>
                        </Tooltip> 
                        {/* :<>
                            <Tooltip title="Info">
                                <IconButton
                                    sx={{ margin: '0px 8px 15px 8px', color: '#6bb187' }}
                                    aria-label="info"
                                    onClick={() => navigate(`recipe_details/${recipe.id}`)}>
                                    <InfoIcon />
                                </IconButton>
                            </Tooltip>
                        </> */}
                         {/* } */}
                    {/* {user && user.role === "ROLE_ADMIN" || user.role === "ROLE_CHEF" ? */}
                        <>
                            <Tooltip title="Edit">
                                <IconButton sx={{ margin: '0px 8px 15px 8px', color: '#6bb187' }} aria-label="edit" onClick={() => navigate(`edit_recipe/${recipe.ID}`)}>
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                                <IconButton sx={{ margin: '0px 8px 15px 8px', color: '#6bb187' }} aria-label="delete" onClick={deleteRecipe}>
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip> </> 
                            {/* : <></>} */}
                    {/* {user && user.role === "ROLE_REGULAR_USER" ? */}
                        <>
                            <Tooltip title="Add to my Cookbook">
                                <IconButton sx={{ margin: '0px 8px 15px 8px', color: '#6bb187' }} aria-label="Add to my Cookbook">
                                    <FavoriteBorderIcon />
                                </IconButton>
                            </Tooltip> </> 
                            {/* : <></>} */}
                </ Box>
            </Card>
        </Grid>
    )
}

export default ShowRecipe;