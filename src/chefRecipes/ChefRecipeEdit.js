import { produce } from "immer";
import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
    Autocomplete,
    Box,
    Button,
    Chip,
    Container,
    FormHelperText,
    TextField,
    Typography,
} from "@mui/material";

const ChefRecipeEdit = () => {
    const recipe = useLoaderData();
    const [updatedRecipe, setUpdatedRecipe] = useState(recipe);

    const navigate = useNavigate();

    const { id } = useParams();
    const [name, setName] = useState(recipe.name);
    const [time, setTime] = useState(recipe.time);
    const [amount, setAmount] = useState(recipe.amount);
    const [steps, setSteps] = useState(recipe.steps);
    const [ingredients, setIngredients] = useState(recipe.ingredientIdAmounts || []);
    const [ingredientIdAmounts, setIngredientIdAmounts] = useState({}); // Dodajte ovu definiciju
    const [allIngredients, setAllIngredients] = useState([]);   

    const [nameError, setNameError] = useState("");
    const [timeError, setTimeError] = useState("");
    const [stepsError, setStepsError] = useState("");
    const [amountError, setAmountError] = useState("");
    const [ingredientsError, setIngredientError] = useState("");
    const [globalError, setGlobalError] = useState(false);
    const errorMessageTemplate = "Please enter ";

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
                setAllIngredients(i);
                console.log(i);
            } 
        };
        getIngredients();
    }, []);

    const handleTagDelete = (tagIndex) => {
        const newIngredients = ingredients.filter((_, index) => index !== tagIndex);
        setIngredients(newIngredients);

        const newIngredientIdAmounts = { ...ingredientIdAmounts };
        delete newIngredientIdAmounts[ingredients[tagIndex].id];
        setIngredientIdAmounts(newIngredientIdAmounts);
    
        setIngredientError(newIngredients.length === 0 ? "Please select at least one ingredient." : "");
    };

    const update = async () => {
        if (name === "" || time === "" || steps === ""
            || amount === "") {
            setGlobalError("Please fill all the fields in the form.")
            return;
        }

        const update_recipe = {
            id: parseInt(id),
            name: name,
            time: time,
            amount: amount,
            steps: steps,
            ingredients: ingredientIdAmounts
            
        }

        const user = localStorage.getItem("user");
        if (user) {
            const u = JSON.parse(user);
            let response = await fetch(
                `http://localhost:8080/project/recipe/updateRecipe/${updatedRecipe.id}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: u.token,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(update_recipe),
                }
            );
            console.log(response);
            if (response.ok) {
                let d = await response.json();
                console.log(JSON.stringify(d));
                alert("Successfully updated recipe");
                navigate("/recipe");
            } else {
                console.log("Failed updating recipe");
            }
        }
    };

    return <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ marginBottom: "20px", fontSize: "22px", color: "#E01E9B" }}>
            Update recipe <br />
            <span style={{ fontSize: "16px" }}>Please fill all fields below.</span>
        </Typography>
        <Box
            component="form"
            sx={{
                display: "flex",
                gap: "10px",
                width: "80%",
                alignItems: "center",
                flexDirection: "column",
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
                label="Recipe name"
                value={name}
                placeholder="Recipe name"
                helperText={nameError}
                onChange={(e) => {
                    setName(e.target.value);
                    if (e.target.value !== "") setNameError("");
                    else setNameError(errorMessageTemplate + "recipe name.");
                }}
            />
            <TextField
                sx={{ width: "100px" }}
                fullWidth
                required
                id="outlined-required"
                label="Time to prepare"
                placeholder="Time to prepare in minutes"
                value={time}
                helperText={timeError}
                onChange={(e) => {
                    setTime(e.target.value);
                    if (e.target.value !== "") setTimeError("");
                    else setTimeError(errorMessageTemplate + "time.");
                }}
            />
            <TextField
                sx={{ width: "100px" }}
                fullWidth
                required
                id="outlined-required"
                label="Steps"
                placeholder="Steps"
                value={steps}
                helperText={stepsError}
                onChange={(e) => {
                    setSteps(e.target.value);
                    if (e.target.value !== "") setStepsError("");
                    else setStepsError(errorMessageTemplate + "steps.");

                }}
            />
            <TextField
                sx={{ width: "100px" }}
                fullWidth
                required
                id="outlined-required"
                label="Amount"
                placeholder="Amount"
                value={amount}
                helperText={amountError}
                onChange={(e) => {
                    setAmount(e.target.value);
                    if (e.target.value !== "") setAmountError("");
                    else setAmountError(errorMessageTemplate + "amount.");

                }}
            />
            <Autocomplete
                multiple
                id="ingredients"
                options={allIngredients}
                getOptionLabel={(option) => option.name}
                filterSelectedOptions
                value={ingredients}
                onChange={(event, newValue) => {
                    setIngredients(newValue);
                    setIngredientError(newValue.length === 0 ? "Please select at least one ingredient." : "");
                }}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            label={option.name}
                            {...getTagProps({ index })}
                            onDelete={() => handleTagDelete(index)} // Define this function
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        fullWidth
                        label="Ingredients"
                        placeholder="Select ingredients"
                        error={Boolean(ingredientsError)}
                        helperText={ingredientsError}
                    />
                )}
            />

            <Button
                sx={{ color: '#E01E9B' }}
                onClick={update}
                disabled={timeError || nameError || stepsError || amountError || ingredientsError}
            >
                Update
            </Button>

            <FormHelperText error={globalError}>{globalError}</FormHelperText>
        </Box>
    </Container>
}

export default ChefRecipeEdit;