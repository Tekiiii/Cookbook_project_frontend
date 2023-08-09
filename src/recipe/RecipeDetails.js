import { Card, Grid, CardContent, CardHeader, Container, Typography, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";


const RecipeDetails = () => {
    const recipe = useLoaderData();
    const navigate = useNavigate();
    const [ingredients, setIngredients] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const getIngredients = async () => {

          let result = await fetch(`http://localhost:8080/project/ingredients/recipe/${recipe.id}`, {
          method: 'GET',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
        });
        console.log(result);
            if (result.ok) {
              let ingredients = await result.json();
              setData(ingredients);
              setIngredients(ingredients);
            }
        };
        getIngredients();
    }, []);

    return <Container sx={{ width: '65%' }}>
        <Typography
            sx={{
                textAlign: 'left',
                color: '#E01E9B',
                fontSize: '1.5em',
                marginBottom: '15px'
            }}>
            Info about recipe
        </Typography>
        <br />
        <Card variant="outlined" sx={{
            marginBottom: 1,
            border: '1px solid #E01E9B',
            fontFamily: "RobotoL",
            fontWeight: "bold",
            lineHeight: "1.7",
            backgroundColor: "rgba(232, 225, 205, 0.396)",
            backdropFilter: "blur(10px)",
            color: "#E01E9B",
            borderRadius: "0px 0px 9px 9px",
            '&.MuiCard-root': {
                border: '1px solid #E01E9B',
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
                    backgroundColor: "rgba(195, 23, 135, 0.75)",
                    padding: "7% 0%",
                    height: '40px'
                }}
                title={recipe.name}
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
                        Steps: {recipe.steps}
                    </Grid>
                    <Grid item xs={12}>
                        Time: {recipe.time}
                    </Grid>
                    <Grid item xs={12}>
                        Amount: {recipe.amount}
                    </Grid>
                    <Grid item xs={12}>
                        {data.length > 0  ? (
                            <>
                                Ingredients:
                                <ul>
                                    {data.map((ingredients) => (
                                    <li key={ingredients.id}>{ingredients.id}</li>
                                    ))}
                                </ul>
                            </> ) 
                            : 
                            ("No ingredients found")}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        <Box sx={{ marginTop: '10px', alignItems: 'center', textAlign: 'center' }}>
            <Button onClick={() => navigate('/recipe')}
                sx={{ color: '#E01E9B' }}>
                Back
            </Button>
        </Box>
    </Container>
}
export default RecipeDetails;