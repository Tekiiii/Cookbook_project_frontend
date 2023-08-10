import { useLoaderData, useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import ShowRegUser from "./ShowRegUser";



const ShowRegUsers = () => {
  const [regularuser, setregularuser] = useState([]);
  const [all, setAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigation = useNavigate();
  const[showRegUsers, setShowRegUsers] = useState(regularuser);

  useEffect(() => {
    const getregularusers = async () => {
      const user = localStorage.getItem("user");
     if (user) {
       const u = JSON.parse(user);
        let result = await fetch('http://localhost:8080/project/regularuser', {
        method: 'GET',
        headers: {
            "Authorization": u.token,
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
        });
        console.log(result);
        if (result.ok) {
          let ru = await result.json();
          setregularuser(ru);
          setAll(ru);
          setIsLoading(false);
        } else {
          setError("Please try again!");
        }
      };

    };
    getregularusers();
  }, []);

  useEffect(() => {
    if (search !== "") {
      let ru1 = all.filter((ru) => ru.name.toLowerCase().includes(search.toLowerCase()) || ru.lastname.toLowerCase().includes(search.toLowerCase()));
      setregularuser(ru1);
    } else {
      setregularuser(all);
    }
  }, [search, all]);

  const handleDelete = (regularuserId) => {
    // osvezimo prikaz
    const fru = showRegUsers.filter((ru) => ru.id!= regularuserId);
    setShowRegUsers(fru);
  };


  if (isLoading) {
    return (
      <div>
        <h1>Loading....</h1>
      </div>
    );
  }
  if (error) {
    return <p>{error}</p>;
  }



  //  const search = (value) => {
  // pretraga po imenu

  //  if (value == "") {
  //    setPrikaziNastavnike(nastavnici);
  //   } else {
  //    const n = nastavnici.filter((n) =>
  //    n.name.toLowerCase().includes(value.toLowerCase())
  //   );
  //  setPrikaziNastavnike(n);
  //  }
  // };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 3,
        }}
      >
        {/* definisan onChange dogadjaj, svaki put kada se unese nova vrednost pozove se funkcija search  */}
        <FormControl sx={{ width: "30%" }}>
          <TextField
            placeholder="Search..."
            label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormControl>

        {/* regulauser/newregularuser */}
        <Button variant="outlined" onClick={() => navigation("newregularuser")}>
          {" "}
          Add new regular user{" "}
        </Button>
      </Box>

      <Stack direction="column">
        {regularuser.map((ru) =>
          <ShowRegUser
            regularuser={ru}
            onDelete={handleDelete} key={ru.id} />
        )}
      </Stack>
    </Container>
  );


};

export default ShowRegUsers;