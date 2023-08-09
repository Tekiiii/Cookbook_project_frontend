
import { Box, Button, Container, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// radi i addNewIngredient samo ne dodaje alergene

const IgredientForm = () =>{
    const [name, setName] = useState("");
    const [unit, setUnit] = useState("");
    const [amount, setAmount] = useState("");
    const [calories, setCalories] = useState("");
    const [carbs, setCarbs] = useState("");
    const [fats, setFats] = useState("");
    const [sugars, setSugars] = useState("");
    const [proteins, setProteins] = useState("");
    const [saturatedFats, setSaturatedFats] = useState("");
    const [globalError, setGlobalError] = useState(false);
    const errorMessageTemplate = "Please enter ";
    const [nameError, setNameError] = useState("");
    const [unitError, setUnitError] = useState("");
    const [amountError, setAmountError] = useState("");
    const [caloriesError, setCaloriesError] = useState("");
    const [carbsError, setCarbsError] = useState("");
    const [fatsError, setFatsError] = useState("");
    const [sugarsError, setSugarsError] = useState("");
    const [proteinsError, setProteinsError] = useState("");
    const [saturatedFatsError, setSaturatedFatsError] = useState("");
    
  
    const navigate = useNavigate();

    const save = async () => {
        if (name === "" || unit === "" || amount === "" || calories === "" || carbs === "" || fats === "" || sugars === "" 
        || proteins === "" || saturatedFats === "") {
          setGlobalError("Please fill all fields in the form");
          return;
        }

        const new_ingredient = {
            name: name,
            unit: unit,
            amount: amount,
            calories: calories,
            carbs: carbs,
            fats: fats,
            sugars: sugars,
            proteins: proteins,
            saturatedFats: saturatedFats,
          };

    const user = localStorage.getItem("user");
    if (user) {
      const u = JSON.parse(user);
      let response = await fetch('http://localhost:8080/project/ingredients', {
        method: "POST",
        headers: {
          "Authorization": u.token,
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(new_ingredient),
      });

      console.log(response);
      if (response.ok) {
        let d = await response.json();
        console.log(JSON.stringify(d));
        alert("Successfully added new ingredient.");
        navigate('/ingredients');
      } else {
        console.log("Error");
      }
    }  
}

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
        placeholder="Name"
        helperText={nameError}
        error={nameError !== ""}
        onBlur={(e) => {
          const value = e.target.value.trim();
          setName(value);
          if (value==="") {
            setNameError("Please insert a name.");
          } 
        }}
       
      />

        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="unit"
          placeholder="unit"
          helperText={unitError}
          error={unitError !== ""}
          onBlur={(e) => {
            const value = e.target.value.trim();
            setUnit(value);
            if (value==="") {
                setUnitError("Please insert a fond");
            }
          }}
          
        />

    <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="amount"
          placeholder="amount"
          helperText={amountError}
          error={amountError !== ""}
          onBlur={(e) => {
            const value = e.target.value.trim();
            setAmount(value);
            if (value==="") {
                setAmountError("Please insert an amount");
            }
          }}
          
        />

    <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="calories"
          placeholder="calories"
          helperText={caloriesError}
          error={caloriesError !== ""}
          onBlur={(e) => {
            const value = e.target.value.trim();
            setCalories(value);
            if (value==="") {
            setCaloriesError("Please insert a calories");
            }
          }}
          
        />

    <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="carbs"
          placeholder="carbs"
          helperText={carbsError}
          error={carbsError !== ""}
          onBlur={(e) => {
            const value = e.target.value.trim();
            setCarbs(value);
            if (value==="") {
                setCarbsError("Please insert a carbs");
            }
          }}
          
        />

    <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="fats"
          placeholder="fats"
          helperText={fatsError}
          error={fatsError !== ""}
          onBlur={(e) => {
            const value = e.target.value.trim();
            setFats(value);
            if (value==="") {
                setFatsError("Please insert a fats");
            }
          }}
          
        />

    <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="sugars"
          placeholder="sugars"
          helperText={sugarsError}
          error={sugarsError !== ""}
          onBlur={(e) => {
            const value = e.target.value.trim();
            setSugars(value);
            if (value==="") {
                setSugarsError("Please insert a sugar");
            }
          }}
          
        />

<TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="proteins"
          placeholder="proteins"
          helperText={proteinsError}
          error={proteinsError !== ""}
          onBlur={(e) => {
            const value = e.target.value.trim();
            setProteins(value);
            if (value==="") {
                setProteinsError("Please insert a protein");
            }
          }}
          
        />

<TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="saturatedFats"
          placeholder="saturatedFats"
          helperText={saturatedFatsError}
          error={saturatedFatsError !== ""}
          onBlur={(e) => {
            const value = e.target.value.trim();
            setSaturatedFats(value);
            if (value==="") {
                setSaturatedFatsError("Please insert a saturatedFats");
            }
          }}
          
        />


        <Button
          onClick={save}
          disabled={nameError || unitError || amountError || caloriesError || carbsError || fatsError || sugarsError || proteinsError || saturatedFatsError}
        >
          Save
        </Button>
        <FormHelperText error={globalError}>{globalError}</FormHelperText>
      </Box>
    </Container>
  );

};

export default IgredientForm;

