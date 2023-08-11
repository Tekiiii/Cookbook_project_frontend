// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Card,
//   CardContent,
//   CardHeader,
//   CardMedia,
//   IconButton,
//   Tooltip,
//   Typography,
//   Grid,
//   Container
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { UserContext } from '../App';
// import { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import MyAllergen from './MyAllergen';

// const getImageUrlForAllergen = (allergenId) => {
//   switch (allergenId) {
//     case 1:
//       return 'https://zdravaprica.com/wp-content/uploads/2017/12/Kikiriki-1.jpg';
//     case 2:
//       return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm77OqZ8dqroHNN13eBZty4sx30l3Xf-97LA&usqp=CAU';
//     case 3:
//       return 'https://agroinfonet.com/wp-content/uploads/2016/08/pb-soja-zrna-Jing.jpg';
//     case 4:
//       return 'https://www.ediskont.rs/uploads/useruploads/Photos/lesnici.jpg';
//     case 5:
//       return 'https://vimafoods.com/wp-content/uploads/2020/05/fresas-frescas.jpg';
//     default:
//       return 'https://nadijeti.com/wp-content/uploads/2010/05/hrana4.jpg';
//   }
// };

// const MyAllergens = () => {
//   // const { user } = useContext(UserContext);
//   const navigate = useNavigate();

//   const [allergens, setAllergens] = useState([]);
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredAllergens, setFilteredAllergens] = useState([]);

//   useEffect(() => {
//     const getAllergens = async () => {
//       const user = localStorage.getItem("user");
//       if (user) {
//         const u = JSON.parse(user);
//         let result = await fetch('http://localhost:8080/project/allergens/userAllergens', {
//           method: 'GET',
//           headers: {
//             Authorization: u.token,
//             "Accept": "application/json",
//             "Content-Type": "application/json"
//           },
//         });
//         console.log(result);
//         if (result.ok) {
//           let allergens_a = await result.json();
//           setData(allergens_a);
//           setAllergens(allergens_a);
//         }
//       }
//     };
//     getAllergens();
//   }, []);


//   return (
//     <Container>
//       <Typography sx={{ marginBottom: '20px', fontSize: '22px', color: '#E01E9B' }}>
//         My Allergens
//       </Typography>

//       {/* <Grid container spacing={3}>
//         {filteredAllergens.map((allergen) => (
//           <Grid item xs={4} key={allergen.id}>
//             <Card variant="outlined" sx={{
//               marginBottom: 1,
//               border: '1px solid #6bb187',
//               fontFamily: "RobotoL",
//               fontWeight: "bold",
//               lineHeight: "1.7",
//               backgroundColor: "rgba(233, 240, 199, 0.396)",
//               backdropFilter: "blur(10px)",
//               color: "#418258",
//               borderRadius: "0px 0px 9px 9px",
//               '&.MuiCard-root': {
//                 border: '1px solid #6bb187',
//                 borderRadius: '10px',
//               },
//             }}>
//               <CardHeader
//                 sx={{
//                   display: "flex",
//                   justifyContent: "space-between",
//                   alignItems: "center",
//                   backgroundColor: "#6bb187",
//                   color: "white"
//                 }}
//                 title={allergen.name}
//               />
//               <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 <CardMedia
//                   component="img"
//                   height="140"
//                   image={getImageUrlForAllergen(allergen.id)}
//                   alt={allergen.name}
//                 />
//                 <Typography variant="body1" sx={{ marginTop: '8px' }}>
//                   ID: {allergen.id}
//                 </Typography>
//               </CardContent>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 8px' }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>

//                   <Tooltip title="Delete">
//                     <IconButton
//                       sx={{ marginX: '8px', color: '#6bb187', fontSize: '1em' }}
//                       aria-label="delete"
//                       onClick={() => handleDelete(allergen.id)}>
//                       <DeleteIcon />
//                     </IconButton>
//                   </Tooltip>
//                 </Box>
//               </Box>
//             </Card>
//           </Grid>
//         ))}
//       </Grid> */}

//       <Grid sx={{
//         display: 'grid',
//         gridTemplateColumns: 'repeat(auto-fill, minmax(196px, 1fr))',
//         gridGap: '36px',
//         margin: '40px auto',
//       }}>
//         {/* {data.map((allergen) => (
//           <MyAllergen allergen={allergen} key={allergen.id}/>
//         ))} */}
//         {data.map((a) => <MyAllergen allergen={a} key={a.ID} />)}
//       </Grid>
//     </Container>
//   );
// };

// export default MyAllergens;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
  Grid,
  Autocomplete,
  Button,
  TextField
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const getImageUrlForAllergen = (allergenId) => {
  switch (allergenId) {
    case 1:
      return 'https://zdravaprica.com/wp-content/uploads/2017/12/Kikiriki-1.jpg';
    case 2:
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm77OqZ8dqroHNN13eBZty4sx30l3Xf-97LA&usqp=CAU';
    case 3:
      return 'https://agroinfonet.com/wp-content/uploads/2016/08/pb-soja-zrna-Jing.jpg';
    case 4:
      return 'https://www.ediskont.rs/uploads/useruploads/Photos/lesnici.jpg';
    case 5:
      return 'https://vimafoods.com/wp-content/uploads/2020/05/fresas-frescas.jpg';
    default:
      return 'https://nadijeti.com/wp-content/uploads/2010/05/hrana4.jpg';
  }
};

