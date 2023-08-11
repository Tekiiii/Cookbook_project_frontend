import { useEffect, useState } from "react";
import { Container, FormControl, Stack, TextField, Box, Button } from "@mui/material";
import ShowRegUser from "./ShowRegUser";
import { useNavigate } from "react-router-dom";

const ShowRegUsers = () => {
  const [regularuser, setRegularuser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    const getRegularusers = async () => {
      const user = localStorage.getItem("user");
      if (user) {
        const u = JSON.parse(user);
        try {
          let result = await fetch("http://localhost:8080/project/regularuser", {
            method: "GET",
            headers: {
              Authorization: u.token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          });

          if (result.ok) {
            let ru = await result.json();
            setRegularuser(ru);
            setIsLoading(false);
          } else {
            setError("Please try again!");
          }
        } catch (error) {
          setError("An error occurred while fetching data.");
        }
      }
    };

    getRegularusers();
  }, []);

  useEffect(() => {
    if (search !== "") {
      let ru1 = regularuser.filter(
        (ru) =>
          ru.name.toLowerCase().includes(search.toLowerCase()) ||
          ru.lastname.toLowerCase().includes(search.toLowerCase())
      );
      setRegularuser(ru1);
    } else {
      setRegularuser(regularuser);
    }
  }, [search, regularuser]);

  const handleDelete = (regularuserId) => {
    // Osvežavanje prikaza nakon brisanja
    const updatedRegularUsers = regularuser.filter((ru) => ru.id !== regularuserId);
    setRegularuser(updatedRegularUsers);
  };

  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3,
        }}
      >
        <FormControl sx={{ width: "30%" }}>
          <TextField
            placeholder="Search..."
            label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormControl>

        <Button variant="outlined" onClick={() => navigation("newregularuser")}>
          Add new regular user
        </Button>
      </Box>

      <Stack direction="column">
        {regularuser.map((ru) => (
          <ShowRegUser regularuser={ru} onDelete={handleDelete} key={ru.id} />
        ))}
      </Stack>
    </Container>
  );
};

export default ShowRegUsers;
