import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import { Box, TextField, Button, Container, Typography, Snackbar, Alert } from "@mui/material";
import { useState, useContext } from 'react';
import './App.css'

const Signin = () => {
    const { user, signin} = useContext(UserContext);
    const [signinData, setSigninData] = useState({ email: '', password: '', confirmed_password: "", username: "", name: "", lastname: "" });
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            signin();
        }
    };

    const [errorSignin, setErrorSignin] = useState(false);

    const closeErrorMsg = () => {
        setErrorSignin(false);
    }


    const signinUser = async () => {
        const result = await fetch('http://localhost:8080/project/regularuser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signinData),
        });
        if (result.ok) {
            const user = await result.json();
            signin(user);
            localStorage.setItem("user", JSON.stringify(user));
            console.log('Ulogovan korisnik ' + JSON.stringify(user))
            navigate('/login'); // TODO or 
            setErrorSignin(false);
        } else {
            console.log('Problem prilikom pravljenja naloga.');
            setErrorSignin(true);
        }
    }

    return (
        <Container>
            <Typography className="typo" sx={{ marginBottom: '30px', fontSize: '20px', color: '#E01E9B', textAlign: 'center' }}>
                Molimo Vas, napravite svoj nalog.
            </Typography>
            <Box sx={{ margin: '50px auto 30px auto', alignItems: 'center', width: '40%', textAlign: 'center' }}>
                <TextField
                    required
                    placeholder="Email"
                    label="Email"
                    onChange={(e) => {
                        const dataForSignin = { ...signinData };
                        dataForSignin.email = e.target.value;
                        setSigninData(dataForSignin);
                    }}
                    onKeyDown={handleKeyDown}
                    sx={{
                        border: 'none',
                        borderRadius: '20px',
                        width: '100%',
                        marginBottom: '25px',
                    }} />
                <TextField
                    required
                    placeholder="Password"
                    label="Password"
                    onChange={(e) => {
                        const dataForSignin = { ...signinData };
                        dataForSignin.email = e.target.value;
                        setSigninData(dataForSignin);
                    }}
                    onKeyDown={handleKeyDown}
                    sx={{ width: '100%' }}
                    type='password' />
                
                <TextField
                    required
                    placeholder="Confirmed Password"
                    label="Confirmed password"
                    onChange={(e) => {
                        const dataForSignin = { ...signinData };
                        dataForSignin.email = e.target.value;
                        setSigninData(dataForSignin);
                    }}
                    onKeyDown={handleKeyDown}
                    sx={{
                        border: 'none',
                        borderRadius: '20px',
                        width: '100%',
                        marginBottom: '25px',
                    }} />
                <TextField
                    required
                    placeholder="Username"
                    label="Username"
                    onChange={(e) => {
                        const dataForSignin = { ...signinData };
                        dataForSignin.email = e.target.value;
                        setSigninData(dataForSignin);
                    }}
                    onKeyDown={handleKeyDown}
                    sx={{
                        border: 'none',
                        borderRadius: '20px',
                        width: '100%',
                        marginBottom: '25px',
                    }} />
                    <TextField
                    required
                    placeholder="Name"
                    label="Name"
                    onChange={(e) => {
                        const dataForSignin = { ...signinData };
                        dataForSignin.email = e.target.value;
                        setSigninData(dataForSignin);
                    }}
                    onKeyDown={handleKeyDown}
                    sx={{ width: '100%' }}
                    type='name' />
                    <TextField
                    required
                    placeholder="Lastname"
                    label="Lastname"
                    onChange={(e) => {
                        const dataForSignin = { ...signinData };
                        dataForSignin.email = e.target.value;
                        setSigninData(dataForSignin);
                    }}
                    onKeyDown={handleKeyDown}
                    sx={{ width: '100%' }}
                    type='lastname' />






                <Button sx={{ marginTop: '15px', color: '#E01E9B' }} onClick={signinUser} >Sign in</Button>
            </Box>
            <Snackbar open={errorSignin} onClose={closeErrorMsg}>
                <Alert onClose={closeErrorMsg} severity='error' sx={{ width: '100%' }}>
                    Problem prilikom pravljenja novog naloga.
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default Signin;