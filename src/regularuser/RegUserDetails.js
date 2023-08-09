import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";




const RegUserDetails = () => {
    const regularUser = useLoaderData(); //preuzmemo podatke koje nam je loader dobavio
     const navigate = useNavigate();
    // const [allergens, setAllergens] = useState([]);
     const [data, setData] = useState([]);
    // useEffect(() => {
    //     const getAllergens = async () => {
    //         let result = await fetch(`http://localhost:8080/project/allergens/id/${allergens.id}`, {
    //             method: 'GET',
    //             headers: {
    //                 "Accept": "application/json",
    //                 "Content-Type": "application/json"
    //             },
    //         });
    //         console.log(result);
    //         if (result.ok) {
    //             let allergens = await result.json();
    //             setData(allergens);
    //             setAllergens(allergens);
    //         }
    //     };
    //     getAllergens();
    // }, []);
    return <Container>

        <Box sx={{ display: "flex", justifyContent: "center", width: '100%' }}>
            <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>{`${regularUser.name} ${regularUser.lastname}`}</Typography>
        </Box>

        <Grid container spacing={3} direction='row' alignItems='center' justifyContent='center' sx={{ padding: '5px', maxWidth: '20%' }}>
            {/* alignItems - vertikalno poravnanje; 
          justifyContente - horizontalno poravnanje */}

            <Grid item xs={6}>
                My Cookbook:
            </Grid>
            <Grid item xs={6}>
                {regularUser.myCookBook.id}
            </Grid>
            <Grid item xs={6} >
                e-Mail:
            </Grid>
            <Grid item xs={6}>
                {regularUser.email}
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
            <Button onClick={() => navigate('/regularuser')}
                sx={{ color: '#E01E9B' }}>
                Back
            </Button>
        </Box>
    </Container>


}


export default RegUserDetails;