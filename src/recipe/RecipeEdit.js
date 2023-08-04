import { produce } from "immer";
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
} from "@mui/material";

const RecipeEdit = () => {
    const recipe = useLoaderData();
    const [updatedRecipe, setUpdatedRecipe] = useState(recipe);
    const [recipeError, setRecipeError] = useState("");
    const navigate = useNavigate();

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
                    [e.target.name]: "Molim vas unesite naziv recepta.",
                }));
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                setRecipeError((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]:
                        "Ne sme se uneti broj, molim vas unesite naziv recepta.",
                }));
            } else if (value.length < 2 || value.length > 20) {
                setRecipeError((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]: "Naziv recepta mora biti između 2 i 20 karaktera.",
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
                    [e.target.name]: "Molim vas unesite vreme za pripremu.",
                }));
            } else if (value <= 0 || value > 1000) {
                setRecipeError((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]: "Vreme ne sme biti preko 1000.",
                }));
            } else if (isNaN(value)) {
                setRecipeError((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]:
                        "Ne sme se unositi tekst, molim vas unesite broj do 1000.",
                }));
            }
        }
    };

    const update = async () => {
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
                    body: JSON.stringify(updatedRecipe),
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
            Ažuriranje recepta <br />
            <span style={{ fontSize: "16px" }}>Molimo Vas unesite podatke u polja za unos.</span>
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
                value={updatedRecipe.name}
                name="name"
                placeholder="Recipe name"
                helperText={recipeError.name}
                error={Boolean(recipeError.name)}
                onChange={changeRecipe}
            />
            <TextField
                sx={{ width: "100px" }}
                fullWidth
                required
                id="outlined-noc-input"
                label="Time to prepare"
                value={updatedRecipe.time}
                name="time"
                helperText={recipeError.time}
                error={Boolean(recipeError.time)}
                onChange={changeRecipe}
            />
            <Button sx={{ color: '#E01E9B' }}
                onClick={update} disabled={Object.values(recipeError).some((error) => error !== "")}>
                {" "}
                Save{" "}
            </Button>
        </Box>
    </Container>
}

export default RecipeEdit;