import React, { useCallback, useEffect, useState } from 'react'
import { Typography, Paper, Button, Box, TextField, Alert, TableHead, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow, } from '@mui/material'
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { addCustomToPlayer, getCustomPlayers } from '../services/custom'

const CustomPlayerForm = ({ username }) => {
  const [successMessage, setSuccessMessage] = useState(null)
  const [failMessage, setFailMessage] = useState(null)

  const [customPlayers, setcustomPlayers] = useState([])

  const [sortType, setSortType] = useState(null)
  const [sortDir, setSortDir] = useState(null)


  const setSort = (category) => {

    let dir = "desc";

    if (sortType === category){
      dir = sortDir === "desc" ? 'asc' : 'desc' 
    }
    setSortType(category)
    setSortDir(dir)

    const sortedCustomPlayers = [...customPlayers].sort((a,b) => {
      if (a[category] > b[category]){
        if (dir === 'desc'){
          return -1;
        } else {
          return 1;
        }
      } else if (a[category] < b[category]){
        if (dir === 'desc'){
          return 1;
        } else {
          return -1
        }
      } else {
        return 0;
      }
    })
    setcustomPlayers(sortedCustomPlayers)
  }

  const getReqCustomPlayers = useCallback(async () => {
    const response = await getCustomPlayers(username)
    if (response.success){
      console.log('The custom players are:', response.custom_players)
      setcustomPlayers(response.custom_players)
    } else {
      console.log("Custom players: ERROR FETCHING", response.error)
    }
  }, [username])

  useEffect(() => {
    getReqCustomPlayers();
  }, [getReqCustomPlayers]);

  const addCustomPlayer = async e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.append('username', username)

    const response = await addCustomToPlayer(formData)
    if (response.success) {
      setSuccessMessage('Added player successfully')
      e.target.reset()
      getReqCustomPlayers()
      setTimeout(() => setSuccessMessage(null), 5000)
    } else {
      console.error('failed to add custom player', response.error)
      setFailMessage('Could not add player: Invalid stats')
      setTimeout(() => setFailMessage(null), 5000)
    }
  }

  return (
    <div>
    <Paper elevation={3} sx={{ p: 3, width: 700, mx: 'auto', mt: 5, height: 500 }}>
      <Typography variant='h3' align='center' gutterBottom>
        Add your own custom player!
      </Typography>

      {successMessage && (
        <Alert severity='success' sx={{ mb: 2 }} onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

      {failMessage && (
        <Alert severity='error' sx={{ mb: 2 }} onClose={() => setFailMessage(null)}>
          {failMessage}
        </Alert>
      )}

      <Box component='form' noValidate autoComplete='off' onSubmit={addCustomPlayer}>
        <TextField name='cname' label='Enter a Full Name' variant='outlined' />
        <TextField name='age' label='Enter an Age' type='number' variant='outlined' />
        <TextField
          name='team'
          label='Enter a team ie: LAL'
          type='text'
          variant='outlined'
          slotProps={{
            htmlInput: {
              maxLength: 3,
              pattern: '[A-Za-z]*'
            }
          }}
        />
        <TextField
          name='pos'
          label='Enter a position ie: PG|SF|C'
          type='text'
          variant='outlined'
          slotProps={{
            htmlInput: {
              maxLength: 2,
              pattern: '[A-Za-z]*'
            }
          }}
        />
        <TextField name='gamesPlayed' label='Enter Games Played' type='number' variant='outlined' />
        <TextField name='ppg' label='Enter PPG' type='number' variant='outlined' />
        <TextField name='ast' label='Enter APG' type='number' variant='outlined' />
        <TextField name='rpg' label='Enter RPG' type='number' variant='outlined' />
        <TextField name='spg' label='Enter SPG' type='number' variant='outlined' />
        <TextField name='bpg' label='Enter BPG' type='number' variant='outlined' />
        <TextField name='tpg' label='Enter Turnovers/G' type='number' variant='outlined' />
        <TextField name='threept' label='Enter three pointers' type='number' variant='outlined' />
        <TextField name='fg' label='Enter field goals' type='number' variant='outlined' />
        <TextField name='pf' label='Enter fouls' type='number' variant='outlined' />
        <TextField name='ft' label='Enter Free throws' type='number' variant='outlined' />

        <Button variant='contained' color='primary' fullWidth sx={{ mt: 3 }} type='submit'>
          Submit Player
        </Button>
      </Box>
    </Paper>

    {customPlayers.length === 0 ? (
      
        <Typography variant='h2' align='center'>You have not made any custom players</Typography>
      
    ) : (
    <TableContainer sx={{ fontSize: '3rem', mt: '50px' }}component={Paper} align="center">{username}'s Custom Players <span style={{ fontSize: '1rem' }}> - Click the blue stats to filter</span>
      <Table> 
        <TableHead align='right' >
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Position</TableCell>
            <TableCell align='right' sx={{color: "blue", cursor: "pointer"}} onClick={() => setSort("pts")}>PPG {sortType === 'pts' ? (sortDir === 'desc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : ''}</TableCell>
            <TableCell align='right' sx={{color: "blue", cursor: "pointer"}} onClick={() => setSort("ast")}>APG {sortType === 'ast' ? (sortDir === 'desc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : ''}</TableCell>
            <TableCell align='right' sx={{color: "blue", cursor: "pointer"}} onClick={() => setSort("trb")}>RPG {sortType === 'trb' ? (sortDir === 'desc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : ''}</TableCell>
            <TableCell align='right' sx={{color: "blue", cursor: "pointer"}} onClick={() => setSort("stl")}>SPG {sortType === 'stl' ? (sortDir === 'desc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : ''}</TableCell>
            <TableCell align='right' sx={{color: "blue", cursor: "pointer"}} onClick={() => setSort("blk")}>BPG {sortType === 'blk' ? (sortDir === 'desc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : ''}</TableCell>
            <TableCell align='right' sx={{color: "blue", cursor: "pointer"}} onClick={() => setSort("fantasy")}>Fantasy {sortType === 'fantasy' ? (sortDir === 'desc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />) : ''}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody onClick={() => setSort("")}>
          {customPlayers.map((player) => (
            <TableRow key={player.pid}>
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.team}</TableCell>
              <TableCell>{player.pos}</TableCell>
              <TableCell align='right'>{player.pts}</TableCell>
              <TableCell align='right'>{player.ast}</TableCell>
              <TableCell align='right'>{player.trb}</TableCell>
              <TableCell align='right'>{player.stl}</TableCell>
              <TableCell align='right'>{player.blk}</TableCell>
              <TableCell align='right'>{ (player.fantasy).toFixed(1)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
  }
    

    </div>



  )
}

export default CustomPlayerForm