import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField } from "@mui/material";

const RegUserForm = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [myCookBook, setMyCookBook] = useState("");
  const [allergens, setAllergens] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();



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
      body: JSON.stringify(newRegUser),
    });

    console.log(response);
    if (response.ok) {
      let d = await response.json();
      console.log(JSON.stringify(d, null, 4));
      navigate("/regularuser");
    } else {
      console.log("Error!");
    }
   }

   const newRegUser = {
    name: name,
    lastName: lastName,
    myCookBook: myCookBook,
   // allergens: allergens,
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
            setLastName(e.target.value);
          }}
        />
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="Allergens"
          placeholder="Allergens"
          onChange={(e) => {
            setAllergens(e.target.value);
          }}
        />
        <TextField
          sx={{ width: "100%" }}
          fullWidth
          required
          id="outlined-required"
          label="MyCookbook"
          placeholder="MyCookbook"
          onChange={(e) => {
            setMyCookBook(e.target.value);
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
      </Box>
    </Container>
  );


};

export default RegUserForm;