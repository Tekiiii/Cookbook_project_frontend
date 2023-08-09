import { produce } from "immer";
import React, { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    FormHelperText,
    TextField,
    Typography,
} from "@mui/material";

const RecipeEdit = () => {
    const recipe = useLoaderData();
    const [updatedRecipe, setUpdatedRecipe] = useState(recipe);


    const [recipeError, setRecipeError] = useState("");
    const navigate = useNavigate();

    const { id } = useParams();
    const [name, setName] = useState(recipe.name);
    const [time, setTime] = useState(recipe.time);
    const [amount, setAmount] = useState(recipe.amount);
    const [steps, setSteps] = useState(recipe.steps);
    const [ingredients, setIngredients] = useState(recipe.ingredients);

    const [nameError, setNameError] = useState("");
    const [timeError, setTimeError] = useState("");
    const [stepsError, setStepsError] = useState("");
    const [amountError, setAmountError] = useState("");
    const [ingredientsError, setIngredientsError] = useState("");
    const [globalError, setGlobalError] = useState(false);
    const errorMessageTemplate = "Please enter ";

    const changeRecipe = (e) => {
        setUpdatedRecipe(
            produce((draft) => {
                draft[e.target.name] = e.target.value;
            })
        );

        setRecipeError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "",
        }));

        if (e.target.name === "name") {
            const value = e.target.value.trim();
            if (value === "") {
                setRecipeError((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]: "Please enter recipe name.",
                }));
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                setRecipeError((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]:
                        "Cannot enter a number, please enter recipe name.",
                }));
            } else if (value.length < 2 || value.length > 20) {
                setRecipeError((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]: "Recipe name must be between 2 and 20 characters long.",
                }));
            } else {
                setRecipeError((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]: "",
                }));
            }
        }

        if (e.target.name === "time") {
            const value = e.target.value;
            if (value === "") {
                setRecipeError((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]: "Please enter a required time for recipe preparation.",
                }));
            } else if (value <= 0 || value > 1000) {
                setRecipeError((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]: "Time cannot be over 1000 minutes.",
                }));
            } else if (isNaN(value)) {
                setRecipeError((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]:
                        "Cannot enter text, please enter number less than 1000.",
                }));
            }
        }
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
            steps: steps
        }

        const user = localStorage.getItem("user");
        if (user) {
            const u = JSON.parse(user);
            let response = await fetch(
                `http://localhost:8080/project/recipe/updateRecipe/${updatedRecipe.ID}`,
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
            <Button sx={{ color: '#E01E9B' }}
                onClick={update} disabled={timeError || nameError || stepsError || amountError}>
                {" "}
                Save{" "}
            </Button>
            <FormHelperText error={globalError}>{globalError}</FormHelperText>
        </Box>
    </Container>
}

export default RecipeEdit;