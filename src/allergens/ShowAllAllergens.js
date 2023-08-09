// import React, { useState, useEffect, useContext } from 'react';
// import { Box, Container, Grid } from '@mui/material';
// import { UserContext } from "../App.js";
// import AllAllergens from './allergens/AllAllergens';

// const ShowAllAllergens = () => {
//   const { user } = useContext(UserContext);
//   const [allergens, setAllAllergens] = useState([]);

//   useEffect(() => {
//     const getAllAllergens = async () => {
//       if (user) {
//         const u = JSON.parse(user);
//         try {
//           const result = await fetch('http://localhost:8080/project/allergens', {
//             method: 'GET',
//             headers: {
//               Authorization: u.token,
//               "Accept": "application/json",
//               "Content-Type": "application/json"
//             }
//           });

//           if (result.ok) {
//             const allergensData = await result.json();
//             setAllAllergens(allergensData);
//           } else {
//             console.error('Failed to fetch allergens');
//           }
//         } catch (error) {
//           console.error('Error fetching allergens:', error);
//         }
//       }
//     };

//     getAllAllergens();
//   }, [user]);

//   return (
//     <Container>
//       <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//         {/* Dodato: Prikaz alergena */}
//         <h2>All Allergens</h2>
//         <ul>
//           {allergens.map(allergen => (
//             <li key={allergen.id}>{allergen.name}</li>
//           ))}
//         </ul>
//       </Box>
//     </Container>
//   );
// };

// export default ShowAllAllergens;
