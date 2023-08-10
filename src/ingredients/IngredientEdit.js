import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Box, Button, Container, FormHelperText, TextField } from "@mui/material";
import { produce } from "immer";

const IngredientEdit = () => {
    const data = useLoaderData();
    console.log(data) ;
    const navigate = useNavigate();
    const [ingredient, setIngredient] = useState(data);

    const [globalError, setGlobalError] = useState(false);
    const [ingredientError, setIngredientError] = useState("")

    const editIngredient = (e) => {
        setIngredient(produce((draft) => {
          draft[e.target.name] = e.target.value;
        }));
    
        setIngredientError((prevErrors) => ({
          ...prevErrors,
          [e.target.name]: "",
      }));
      
      if (e.target.name === "name") {
        if (!e.target.value) {
            setIngredientError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Please enter the name",
          }));
        
        } else {
            setIngredientError("");
        }
      }
    
      if (e.target.name === "unit") {
        if (!e.target.value) {
            setIngredientError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "Please enter the the unit",
          }));
       
        } else {
            setIngredientError("");
        }
      }
    
    
      if (e.target.name === "amount") {
        if (!e.target.value) {
            setIngredientError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]:"Please enter an amount",
          }));
        
        } else {
            setIngredientError("");
        }
      }
    
      if (e.target.name === "calories") {
        if (!e.target.value) {
            setIngredientError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]:"Please enter a calories",
          }));
        
        } else {
            setIngredientError("");
        }
      }
    
    
      if (e.target.name === "carbs") {
        if (!e.target.value) {
            setIngredientError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]:"Please enter a carbs",
          }));
        
        } else {
            setIngredientError("");
        }
      }
    
      if (e.target.name === "fats") {
        if (!e.target.value) {
            setIngredientError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]:"Please enter a fats",
          }));
        
        } else {
            setIngredientError("");
        }
      }

      if (e.target.name === "sugars") {
        if (!e.target.value) {
            setIngredientError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]:"Please enter a sugars",
          }));
        
        } else {
            setIngredientError("");
        }
      }

      if (e.target.name === "proteins") {
        if (!e.target.value) {
            setIngredientError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]:"Please enter a proteins",
          }));
        
        } else {
            setIngredientError("");
        }
      }

      if (e.target.name === "saturatedFats") {
        if (!e.target.value) {
            setIngredientError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]:"Please enter a saturatedFats",
          }));
        
        } else {
            setIngredientError("");
        }
      };



    const update = async () => {
        const user = localStorage.getItem("user");
        if (user) {
          const u = JSON.parse(user);
          let response = await fetch(`http://localhost:8080/project/ingredients/${ingredient.id}`,
            {
              method: "PUT",
              headers: {
                Authorization: u.token,
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify(ingredient)
            }
          );
  
          console.log(response);
          if (response.ok) {
            let d = await response.json();
            console.log(JSON.stringify(d));
            alert("You Successfully updated an ingredient.");
            navigate("/ingredients");
          } else {
            console.log("Error");
          }
        }
      };

      return (
        <Container maxWidth="sm">
          <Box
            component="form"
            sx={{
              display: "flex",
              gap: "10px",
              flexDirection: "column",
              alignItems: "center",
              "& .MuiTextField-root": { m: 1, width: "100%" },
            }}
            noValidate
            autoComplete="off"
          >
          <TextField
            sx={{ width: "100%" }}
            fullWidth
            required
            id="outlined-required"
            label="name"
            value={ingredient.name}
            placeholder="name"
            name="name"
            helperText={ingredientError.name}
            error={Boolean(ingredientError.name)}
            onChange={editIngredient}
           
          />
    
        <    TextField
            sx={{ width: "100%" }}
            fullWidth
            required
            id="outlined-required"
            label="unit"
            value={ingredient.unit}
            placeholder="unit"
            name="unit"
            helperText={ingredientError.unit}
            error={Boolean(ingredientError.unit)}
            onChange={editIngredient}
           
          />
    
    <    TextField
            sx={{ width: "100%" }}
            fullWidth
            required
            id="outlined-required"
            label="amount"
            value={ingredient.amount}
            placeholder="amount"
            name="amount"
            helperText={ingredientError.amount}
            error={Boolean(ingredientError.amount)}
            onChange={editIngredient}
           
          />
    
    <    TextField
            sx={{ width: "100%" }}
            fullWidth
            required
            id="outlined-required"
            label="amount"
            value={ingredient.calories}
            placeholder="calories"
            name="calories"
            helperText={ingredientError.calories}
            error={Boolean(ingredientError.calories)}
            onChange={editIngredient}
           
          />
    
    <    TextField
            sx={{ width: "100%" }}
            fullWidth
            required
            id="outlined-required"
            label="carbs"
            value={ingredient.carbs}
            placeholder="carbs"
            name="carbs"
            helperText={ingredientError.carbs}
            error={Boolean(ingredientError.carbs)}
            onChange={editIngredient}
           
          />
    
    <    TextField
            sx={{ width: "100%" }}
            fullWidth
            required
            id="outlined-required"
            label="fats"
            value={ingredient.fats}
            placeholder="fats"
            name="fats"
            helperText={ingredientError.fats}
            error={Boolean(ingredientError.fats)}
            onChange={editIngredient}
           
          />
    
    <    TextField
            sx={{ width: "100%" }}
            fullWidth
            required
            id="outlined-required"
            label="fats"
            value={ingredient.sugars}
            placeholder="sugars"
            name="sugars"
            helperText={ingredientError.sugars}
            error={Boolean(ingredientError.sugars)}
            onChange={editIngredient}
           
          />
    
    <    TextField
            sx={{ width: "100%" }}
            fullWidth
            required
            id="outlined-required"
            label="proteins"
            value={ingredient.proteins}
            placeholder="proteins"
            name="proteins"
            helperText={ingredientError.proteins}
            error={Boolean(ingredientError.proteins)}
            onChange={editIngredient}
           
          />
    
    <    TextField
            sx={{ width: "100%" }}
            fullWidth
            required
            id="outlined-required"
            label="saturatedFats"
            value={ingredient.saturatedFats}
            placeholder="saturatedFats"
            name="saturatedFats"
            helperText={ingredientError.saturatedFats}
            error={Boolean(ingredientError.saturatedFats)}
            onChange={editIngredient}
           
          />
    
    
            <Button
              onClick={update}
              disabled={Object.values(ingredientError).some((error) => error !== "")}
            >
              Edit
            </Button>
            <FormHelperText error={globalError}>{globalError}</FormHelperText>
          </Box>
        </Container>
      );
    

    }
};

export default IngredientEdit;
