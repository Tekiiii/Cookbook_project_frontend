import { useState, useEffect } from "react";
import { Box, Button, Container, Grid, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";
import ShowRecipe from "../recipe/ShowRecipe";

const normalizeText = (text) => {
  return text
    .replace("Đ", 'DJ')
    .replace("Ž", 'Z')
    .replace("Ć", 'C')
    .replace("Č", 'C')
    .replace("Š", 'S');
}

const ShowMyCookbook = () => {
  const [myCookbook, setMyCookbook] = useState([]);
  const [recipes, setAllRecipes] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (search === '') {
      setMyCookbook(myCookbook);
      setData(myCookbook);
    } else {
      const normalizedSearch = normalizeText(search.toUpperCase());
      const filteredData = myCookbook.filter((recipe) => {
        const normalizedText = normalizeText(recipe.name.toUpperCase());
        return normalizedText.includes(normalizedSearch);
      })
      setData(filteredData);
    }
  }, [search]);

  useEffect(() => {
    const getMyCookbook = async () => {
      const user = localStorage.getItem("user");
      if (user) {
        const u = JSON.parse(user);
        let result = await fetch(`http://localhost:8080/project/cookbook/${u.myCookBook.id}}`, {
          headers: {
            Authorization: u.token,
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
        });
        console.log(result);
        if (result.ok) {
          let myCookbook_r = await result.json();
          setData(myCookbook_r);
          setMyCookbook(myCookbook_r);
        }
      }
    };
    getMyCookbook();
  }, []);

  // useEffect(() => {
  //   const getRecipes = async () => {
  //     const user = localStorage.getItem("user");
  //     if (user) {
  //       const u = JSON.parse(user);
  //       let result = await fetch(`http://localhost:8080/project/recipe/`, {
  //         method: 'GET',
  //         headers: {
  //           Authorization: u.token,
  //           "Accept": "application/json",
  //           "Content-Type": "application/json"
  //         },
  //       });
  //       console.log(result);
  //       if (result.ok) {
  //         let recipes_r = await result.json();
  //         setData(recipes_r);
  //         setAllRecipes(recipes_r);
  //       }
  //     }
  //   };
  //   getRecipes();
  // }, []);

  // useEffect(() => {
  // const getRecipes = async ({params}) => {
  //   const user = localStorage.getItem("user");
  //       if (user) {
  //        const u = JSON.parse(user);
  //       let result = await fetch(`http://localhost:8080/project/recipe/${params.id}`, {
  //           method: "GET",
  //           headers: {
  //                Authorization: u.token,
  //               "Accept": "application/json",
  //               "Content-Type": "application/json",
  //           }
  //       });
  //       if (result.ok) {
  //         let get_recipes = await result.json();
  //         setData(get_recipes);
  //         setMyCookbook(get_recipes);
  //       }
  //    }
  //   };
  //   getRecipes();
  // }, []);


  return (
    <Container>
      <Typography sx={{ marginBottom: "20px", fontSize: "22px", color: "#E01E9B" }}>
        My Cookbook
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>

        <OutlinedInput
          className='custom-textfield'
          type='text'
          placeholder='Search...'
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            border: 'none',
            borderRadius: '20px',
            '& .MuiOutlinedInput-notchedOutline': {
              border: '0.5px solid #6bb187',
            },
            '&:hover': {
              boxShadow: '0 0 5px #6bb187',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            },
            '&.Mui-focused': {
              '& .MuiOutlinedInput-notchedOutline': {
                border: '1px solid #6bb187',
              },
            },
          }}
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Box>

      <Grid sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(196px, 1fr))',
        gridGap: '36px',
        margin: '40px auto',
      }}>
        {data.map((s) => <ShowRecipe recipe={s} key={s.ID} />)}
      </Grid>
    </Container>
  );

}

export default ShowMyCookbook;