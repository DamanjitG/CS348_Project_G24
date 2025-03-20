import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Typography, Paper, Button, Box, TextField } from "@mui/material";
import { loginUser } from "../services/auth";

const LoginCard = ( { setUser }) => {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const nav = useNavigate();


  const getLogin = async(e) => {
    e.preventDefault();
    const getLoginResult = await loginUser(username, password);
    if (getLoginResult.success){
      console.log("Login success", getLoginResult.user);
      setUser(getLoginResult.user);
      nav("/")
    } else{
      console.log("Login failed", getLoginResult.error)
    }
  }

  return (
    <Paper
      elevation={3}
      sx={{p: 3, maxWidth: 300, mx: "auto", mt: 5,
      }}
    >
      <Typography variant="h3" align="center" gutterBottom>
        Login
      </Typography>

      <Box component="form" noValidate autoComplete="off" onSubmit={getLogin}>
        <TextField id="username" label="Enter Username" variant="outlined" margin="dense" fullWidth value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField id="password" label="Enter Password" type="password" variant="outlined" margin="normal" fullWidth value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="outlined" color="primary" fullWidth sx={{ mt: 3 }} type="submit">
          Login
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginCard;
