import React from "react";
import { useState } from "react";
import { Typography, Paper, Button, Box, TextField } from "@mui/material";
import { loginUser } from "../services/auth";

const LoginCard = () => {


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  return (
    <Paper
      elevation={3}
      sx={{p: 3, maxWidth: 300, mx: "auto", mt: 5,
      }}
    >
      <Typography variant="h3" align="center" gutterBottom>
        Login
      </Typography>

      <Box component="form" noValidate autoComplete="off">
        <TextField id="username" label="Enter Username" variant="outlined" margin="dense" fullWidth value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField id="password" label="Enter Password" type="password" variant="outlined" margin="normal" fullWidth value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="outlined" color="primary" fullWidth sx={{ mt: 3 }} type="submit">
          Register
        </Button>
      </Box>
    </Paper>
  );
};

export default LoginCard;
