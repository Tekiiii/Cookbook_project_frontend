import { Box, Button, Container, FormHelperText, TextField, Typography } from "@mui/material";
import { produce } from "immer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeForm = () => {
    const [newRecipe, setNewRecipe] = useState({
        name: "",
        time: ""
    });

    const [recipeNameError, setRecipeNameError] = useState("");
    const [timeError, setTimeError] = useState("");
    const [globalError, setGlobalError] = useState(false);
    const navigate = useNavigate();

    const save = async () => {
        if (newRecipe.name === "" || newRecipe.name === "") {
            setGlobalError("Please fill all the fields in the form")
            return;
        }
        //const user = localStorage.getItem("user");
        //const u = JSON.parse(user);
        let response = await fetch("http://localhost:8080/project/recipe/newRecipe", {
            method: "POST",
            headers: {
                //Authorization : u.token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRecipe),
        });
        console.log(response);
        if (response.ok) {
            let d = await response.json();
            console.log(JSON.stringify(d));
            alert("You have successfully created new recipe!");
            navigate("/recipe");
        } else {
            console.log("Failed creating new recipe");
        }
    }

    return <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ marginBottom: '20px', fontSize: '22px', color: '#E01E9B' }}>
            Kreiranje novog recepta <br />
            <span style={{ fontSize: '16px' }}>Molimo Vas unesite potrebne podatke u polja za unos.</span>
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
                value={newRecipe.name}
                placeholder="Recipe name"
                helperText={recipeNameError}
                error={recipeNameError === "" ? false : true}
                onBlur={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                        setRecipeNameError("Molim vas unesite naziv recepta.");
                    }
                }}
                onChange={(e) => {
                    setNewRecipe(
                        produce((draft) => {
                            draft.name = e.target.value;
                        })
                    );
                    if (e.target.value === "") {
                        setRecipeNameError("Molim vas unesite naziv recepta.");
                    } else if (!/^[a-zA-Z\s]+$/.test(e.target.value)) {
                        setRecipeNameError("Ne sme se uneti broj, molim vas unesite naziv recepta.");
                    } else if (e.target.value.length < 2) {
                        setRecipeNameError("Naziv recepta mora imati više od 2 karaktera.");
                    } else if (e.target.value.length > 20) {
                        setRecipeNameError("Naziv recepta mora imati manje od 20 karaktera.");
                    } else setRecipeNameError("");
                }}
            />
            <TextField
                sx={{ width: "100px" }}
                fullWidth
                required
                id="outlined-noc-input"
                label="Time to prepare"
                value={newRecipe.time}
                error={timeError}
                helperText={timeError}
                onBlur={(e) => {
                    const value = e.target.value;
                    if (value === "") {
                        setTimeError("Molim vas unesite vreme za pripremu u minutima.");
                    }
                }}
                onChange={(e) => {
                    setNewRecipe(
                        produce((draft) => {
                            draft.time = e.target.value;
                        })
                    );
                    const value = e.target.value;
                    if (value === "") {
                        setTimeError("Molim vas unesite vreme za pripremu.");
                    } else if (value <= 0 || value > 50) {
                        setTimeError("Vreme za pripremu ne sme biti preko 1000.");
                    } else if (isNaN(value)) {
                        setTimeError("Ne sme se unositi tekst, molimo vas unesite broj do 1000.");
                    } else setTimeError("");
                }}
            />
            <Button sx={{ color: '#E01E9B' }}
                onClick={save}
                disabled={timeError || recipeNameError}>
                {" "}Save{" "}
            </Button>
            <FormHelperText error={globalError}>{globalError}</FormHelperText>
        </Box>
    </Container>
};


export default RecipeForm;