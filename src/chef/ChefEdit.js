import { Box, Button, Container, FormHelperText, TextField } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom/dist";

const ChefEdit = () => {

    const chef = useLoaderData();
//    const [updatedchef, setUpdatedchef] = useState(chef);
    const navigate = useNavigate();

    // funkcija za izmenu 

    const { id } = useParams();
    const [name, setName] = useState(chef.name);
    const [lastname, setLastname] = useState(chef.lastname);
    const [username, setUsername] = useState(chef.username);
    const [password, setPassword] = useState(chef.password);
 //   const [recipes, setRecipes] = useState(chef.recipes);
    const [email, setEmail] = useState(chef.email);

    const [globalError, setGlobalError] = useState(false);
    const errorMessageTemplate = "Please enter the ";
    const [nameError, setNameError] = useState("");
    const [lastnameError, setLastnameError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
 //   const [recipesError, setRecipesError] = useState("");
    const [emailError, setEmailError] = useState("");

    const update = async () => {
        if (name == "" || lastname == "" || username == "" || password == "" || email == "") {
            setGlobalError("Please fill all fields in the form");
            return;
        }

        const edit_chef = {
            id: parseInt(id),
            name: name,
            lastname: lastname,
            username: username,
            password: password,
    ///        recipes: recipes,
            email: email,
        };

            const user = localStorage.getItem("user");
            if (user) {
                const u = JSON.parse(user);
                let response = await fetch(
                    `http://localhost:8080/project/chef/${chef.id}`,
                    {
                        method: "PUT",
                        headers: {
                            Authorization: u.token,
                            Accept: "application/json",
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(edit_chef),
                    }
                );
                console.log(response);
                if (response.ok) {
                    let d = await response.json();
                    console.log(JSON.stringify(d));
                    alert("Successfully updated!");
                    navigate("/chef");
                } else {
                    console.log("Failed updating.");
                }
            }
        }

    
        return (
            <Container> <h1><i>Edit chef</i></h1>
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
                            else setNameError(errorMessageTemplate + " chef name.");
                         }}
                    />
                    <TextField
                        sx={{ width: "100%" }}
                        fullWidth
                        required
                        id="outlined-required"
                        label="Lastname"
                        placeholder="Lastname"
                        value={lastname}
                        helperText={lastnameError}
                        onChange={(e) => {
                            setLastname(e.target.value);
                            if (e.target.value !== "") setLastnameError("");
                            else setLastnameError(errorMessageTemplate + " chef lastname.");
                         
                        }}
                    />
                    <TextField
                        sx={{ width: "100%" }}
                        fullWidth
                        required
                        id="outlined-required"
                        label="Username"
                        placeholder="Username"
                        value={username}
                        helperText={usernameError}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            if (e.target.value !== "") setUsernameError("");
                            else setUsernameError(errorMessageTemplate + " chef username.");
                         }}
                    />
                    <TextField
                        sx={{ width: "100%" }}
                        fullWidth
                        required
                        id="outlined-required"
                        label="Password"
                        placeholder="Password"
                        value={password}
                        helperText={passwordError}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (e.target.value !== "") setPasswordError("");
                            else setPasswordError(errorMessageTemplate + " chef password.");
                         }}
                    />
                    {/* <TextField
                        sx={{ width: "100%" }}
                        fullWidth
                        required
                        id="outlined-required"
                        label="Recipes"
                        placeholder="Recipes"
                        value={recipes.id}
                        helperText={recipesError}
                        onChange={(e) => {
                            setRecipes(e.target.value);
                            if (e.target.value !== "") setRecipesError("");
                            else setRecipesError(errorMessageTemplate + " chef recipes.");
                         
                        }}
                    /> */}
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
                            else setEmailError(errorMessageTemplate + " chef email.");
                         
                        }}
                    />

                    <Button
                        onClick={update}
                        disabled={
                             nameError || lastnameError || usernameError || passwordError || emailError
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

    export default ChefEdit;