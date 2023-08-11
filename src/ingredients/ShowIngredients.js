import { Box, Button, Container, FormControl, Stack, TextField, } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ShowIngredient from "./ShowIngredient";

const ShowIngredients = () => {
    const [ingredients, setIngredients] = useState([]);
    const [all, setAll] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const navigation = useNavigate();
  
    useEffect(() => {
      const getIngredients = async () => {
        let result = await fetch('http://localhost:8080/project/ingredients', {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
        });
        console.log(result);
        if (result.ok) {
          let i = await result.json();
          setIngredients(i);
          setAll(i);
        } 
      };
    getIngredients();
    }, []);
  
    useEffect(() => {
      if (search !== "") {
        let ing = all.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));
        setIngredients(ing);
      } else {
        setIngredients(all);
      }
    }, [search, all]);
  
    
    // brise ali ne osvezi stranicu
    const handleDelete = (ingredientsiD) => {
      console.log("Deleting ingredient with ID:", ingredientsiD);
      
      const updatedIngredients = ingredients.filter((i) => i.id !== ingredientsiD);
      console.log("Updated ingredients:", updatedIngredients);
      
      setIngredients(updatedIngredients);
    };
  
  
    return (
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 3,
          }}
        >
          <FormControl sx={{ width: "30%" }}>
            <TextField
              placeholder="Search..."
              label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </FormControl>
          <Button variant="outlined" onClick={() => navigation("newIngredient")}>
            {" "}
            Add new ingredient{" "}
          </Button>
          
        </Box>
  
        <Stack direction="column">
           {ingredients.map((i) =>
            <ShowIngredient ingredient={i} onDelete={handleDelete} key={i.id} />
          )} 
        </Stack>
      </Container>
    );
}

export default ShowIngredients;