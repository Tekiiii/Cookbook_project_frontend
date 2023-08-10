import { Autocomplete, Box, Button, Chip, Container, FormControl, FormHelperText, Stack, TextField, Typography } from "@mui/material";
import { produce } from "immer";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const ChefRecipeForm = () => {
    // const [newRecipe, setNewRecipe] = useState({
    //     name: "",
    //     time: "",
    //     amount: "",
    //     steps: "",
    //     picture: "",
    //     ingredients: []
    // });

    const [name, setName] = useState("");
    const [time, setTime] = useState("");
    const [amount, setAmount] = useState("");
    const [steps, setSteps] = useState("");
    const [ingredients, setIngredients] = useState([]);

    // const [selectedIngredients, setSelectedIngredients] = useState([]);
    // const [selectedIngredient, setSelectedIngredient] = useState(null); 

    const [nameError, setNameError] = useState("");
    const [timeError, setTimeError] = useState("");
    const [stepsError, setStepsError] = useState("");
    const [amountError, setAmountError] = useState("");
    const [ingredientError, setIngredientError] = useState("");
    const [globalError, setGlobalError] = useState(false);
    const errorMessageTemplate = "Please enter ";
    const navigate = useNavigate();

    const save = async () => {
        if (name === "" || time === "" || steps === ""
            || amount === "" || ingredients == 0) {
            setGlobalError("Please fill all the fields in the form.")
            return;
        }

        const new_recipe = {
            name: name,
            time: time,
            amount: amount,
            steps: steps,
            ingredients: ingredients
        }

        const user = localStorage.getItem("user");
        if (user && user.role === "ROLE_CHEF") {
            const u = JSON.parse(user);
            let response = await fetch("http://localhost:8080/project/recipe/newRecipe", {
                method: "POST",
                headers: {
                    Authorization: u.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(new_recipe),
            });
            console.log(response);
            if (response.ok) {
                let d = await response.json();
                console.log(JSON.stringify(d));
                alert("You have successfully created new recipe!");
                navigate("/chefRecipes");
            } else {
                console.log("Failed creating new recipe");
            }
        }
    }

    return <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ marginBottom: '20px', fontSize: '22px', color: '#E01E9B' }}>
            Create new recipe <br />
            <span style={{ fontSize: '16px' }}>Please fill all fields below.</span>
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
                id="outlined-isbn-required"
                label="Recipe name"
                placeholder="Recipe name"
                helperText={nameError}
                error={nameError}
                onBlur={(e) => {
                    const value = e.target.value;
                    setName(value);
                    if (!value) {
                        setNameError(errorMessageTemplate + "recipe name.");
                    }
                }}
                onChange={(e) => {
                    const value = e.target.value;
                    setName(value);
                    if (!value) {
                        setNameError(errorMessageTemplate + "recipe name.");
                    } else if (!/^\D+$/.test(value)) {
                        setNameError("Cannot enter a number.");
                    } else if (value.length < 2) {
                        setNameError("Recipe name must have more than 2 characters.");
                    } else if (value.length > 30) {
                        setNameError("Recipe name must have less than 30 characters.");
                    } else {
                        setNameError("");
                    }
                }}
            />
            <TextField
                sx={{ width: "100px" }}
                fullWidth
                required
                id="outlined-isbn-input"
                label="Time to prepare in minutes"
                error={timeError}
                helperText={timeError}
                onBlur={(e) => {
                    const value = e.target.value;
                    setTime(value);
                    if (!value) {
                        setTimeError(errorMessageTemplate + "time.");
                    }
                }}
                onChange={(e) => {
                    const value = e.target.value;
                    setTime(value);
                    if (!value) {
                        setTimeError("Please enter a required time for recipe preparation.");
                    } else if (value <= 0 || value > 1000) {
                        setTimeError("Time cannot be over 1000.");
                    } else if (isNaN(value)) {
                        setTimeError("Cannot enter text, please enter number less than 1000.");
                    } else setTimeError("");
                }}
            />

            <TextField
                sx={{ width: "100%" }}
                fullWidth
                required
                id="outlined-isbn-required"
                label="Steps"
                placeholder="Steps"
                helperText={stepsError}
                error={stepsError}
                onBlur={(e) => {
                    const value = e.target.value;
                    setSteps(value);
                    if (!value) {
                        setStepsError(errorMessageTemplate + "steps.");
                    }
                }}
                onChange={(e) => {
                    const value = e.target.value;
                    setSteps(value);
                    if (!value) {
                        setStepsError(errorMessageTemplate + "name.");
                    } else if (value.length < 2) {
                        setStepsError("Steps must have more than 2 characters.");
                    } else if (value.length > 3000000) {
                        setStepsError("Steps must have less than 3000000 characters.");
                    } else {
                        setStepsError("");
                    }
                }}
            />
            <TextField
                sx={{ width: "100px" }}
                fullWidth
                required
                id="outlined-isbn-input"
                label="Amount"
                error={amountError}
                helperText={amountError}
                onBlur={(e) => {
                    const value = e.target.value;
                    setAmount(value);
                    if (!value) {
                        setTimeError(errorMessageTemplate + "amount.");
                    }
                }}
                onChange={(e) => {
                    const value = e.target.value;
                    setAmount(value);
                    if (!value) {
                        setAmountError(errorMessageTemplate + "amount.");
                    } else if (value <= 0 || value > 40000) {
                        setAmountError("Time cannot be over 1000000.");
                    } else if (isNaN(value)) {
                        setAmountError("Cannot enter text, please enter number less than 1000000.");
                    } else setAmountError("");
                }}
            />

            <Button sx={{ color: '#E01E9B' }}
                onClick={save}
                disabled={timeError || nameError || stepsError || amountError || ingredientError}>
                {" "}Save{" "}
            </Button>
            <FormHelperText error={globalError}>{globalError}</FormHelperText>
        </Box>
    </Container>
};

export default ChefRecipeForm;