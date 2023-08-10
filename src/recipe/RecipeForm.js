import { Autocomplete, Box, Button, Chip, Container, FormControl, FormHelperText, Stack, TextField, Typography } from "@mui/material";
import { produce } from "immer";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const RecipeForm = () => {
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
    const loader_data = useLoaderData();
    const [ingredients, setIngredients] = useState(loader_data);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [selectedIngredient, setSelectedIngredient] = useState(null); 

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
            || amount === "" === selectedIngredients.size == 0) {
            setGlobalError("Please fill all the fields in the form.")
            return;
        }

        const new_recipe = {
            name: name,
            time: time,
            amount: amount,
            steps: steps,
            ingredients: selectedIngredients
        }

        const user = localStorage.getItem("user");
        if (user) {
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


            <FormControl sx={{ width: "100%" }} error={ingredientError}>
                <Stack direction="column">
                    {/* kontrola koja prikazuje sastojke koje smo odabrali */}
                    <Typography> Ingredients </Typography>
                    {/* Ingredient 1     Ingredient 2 ... */}
                    <Stack direction='row'>
                        {
                            selectedIngredients.map((a, ii) => <Chip
                                label={a}
                                onDelete={() => {
                                    const a = selectedIngredients.filter((v, i) => i != ii);
                                    setSelectedIngredients(a);
                                }
                                }
                            />)
                        }
                    </Stack>
                    {/* kontrola iz koje biram sastojke */}
                    <Stack direction='row' sx={{ width: '100%' }}>
                        <Autocomplete options={
                            ingredients.filter(a => selectedIngredients.every(vv => vv != a.name))}
                            getOptionLabel={a => a.name}
                            renderInput={(params) => <TextField {...params} />}
                            sx={{ width: '90%' }}
                            value={selectedIngredient}
                            onChange={(e, v) => { setSelectedIngredient(v) }} />
                        <Button disabled={selectedIngredient === null}
                            onClick={() => {
                                // selektovani sastojak ubacujemo u listu
                                console.log(selectedIngredient);
                                if (selectedIngredient != null) {
                                    let a = selectedIngredients;
                                    a.push(selectedIngredient.name);
                                    setSelectedIngredients(a);
                                    setSelectedIngredient(null);
                                }
                            }}
                        > Add ingredients </Button>
                    </Stack>

                </Stack>
            </FormControl>


            <Button sx={{ color: '#E01E9B' }}
                onClick={save}
                disabled={timeError || nameError || stepsError || amountError || ingredientError}>
                {" "}Save{" "}
            </Button>
            <FormHelperText error={globalError}>{globalError}</FormHelperText>
        </Box>
    </Container>
};

export default RecipeForm;