import { Box, Button, Container, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

const AllergensEdit = () => {
    const allergen = useLoaderData();
    const { id } = useParams();
    
    const initialState = {
        name: allergen.name || '',
        icon: allergen.icon || '',
    };
    
    const [updatedAllergen, setUpdatedAllergen] = useState(initialState);
    const [nameError, setNameError] = useState("");
    const [iconError, setIconError] = useState("");
    const [globalError, setGlobalError] = useState(false);
    
    const errorMessageTemplate = "Please enter the ";
    const navigate = useNavigate();

    const handleNameChange = (e) => {
        const newName = e.target.value;
        setUpdatedAllergen(prevState => ({ ...prevState, name: newName }));
        if (newName !== "") {
            setNameError("");
        } else {
            setNameError(errorMessageTemplate + " allergen name.");
        }
    };

    const handleIconChange = (e) => {
        const newIcon = e.target.value;
        setUpdatedAllergen(prevState => ({ ...prevState, icon: newIcon }));
        if (newIcon !== "") {
            setIconError("");
        } else {
            setIconError(errorMessageTemplate + " allergen icon.");
        }
    };

    const update = async () => {
        if (updatedAllergen.name === "" || updatedAllergen.icon === "") {
            setGlobalError("Please fill all fields in the form");
            return;
        }

        const editAllergen = {
            id: parseInt(id),
            name: updatedAllergen.name,
            icon: updatedAllergen.icon,
        };

        const user = localStorage.getItem("user");
        if (user) {
            const u = JSON.parse(user);
            try {
                const response = await fetch(`http://localhost:8080/project/allergens/${id}`, {
                    method: "PUT",
                    headers: {
                        Authorization: u.token,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(editAllergen),
                });

                if (response.ok) {
                    let d = await response.json();
                    console.log(JSON.stringify(d));
                    alert("Successfully updated!");
                    navigate("/allAllergens");
                } else {
                    console.log("Failed updating.");
                }
            } catch (error) {
                console.error("Error while updating allergen:", error);
            }
        }
    };

    return (
        <Container>
            <h1><i>Edit Allergen</i></h1>
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
                    label="Name"
                    placeholder="Name"
                    value={updatedAllergen.name}
                    helperText={nameError}
                    onChange={handleNameChange}
                />
                <TextField
                    sx={{ width: "100%" }}
                    fullWidth
                    required
                    label="Icon"
                    placeholder="Icon URL"
                    value={updatedAllergen.icon}
                    helperText={iconError}
                    onChange={handleIconChange}
                />

                <Button
                    onClick={update}
                    disabled={nameError !== "" || iconError !== ""}
                >
                    Save
                </Button>
                <FormHelperText error={globalError}>{globalError}</FormHelperText>
            </Box>
        </Container>
    );
};

export default AllergensEdit;
