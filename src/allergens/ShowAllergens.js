import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Tooltip,
    Typography,
    Grid
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from '@mui/icons-material/Search';
import { UserContext } from '../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const ShowAllergens = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [allergens, setAllergens] = useState([]);
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredAllergens, setFilteredAllergens] = useState([]);

    useEffect(() => {
        const getAllergens = async () => {
            const user = localStorage.getItem("user");
            if (user) {
                const u = JSON.parse(user);
                let result = await fetch('http://localhost:8080/project/allergens', {
                    method: 'GET',
                    headers: {
                        Authorization: u.token,
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                });
                console.log(result);
                if (result.ok) {
                    let allergens_a = await result.json();
                    setData(allergens_a);
                    setAllergens(allergens_a);
                }
            }
        };
        getAllergens();
    }, []);

    useEffect(() => {
        const filtered = allergens.filter((allergen) =>
            allergen.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredAllergens(filtered);
    }, [searchTerm, allergens]);

    const handleDelete = async (allergeniD) => {
        const user = localStorage.getItem("user");
        if (user) {
            const u = JSON.parse(user);
            try {
                const response = await fetch(`http://localhost:8080/project/allergens/${allergeniD}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: u.token,
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const updatedAllergens = allergens.filter(allergen => allergen.id !== allergeniD);
                    setAllergens(updatedAllergens);
                } else {
                    console.log("Error while deleting allergen");
                }
            } catch (error) {
                console.error("Error while deleting allergen:", error);
            }
        }
    };

    return (
        <div>
            <Typography sx={{ marginBottom: '20px', fontSize: '22px', color: '#E01E9B' }}>
                All Allergens
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <OutlinedInput
                    className='custom-textfield'
                    type='text'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{
                        border: 'none',
                        borderRadius: '20px',
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: '0.5px solid #6bb187',
                        },
                        '&:hover': {
                            boxShadow: '0 0 5px #6bb187',
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none',
                            },
                        },
                        '&.Mui-focused': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: '1px solid #6bb187',
                            },
                        },
                    }}
                    startAdornment={
                        <InputAdornment position='start'>
                            <SearchIcon />
                        </InputAdornment>
                    }
                />
            </Box>
            <Grid container spacing={3}>
                {filteredAllergens.map((allergen) => (
                    <Grid item xs={4} key={allergen.id}>
                        <Card variant="outlined" sx={{ marginBottom: 1 }}>
                            <CardHeader
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    backgroundColor: "#6bb187",
                                    color: "white"
                                }}
                                title={allergen.name}
                            />
                            <CardContent>
                                ID: {allergen.id}
                            </CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 8px' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Tooltip title="Edit">
                                        <IconButton
                                            sx={{ marginX: '8px', color: '#6bb187', fontSize: '1em' }}
                                            aria-label="edit"
                                            onClick={() => navigate(`/allergen_edit/${allergen.id}`)}>
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Info">
                                        <IconButton
                                            sx={{ marginX: '8px', color: '#6bb187', fontSize: '1em' }}
                                            aria-label="info"
                                            onClick={() => navigate(`allergen_details/${allergen.id}`)}>
                                            <InfoIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton
                                            sx={{ marginX: '8px', color: '#6bb187', fontSize: '1em' }}
                                            aria-label="delete"
                                            onClick={() => handleDelete(allergen.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default ShowAllergens;
