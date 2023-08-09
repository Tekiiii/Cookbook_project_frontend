// import React, { useContext, useState } from 'react';
// import { UserContext } from './App';

// const AddAllergen = () => {
//   const { user, setUser } = useContext(UserContext);
//   const [allergen, setAllergen] = useState('');

//   const handleAddAllergen = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/project/allergens/userAllergens', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'Bearer ' + user.token,
//         },
//         body: JSON.stringify({ name: allergen }),
//       });

//       if (response.ok) {
//         setUser(prevUser => ({
//           ...prevUser,
//           allergens: [...prevUser.allergens, allergen],
//         }));
//       } else {
//         const errorData = await response.json();
//         console.error('Greška prilikom dodavanja alergena:', errorData.message);
//       }
//     } catch (error) {
//       console.error('Greška prilikom komunikacije sa serverom:', error.message);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={allergen}
//         onChange={(e) => setAllergen(e.target.value)}
//         placeholder="Unesite naziv alergena"
//       />
//       <button onClick={handleAddAllergen}>Dodaj alergen</button>
//     </div>
//   );
// };

// export default AddAllergen;
