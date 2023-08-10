import { Box, Button, Container, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom/dist";

const RegUserEdit = () => {

    const regularuser = useLoaderData();
    const [updatedregularuser, setUpdatedregularuser] = useState(regularuser);
    const navigate = useNavigate();

    // funkcija za izmenu 

    const { id } = useParams();
    const [name, setName] = useState(regularuser.name);
    const [lastName, setLastName] = useState(regularuser.lastname);
    const [myCookbook, setMyCookbook] = useState(regularuser.myCookBook);
    const [allergens, setAllergens] = useState(regularuser.allergens);
    const [email, setEmail] = useState(regularuser.email);

    const [globalError, setGlobalError] = useState(false);
    const errorMessageTemplate = "Please enter the ";
    const [nameError, setNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [myCookbookError, setMyCookbookError] = useState("");
    const [allergensError, setAllergensError] = useState("");
    const [emailError, setEmailError] = useState("");

    const update = async () => {
        if (name == "" || lastName == "" || myCookbook == "" || allergens == "" || email == "") {
            setGlobalError("Please fill all fields in the form");
            return;
        }

        const edit_regularuser = {
            id: parseInt(id),
            name: name,
            lastname: lastName,
            myCookBook: myCookbook,
            allergens: allergens,
            email: email,
        };

            const user = localStorage.getItem("user");
            if (user) {
                const u = JSON.parse(user);
                let response = await fetch(
                    `http://localhost:8080/project/regularuser/edit_regularuser/${updatedregularuser.id}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: u.token,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(edit_regularuser),
                    }
                );
                console.log(response);
                if (response.ok) {
                    let d = await response.json();
                    console.log(JSON.stringify(d));
                    alert("Successfully updated!");
                    navigate("/regularuser");
                } else {
                    console.log("Failed updating.");
                }
            }
        }

    
        return (
            <Container> <h1><i>Edit regular user</i></h1>
                <Box
                    component="form"
                    sx={{
                        display: "flex",
                        gap: "10px",
                        "flex-direction": "column",
                        "align-items": "center",
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
                        label="Name"
                        placeholder="Name"
                        value={name}
                        helperText={nameError}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (e.target.value !== "") setNameError("");
                            else setNameError(errorMessageTemplate + " regular user name.");
                         }}
                    />
                    <TextField
                        sx={{ width: "100%" }}
                        fullWidth
                        required
                        id="outlined-required"
                        label="Lastname"
                        placeholder="Lastname"
                        value={lastName}
                        helperText={lastNameError}
                        onChange={(e) => {
                            setLastName(e.target.value);
                            if (e.target.value !== "") setLastNameError("");
                            else setLastNameError(errorMessageTemplate + " regular user lastname.");
                         
                        }}
                    />
                    <TextField
                        sx={{ width: "100%" }}
                        fullWidth
                        required
                        id="outlined-required"
                        label="MyCookbook"
                        placeholder="MyCookbook"
                        value={myCookbook.id}
                        helperText={myCookbookError}
                        onChange={(e) => {
                            setMyCookbook(e.target.value);
                            if (e.target.value !== "") setMyCookbookError("");
                            else setMyCookbookError(errorMessageTemplate + " regular user Cookbook.");
                         
                        }}
                    />
                    <TextField
                        sx={{ width: "100%" }}
                        fullWidth
                        required
                        id="outlined-required"
                        label="Allergens"
                        placeholder="Allergens"
                        value={allergens.id}
                        helperText={allergensError}
                        onChange={(e) => {
                            setAllergens(e.target.value);
                            if (e.target.value !== "") setAllergens("");
                            else setAllergensError(errorMessageTemplate + " regular user allergens.");
                        }}
                    />
                    <TextField
                        sx={{ width: "100%" }}
                        fullWidth
                        required
                        id="outlined-required"
                        label="Email"
                        placeholder="Email"
                        value={email}
                        helperText={emailError}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (e.target.value !== "") setEmail("");
                            else setEmailError(errorMessageTemplate + " regular user email.");
                         
                        }}
                    />

                    <Button
                        onClick={update}
                        disabled={
                             nameError || lastNameError || myCookbook || allergens || emailError
                        }
                    >
                        {" "}
                        Save{" "}
                    </Button>
                    <FormHelperText error={globalError}>{globalError}</FormHelperText>
                </Box>
            </Container>
        );
    };

    export default RegUserEdit;