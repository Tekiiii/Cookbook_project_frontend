import { useLoaderData } from "react-router-dom";
import { Card, CardHeader, CardContent, Typography, Box } from "@mui/material";

const IngredientDetails = () => {

        const ingredient = useLoaderData();

        return <Box sx={{display: "flex", justifyContent: "center"}}>
            <Card sx={{marginBottom: 3, width: "300px"}} variant="outlined">
                <CardHeader sx={{display: "flex", textAlign: "center", fontSize: "15px", fontWeight: "bold", color: "black",  backgroundColor: "#ce93d892"}}
                    subheader= {ingredient.name}/>
                <CardContent sx={{backgroundColor: "#e6f5fc"}}>
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
                </CardContent>
            </Card>
            </Box>
    
    
};

export default IngredientDetails;