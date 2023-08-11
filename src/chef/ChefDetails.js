import { Box, Button, CardMedia, Container, Grid, Typography } from "@mui/material";
import { pink } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";




const ChefDetails = () => {
    const chef = useLoaderData(); //preuzmemo podatke koje nam je loader dobavio
     const navigate = useNavigate();
     const [data, setData] = useState([]);
   
    return <Container>
        <Box sx={{ display: "flex", justifyContent: "center", width: '100%' }}>
            <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>{`${chef.name} ${chef.lastname}`}</Typography>
        </Box>

        <Grid container spacing={3} direction='row' alignItems='center' justifyContent='center' sx={{ padding: '5px', maxWidth: '20%' }}>
            {/* alignItems - vertikalno poravnanje; 
          justifyContente - horizontalno poravnanje */}

            {/* <Grid item xs={6}>
                <h4>Recipes:</h4>
            </Grid>
            <Grid item xs={6}>
               <h2> {chef.recipes}</h2>
            </Grid> */}
            <Grid item xs={6} >
            <h4> ID:</h4>
            </Grid>
            <Grid item xs={6}>
            <h2> <i> {chef.id}</i></h2>
            </Grid>
            <Grid item xs={6} >
            <h4> User name:</h4>
            </Grid>
            <Grid item xs={6}>
            <h2> <i> {chef.username}</i></h2>
            </Grid>
            <Grid item xs={6} >
            <h4> e-Mail:</h4>
            </Grid>
            <Grid item xs={6}>
            <h2> <i> {chef.email}</i></h2>
            </Grid>
            {/* <Grid item xs={12}>
                Allergens:
                <ul>
                    {data.map((allergens) => (
                        <li key={allergens.id}>{allergens}</li>
                    ))}
                </ul>
            </Grid> */}
        </Grid>
        <Box sx={{ marginTop: '10px', alignItems: 'center', textAlign: 'center' }}>
            <Button onClick={() => navigate('/chef')}
                sx={{ color: '#E01E9B' }}>
                Back
            </Button>
        </Box>
    </Container>


}


export default ChefDetails;