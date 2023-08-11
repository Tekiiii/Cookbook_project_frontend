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
  Container
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MyAllergen from './MyAllergen';

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
  // const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [allergens, setAllergens] = useState([]);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAllergens, setFilteredAllergens] = useState([]);

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


  return (
    <Container>
      <Typography sx={{ marginBottom: '20px', fontSize: '22px', color: '#E01E9B' }}>
        My Allergens
      </Typography>

      {/* <Grid container spacing={3}>
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
      </Grid> */}

      <Grid sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(196px, 1fr))',
        gridGap: '36px',
        margin: '40px auto',
      }}>
        {/* {data.map((allergen) => (
          <MyAllergen allergen={allergen} key={allergen.id}/>
        ))} */}
        {data.map((a) => <MyAllergen allergen={a} key={a.id} />)}
      </Grid>
    </Container>
  );
};

export default MyAllergens;
