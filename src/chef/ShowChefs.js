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
import ShowChef from "./ShowChef";



const ShowChefs = () => {
  const [chef, setChef] = useState([]);
  const [all, setAll] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    const getChefs = async () => {
      const user = localStorage.getItem("user");
     if (user) {
       const u = JSON.parse(user);
        let result = await fetch('http://localhost:8080/project/chef', {
        method: 'GET',
        headers: {
            "Authorization": u.token,
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
        });
        console.log(result);
        if (result.ok) {
          let rc = await result.json();
          setChef(rc);
          setAll(rc);
          setIsLoading(false);
        } else {
          setError("Please try again!");
        }
      };

    };
    getChefs();
  }, []);

  useEffect(() => {
    if (search !== "") {
      let rc1 = all.filter((rc) => rc.name.toLowerCase().includes(search.toLowerCase()) || rc.lastname.toLowerCase().includes(search.toLowerCase()));
      setChef(rc1);
    } else {
      setChef(all);
    }
  }, [search, all]);

  const handleDelete = (chefId) => {
    // osvezimo prikaz
    const frc = chef.filter((rc) => rc.id!= chefId);
    setChef(frc);
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

        {/* chef/newChef */}
        <Button variant="red"   onClick={() => navigation("newChef")}>
          {" "}
          Add new chef{" "}
        </Button>
      </Box>

      <Stack direction="column">
        {chef.map((rc) =>
          <ShowChef
            chef={rc}
            onDelete={handleDelete} key={rc.id} />
        )}
      </Stack>
    </Container>
  );


};

export default ShowChefs;