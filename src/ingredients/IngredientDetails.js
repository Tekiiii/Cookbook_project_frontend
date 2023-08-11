import { useLoaderData, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, Typography, Box, Button, Container } from "@mui/material";

const IngredientDetails = () => {
    
    const navigate = useNavigate();

        const ingredient = useLoaderData();

        return <Container sx={{ width: '65%' }}>
            <Box sx={{display: "flex", justifyContent: "center"}}>
            <Card sx={{marginBottom: 3, width: "300px"}} variant="outlined">
                <CardHeader sx={{display: "flex", textAlign: "center", fontSize: "15px", fontWeight: "bold", color: "black",  backgroundColor: "#009688"}}
                    subheader= {ingredient.name}/>
                <CardContent sx={{backgroundColor: "white"}}>
                    <Typography sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "7px"}}>
                        ID: {ingredient.id} </Typography>
                    <Typography sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "7px"}}>
                    Unit: {ingredient.unit}</Typography>
                    <Typography sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "7px"}}>
                    Amount: {ingredient.amount}</Typography>
                    <Typography sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "7px"}}>
                    Calories: {ingredient.calories}</Typography>
                    <Typography sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "7px"}}>
                    Carbs: {ingredient.carbs}</Typography>
                    <Typography sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "7px"}}>
                    Fats: {ingredient.fats}</Typography>
                    <Typography sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "7px"}}>
                    Sugars: {ingredient.sugars}</Typography>
                    <Typography sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "7px"}}>
                    Proteins: {ingredient.proteins}</Typography>
                    <Typography sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "7px"}}>
                    Saturated fats: {ingredient.saturatedFats}</Typography>
                    <Typography sx={{display: "flex", flexDirection: "column", justifyContent: "space-around", padding: "7px"}}> 
                    {ingredient.allergen ? (
                    <>
                    Allergen: {ingredient.allergen.icon} {ingredient.allergen.name}
                     </>
                    ) : (
                    'No allergen')}
                    </Typography>
                    <Button onClick={() => navigate('/ingredients')}
                    sx={{ color: '#E01E9B', marginLeft: '100px' }}>
                    Back
                </Button>
                </CardContent>
            </Card>
            </Box>
             </Container>
    
    
};

export default IngredientDetails;