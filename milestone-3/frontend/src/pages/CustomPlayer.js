import React from "react";
import { useState } from "react";
import { Typography, Paper, Button, Box, TextField } from "@mui/material";
import { addCustomToPlayer } from "../services/custom";





const CustomPlayerForm = ({ username }) => {

    const addCustomPlayer = async (e) => {
      e.preventDefault();
      const getInsert = await addCustomToPlayer({username,
        cname, age, team, pos, gp, ppg, ast, rpg, spg, bpg, tpg, threept, fg, pf, ft});

        if (getInsert.success){
          console.log("added player successfully")
        } else {
            console.error("failed to add custom player", getInsert.error)
        }

    }


    const [cname, setcname] = useState("");
    const [age, setAge] = useState("");
    const [team, setTeam] = useState("");
    const [pos, setPos] = useState("");
    const [gp, setgp] = useState("");
    const [ppg, setppg] = useState("");
    const [ast, setast] = useState("");
    const [rpg, setrpg] = useState("");
    const [spg, setspg] = useState("");
    const [bpg, setbpg] = useState("");
    const [tpg, settpg] = useState("");
    const [threept, setthreept] = useState("");
    const [fg, setfg] = useState("");
    const [pf, setpf] = useState("");
    const [ft, setft] = useState("");


  return (
    <Paper
      elevation={3}
      sx={{p: 3, width: 700, mx: "auto", mt: 5, height: 500}}
    >
      <Typography variant="h3" align="center" gutterBottom>
        Add your own custom player!
      </Typography>


      {/* add back onSubmit={addCustomPlayer} */}
      <Box component="form" noValidate autoComplete="off" onSubmit={addCustomPlayer}>
        <TextField id="cname" label="Enter a Name" variant="outlined"  value={cname}
          onChange={(e) => setcname(e.target.value)}
        />
        <TextField id="age" label="Enter a Age" type="number" variant="outlined"   value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <TextField id="team" label="Enter a team ie: LAL" type="text" variant="outlined"   value={team}
          onChange={(e) => setTeam(e.target.value)}
          slotProps={{
            htmlInput: {
              maxLength: 3,
              pattern: "[A-Za-z]*"
            }
          }}
        />
      <TextField id="pos" label="Enter a position" type="text" variant="outlined"   value={pos}
          onChange={(e) => setPos(e.target.value)}
          slotProps={{
            htmlInput: {
              maxLength: 2,
              pattern: "[A-Za-z]*"
            }
          }}
        />

        <TextField id="gamesPlayed" label="Enter Games Played" type="number" variant="outlined" value={gp}
          onChange={(e) => setgp(e.target.value)}
        />
        <TextField id="ppg" label="Enter PPG" type="number" variant="outlined" value={ppg}
          onChange={(e) => setppg(e.target.value)}
        />
        <TextField id="ast" label="Enter APG" type="number" variant="outlined" value={ast}
          onChange={(e) => setast(e.target.value)}
        />
        <TextField id="rpg" label="Enter RPG" type="number" variant="outlined" value={rpg}
          onChange={(e) => setrpg(e.target.value)}
        />
        <TextField id="spg" label="Enter SPG" type="number" variant="outlined" value={spg}
          onChange={(e) => setspg(e.target.value)}
        />
        <TextField id="bpg" label="Enter BPG" type="number" variant="outlined" value={bpg}
          onChange={(e) => setbpg(e.target.value)}
        />
        <TextField id="tpg" label="Enter Turnovers/PG" type="number" variant="outlined" value={tpg}
          onChange={(e) => settpg(e.target.value)}
        />

        <TextField id="threept" label="Enter three pointers" type="number" variant="outlined" value={threept}
          onChange={(e) => setthreept(e.target.value)}
        />
        <TextField id="fg" label="Enter field goals" type="number" variant="outlined" value={fg}
          onChange={(e) => setfg(e.target.value)}
        />
        <TextField id="pf" label="Enter fouls" type="number" variant="outlined" value={pf}
          onChange={(e) => setpf(e.target.value)}
        />
        <TextField id="ft" label="Enter Free throws" type="number" variant="outlined" value={ft}
          onChange={(e) => setft(e.target.value)}
        />

        <Button variant="outlined" color="primary" fullWidth sx={{ mt: 3 }} type="submit">
          Submit Player
        </Button>
      </Box>
    </Paper>
  );
};

export default CustomPlayerForm;