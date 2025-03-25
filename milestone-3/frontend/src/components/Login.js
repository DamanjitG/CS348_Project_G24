import React from "react";
import { Typography, Paper, Button, Box, TextField } from "@mui/material";
import { loginUser } from "../services/auth";

const LoginCard = ({ username, setUsername }) => {
  const getLogin = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const getLoginResult = await loginUser(formData.get('username'), formData.get('password'));
    
    if (getLoginResult.success) {
      setUsername(formData.get('username'));
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 300, mx: 'auto', mt: 5 }}>
      <Typography variant='h3' align='center' gutterBottom>
        Login
      </Typography>

      <Box component='form' noValidate autoComplete='off' onSubmit={getLogin}>
        <TextField
          name='username'
          label='Enter Username'
          variant='outlined'
          margin='dense'
          fullWidth
          defaultValue={username}
        />
        <TextField
          name='password'
          label='Enter Password'
          type='password'
          variant='outlined'
          margin='normal'
          fullWidth
        />
        <Button variant='outlined' color='primary' fullWidth sx={{ mt: 3 }} type='submit'>
          Login
        </Button>
      </Box>
    </Paper>
  )
};

export default LoginCard;
