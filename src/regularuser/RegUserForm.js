import { useState } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import { Box, Button, Container, FormHelperText, TextField } from "@mui/material";

const RegUserForm = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmed_password, setConfirmed_password] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [globalError, setGlobalError] = useState(false);


  const newRegularUser = {
    name: name,
    lastname: lastname,
    username:username,
    password: password,
    confirmed_password: confirmed_password,
    email: email,
  };

  const addRegularUser = async () => {

    const user = localStorage.getItem("user");
    if (user) {
       const u = JSON.parse(user);
    let response = await fetch("http://localhost:8080/project/regularuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       "Authorization": u.token,
      },
      body: JSON.stringify(newRegularUser),
    });

    console.log(response);
    if (response.ok) {
      let d = await response.json();
      //console.log(JSON.stringify(d, null, 4));
      alert("Successfully added new regular user.");
      navigate("/regularuser");
    } else {
      console.log("Error!");
    }
   }

   
 };
  return (
    <Container>
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
          label="Regular user name"
          placeholder="Regular user name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Regular user lastname"
          placeholder="Regular user lastname"
          onChange={(e) => {
            setLastname(e.target.value);
          }}
        />
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Username"
          placeholder="Username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Confirmed password"
          placeholder="Confirmed password"
          onChange={(e) => {
            setConfirmed_password(e.target.value);
          }}
        />
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <Button
          onClick={addRegularUser}
        >
          {" "}
          Save{" "}
        </Button>
        <FormHelperText error={globalError}>{globalError}</FormHelperText>

      </Box>
    </Container>
  );


};

export default RegUserForm;