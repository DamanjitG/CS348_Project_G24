import React from "react";
import { useState } from "react";
import { Typography, Paper, Button, Box, TextField } from "@mui/material";






const CustomPlayerForm = () => {

    // const addCustomPlayer = async() => {

    //     const getInsert = await insertCustomPlayer();

    //     if (getInsert.success){

    //     } else {
            
    //     }

    // }


    const [cname, setcname] = useState("");
    const [age, setAge] = useState("");
    const [team, setTeam] = useState("");

  return (
    <Paper
      elevation={3}
      sx={{p: 3, width: 700, mx: "auto", mt: 5, height: 800}}
    >
      <Typography variant="h3" align="center" gutterBottom>
        Add your own custom player!
      </Typography>


      {/* add back onSubmit={addCustomPlayer} */}
      <Box component="form" noValidate autoComplete="off">
        <TextField id="cname" label="Enter a Name" variant="outlined"  value={cname}
          onChange={(e) => setcname(e.target.value)}
        />
        <TextField id="age" label="Enter a Age" type="number" variant="outlined"   value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <TextField id="team" label="Enter a team" type="text" variant="outlined"   value={team}
          onChange={(e) => setTeam(e.target.value)}
        />

        <Button variant="outlined" color="primary" fullWidth sx={{ mt: 3 }} type="submit">
          Submit Player
        </Button>
      </Box>
    </Paper>
  );
};

export default CustomPlayerForm;