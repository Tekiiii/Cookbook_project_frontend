import { Box, Button, Container, FormHelperText, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AllergenForm = () => {
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState("");
    const [globalError, setGlobalError] = useState(false);
    const errorMessageTemplate = "Please enter ";
    const navigate = useNavigate();

    const save = async () => {
        if (name === "") {
            setGlobalError("Please fill all the fields in the form.");
            return;
        }

        const newAllergen = {
            name: name,
        }

        const user = localStorage.getItem("user");
        if (user) {
            const u = JSON.parse(user);
            let response = await fetch("http://localhost:8080/project/allergens", {
                method: "POST",
                headers: {
                    Authorization: u.token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newAllergen),
            });

            if (response.ok) {
                let d = await response.json();
                console.log(JSON.stringify(d));
                alert("You have successfully created a new allergen!");
                navigate("/allAllergens");
            } else {
                console.log("Failed creating a new allergen");
            }
        }
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ marginBottom: '20px', fontSize: '22px', color: '#E01E9B' }}>
                Add New Allergen
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
                    label="Allergen name"
                    placeholder="Allergen name"
                    value={name}
                    helperText={nameError}
                    error={nameError}
                    onBlur={(e) => {
                        const value = e.target.value;
                        setName(value);
                        if (!value) {
                            setNameError(errorMessageTemplate + "allergen name.");
                        }
                    }}
                    onChange={(e) => {
                        const value = e.target.value;
                        setName(value);
                        if (!value) {
                            setNameError(errorMessageTemplate + "allergen name.");
                        } else if (value.length < 2) {
                            setNameError("Allergen name must have more than 2 characters.");
                        } else if (value.length > 30) {
                            setNameError("Allergen name must have less than 30 characters.");
                        } else {
                            setNameError("");
                        }
                    }}
                />
                <Button
                    variant="contained"
                    style={{ backgroundColor: '#6bb187', color: 'white' }}
                    onClick={save}
                    disabled={nameError}
                >
                    Save
                </Button>
                <FormHelperText error={globalError}>{globalError}</FormHelperText>
            </Box>
        </Container>
    );
};

export default AllergenForm;
