import { useState } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import { Box, Button, Container, TextField } from "@mui/material";

const ChefForm = () => {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmed_password, setConfirmed_password] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();



  const addChef = async () => {

    const user = localStorage.getItem("user");
    if (user) {
       const u = JSON.parse(user);
    let response = await fetch("http://localhost:8080/project/chef", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       "Authorization": u.token,
      },
      body: JSON.stringify(newChef),
    });

    console.log(response);
    if (response.ok) {
      let d = await response.json();
      console.log(JSON.stringify(d, null, 4));
      navigate("/chef");
    } else {
      console.log("Error!");
    }
   }

   const newChef = {
    name: name,
    lastname: lastname,
    username:username,
    password: password,
    confirmed_password: confirmed_password,
    email: email,
  };
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
          label="Chef name"
          placeholder="Chef name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Chef lastname"
          placeholder="Chef lastname"
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
          onClick={addChef}
        >
          {" "}
          Save{" "}
        </Button>
      </Box>
    </Container>
  );


};

export default ChefForm;