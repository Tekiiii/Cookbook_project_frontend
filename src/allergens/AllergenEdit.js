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

const AllergenEdit = () => {
    const allergen = useLoaderData();
    const [updatedAllergen, setUpdatedAllergen] = useState(allergen);
    const [allergenError, setAllergenError] = useState("");
    const navigate = useNavigate();

    const changeAllergen = (e) => {
        setUpdatedAllergen(
            produce((draft) => {
                draft[e.target.name] = e.target.value;
            })
        );

        setAllergenError((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: "",
        }));

        if (e.target.name === "name") {
            const value = e.target.value.trim();
            if (value === "") {
                setAllergenError((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]: "Molim vas unesite naziv alergena.",
                }));
            } else if (!/^[a-zA-Z\s]+$/.test(value)) {
                setAllergenError((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]:
                        "Ne sme se uneti broj, molim vas unesite naziv alergena.",
                }));
            } else if (value.length < 2 || value.length > 20) {
                setAllergenError((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]: "Naziv alergena mora biti između 2 i 20 karaktera.",
                }));
            } else {
                setAllergenError((prevErrors) => ({
                    ...prevErrors,
                    [e.target.name]: "",
                }));
            }
        }

    };


    const update = async () => {
        const user = localStorage.getItem("user");
        if (user) {
            const u = JSON.parse(user);
            try {
                let response = await fetch(
                    `http://localhost:8080/project/allergens/${updatedAllergen.id}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: u.token,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedAllergen),
                    }
                );

                if (response.ok) {
                    let d = await response.json();
                    console.log(JSON.stringify(d));
                    alert("Successfully updated allergen");
                    navigate("/allAllergens");
                } else {
                    console.log("Failed updating allergen");
                }
            } catch (error) {
                console.error("Error updating allergen:", error);
            }
        }
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ marginBottom: "20px", fontSize: "22px", color: "#E01E9B" }}>
                Edit Allergens <br />
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
                    label="Alergen ID"
                    value={updatedAllergen.id}
                    ID="ID"
                    placeholder="Alergen ID"
                    helperText={allergenError.id}
                    error={Boolean(allergenError.id)}
                    onChange={changeAllergen}
                />
                <TextField
                    sx={{ width: "100%" }}
                    fullWidth
                    required
                    id="outlined-required"
                    label="Alergen name"
                    value={updatedAllergen.name}
                    name="name"
                    placeholder="Alergen name"
                    helperText={allergenError.name}
                    error={Boolean(allergenError.name)}
                    onChange={changeAllergen}
                />
                <Button
                    sx={{ color: '#E01E9B' }}
                    onClick={update}
                    disabled={Object.values(allergenError).some((error) => error !== "")}>
                    Save
                </Button>
            </Box>
        </Container>
    );
}

export default AllergenEdit;
