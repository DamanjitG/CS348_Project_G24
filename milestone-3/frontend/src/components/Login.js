import React, { useState } from "react";
import { Typography, Paper, Button, Box, TextField } from "@mui/material";
import { loginUser, registerUser } from "../services/auth";

const LoginCard = ({ username, setUsername }) => {
  const [register, setregister] = useState(true)


  const getLogin = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const getLoginResult = await loginUser(formData.get('username'), formData.get('password'));
    
    if (getLoginResult.success) {
      setUsername(formData.get('username'));
    }
  }

  const doRegister = async e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const username = formData.get("username")
    const password = formData.get("password")
    console.log("Username:", username);
    console.log("Password:", password);
    const response = await registerUser(username, password)
    if (response.success){
      console.log("USER has been REGISTERED!!!")
      e.target.reset()
      setregister(true)
    } else {
      console.error("failed to REGISTER!!", response.error)
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 300, mx: 'auto', mt: 5 }}>
      {register ? (
        <Typography variant='h3' align='center' gutterBottom>
        Login
      </Typography>
      ) : (
        <Typography variant='h3' align='center' gutterBottom>
        Register
      </Typography>
      )}
      

      <Box component='form' noValidate autoComplete='off' onSubmit={register? getLogin : doRegister}>
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
        {register ? (
          <div>
           <Button variant='contained' color='primary' fullWidth sx={{ mt: 3 }} type='submit'>
          Login
        </Button> 
        <Button variant='contained' color='primary' fullWidth sx={{ mt: 3 }} type='submit' onClick={() => setregister(false)}>
          Not Registered?
        </Button>
          </div>
        ) : (
        <Button variant='contained' color='primary' fullWidth sx={{ mt: 3 }} type='submit'>
          Register
        </Button>)}
      </Box>
    </Paper>
  )
};

export default LoginCard;
