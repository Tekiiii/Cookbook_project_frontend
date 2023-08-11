import { Box, Button, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const RegUserDetails = () => {
    const regularuser = useLoaderData(); //preuzmemo podatke koje nam je loader dobavio
    const navigate = useNavigate();
    const [allergens, setAllergens] = useState([]);
    const [data, setData] = useState([]);

    // useEffect(() => {
    //     const getAllergens = async () => {
    //         const user = localStorage.getItem("user");
    //         if (user) {
    //             const u = JSON.parse(user);
    //             let result = await fetch(`http://localhost:8080/project/allergens/userAllergens`, {
    //                 method: 'GET',
    //                 headers: {
    //                     Authorization: u.token,
    //                     "Accept": "application/json",
    //                     "Content-Type": "application/json"
    //                 },
    //             });
    //             console.log(result);
    //             if (result.ok) {
    //                 let allergens = await result.json();
    //                 setData(allergens);
    //                 setAllergens(allergens);
    //             }
    //         }
    //     };
    //     getAllergens();
    // }, []);

    return <Container>
        <Box sx={{ display: "flex", justifyContent: "center", width: '100%' }}>
            <Typography sx={{ fontSize: '30px', fontWeight: 'bold' }}>{`${regularuser.name} ${regularuser.lastname}`}</Typography>
        </Box>

        <Grid container spacing={3} direction='row' alignItems='center' justifyContent='center' sx={{ padding: '5px', maxWidth: '20%' }}>
            {/* alignItems - vertikalno poravnanje; 
          justifyContente - horizontalno poravnanje */}

            <Grid item xs={6}>
                <h4>My Cook book:</h4>
            </Grid>
            <Grid item xs={6}>
                <h2> {regularuser.myCookBook.id}</h2>
            </Grid>
            <Grid item xs={6} >
                <h4> User name:</h4>
            </Grid>
            <Grid item xs={6}>
                <h2> <i> {regularuser.username}</i></h2>
            </Grid>
            <Grid item xs={6} >
                <h4> e-Mail:</h4>
            </Grid>
            <Grid item xs={6}>
                <h2> <i> {regularuser.email}</i></h2>
            </Grid>
            {/* <Grid item xs={12}>
                {data.length > 0 ? (
                    <>
                    Allergens: 
                    <ul>
                        {data.map((allergens) => (
                            <li key={allergens.id}>{allergens.name}</li>
                        ))}
                    </ul>
                     </>
                     ) : (
                     'No allergens')}
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