const MyAllergens = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [allergens, setAllergens] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAllergens, setFilteredAllergens] = useState([]);
  const [regularuser, setRegularuser] = useState([]);
  const [selectedAllergen, setSelectedAllergen] = useState(null);
  const [selectedAllergens, setSelectedAllergens] = useState([]);
  const [allAllergens, setAllAllergens] = useState([]);



  const handleAddAllergen = () => {
    if (selectedAllergen && !selectedAllergens.some(a => a.id === selectedAllergen.id)) {
      setSelectedAllergens([...selectedAllergens, selectedAllergen]);
      setSelectedAllergen(null);
    }
  };

  const handleRemoveAllergen = (allergenId) => {
    const updatedSelectedAllergens = selectedAllergens.filter(a => a.id !== allergenId);
    setSelectedAllergens(updatedSelectedAllergens);
  };

  useEffect(() => {
    const getAllergens = async () => {
        const user = localStorage.getItem("user");
        if (user) {
            const u = JSON.parse(user);
            let result = await fetch('http://localhost:8080/project/allergens', {
                method: 'GET',
                headers: {
                    Authorization: u.token,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
            });
            console.log(result);
            if (result.ok) {
                let allergens_a = await result.json();
                setAllAllergens(allergens_a);
            }
        }
    };
    getAllergens();
}, []);

      useEffect(() => {
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
                    setRegularuser(userData);
                } else {
                    console.log("Error while fetching user");
                }
            }
        }
        getRegularUser();
    }, []);

  useEffect(() => {
    const getAllergens = async () => {
      const user = localStorage.getItem("user");
      if (user) {
        const u = JSON.parse(user);
        let result = await fetch('http://localhost:8080/project/allergens/userAllergens', {
          method: 'GET',
          headers: {
            Authorization: u.token,
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
        });
        console.log(result);
        if (result.ok) {
          let allergens_a = await result.json();
          setData(allergens_a);
          setAllergens(allergens_a);
        }
      }
    };
    getAllergens();
  }, []);

  useEffect(() => {
    const filtered = allergens.filter((allergen) =>
      allergen.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAllergens(filtered);
  }, [searchTerm, allergens]);

  const handleDelete = async (allergeniD) => {
            const user = localStorage.getItem("user");
            if (user) {
                const u = JSON.parse(user);
                const response = await fetch(`http://localhost:8080/project/regularuser/delete/regularuser_id/${regularuser.id}/allergen_id/${allergeniD}`, {
                    method: "PUT",
                    headers: {
                        Authorization: u.token,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                });
                if (response.ok) {
                    const updatedAllergens = allergens.filter(allergen => allergen.id !== allergeniD);
                    setAllergens(updatedAllergens);
                } else {
                    console.log("Error while deleting allergen");
                }
            }
        };

        const addAllergen = async (allergeniD) => {
          const user = localStorage.getItem("user");
          if (user) {
              const u = JSON.parse(user);
              const response = await fetch(`http://localhost:8080/project/regularuser/regularuser_id/${regularuser.id}/allergen_id/${allergeniD}`, {
                  method: "PUT",
                  headers: {
                      Authorization: u.token,
                      "Accept": "application/json",
                      "Content-Type": "application/json",
                  },
              });
              if (response.ok) {
                  const updatedAllergens = allergens.filter(allergen => allergen.id !== allergeniD);
                  setAllergens(updatedAllergens);
              } else {
                  console.log("Error while deleting allergen");
              }
          }
      };

  return (
    <div>
      <Typography sx={{ marginBottom: '20px', fontSize: '22px', color: '#E01E9B' }}>
        My Allergens
      </Typography>

      <Autocomplete
        id="allergen-select"
        options={allAllergens}
        getOptionLabel={(option) => option.name}
        value={selectedAllergen}
        onChange={(event, newValue) => setSelectedAllergen(newValue)}
        renderInput={(params) => <TextField {...params} label="Select Allergen" />}
      />
      <Button variant="contained" color="primary" onClick={addAllergen}>
        Add Allergen
      </Button>
      <div>
        {selectedAllergens.map((allergen) => (
          <div key={allergen.id}>
            {allergen.name}
            <Button variant="contained" color="secondary" onClick={() => handleRemoveAllergen(allergen.id)}>
              Remove
            </Button>
          </div>
        ))}
        </div>

      <Grid container spacing={3}>
        {filteredAllergens.map((allergen) => (
          <Grid item xs={4} key={allergen.id}>
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
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#6bb187",
                  color: "white"
                }}
                title={allergen.name}
              />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={getImageUrlForAllergen(allergen.id)}
                  alt={allergen.name}
                />
                <Typography variant="body1" sx={{ marginTop: '8px' }}>
                  ID: {allergen.id}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 8px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>

                  <Tooltip title="Delete">
                    <IconButton
                      sx={{ marginX: '8px', color: '#6bb187', fontSize: '1em' }}
                      aria-label="delete"
                      onClick={() => handleDelete(allergen.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

    </div>
  );
};

export default MyAllergens;

