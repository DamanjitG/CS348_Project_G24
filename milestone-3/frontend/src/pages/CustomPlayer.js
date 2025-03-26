import React, { useCallback, useEffect, useState } from 'react'
import { Typography, Paper, Button, Box, TextField, Alert, TableHead, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow, } from '@mui/material'
import { addCustomToPlayer, getCustomPlayers } from '../services/custom'

const CustomPlayerForm = ({ username }) => {
  const [successMessage, setSuccessMessage] = useState(null)

  const [customPlayers, setcustomPlayers] = useState([])




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
      setTimeout(() => setSuccessMessage(null), 3000)
    } else {
      console.error('failed to add custom player', response.error)
    }
  }

  return (
    <>
    <Paper elevation={3} sx={{ p: 3, width: 700, mx: 'auto', mt: 5, height: 500 }}>
      <Typography variant='h3' align='center' gutterBottom>
        Add your own custom player!
      </Typography>

      {successMessage && (
        <Alert severity='success' sx={{ mb: 2 }} onClose={() => setSuccessMessage(null)}>
          {successMessage}
        </Alert>
      )}

      <Box component='form' noValidate autoComplete='off' onSubmit={addCustomPlayer}>
        <TextField name='cname' label='Enter a Name' variant='outlined' />
        <TextField name='age' label='Enter a Age' type='number' variant='outlined' />
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
          label='Enter a position'
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

        <Button variant='outlined' color='primary' fullWidth sx={{ mt: 3 }} type='submit'>
          Submit Player
        </Button>
      </Box>
    </Paper>

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Team</TableCell>
            <TableCell>Position</TableCell>
            <TableCell align='right'>PPG</TableCell>
            <TableCell align='right'>APG</TableCell>
            <TableCell align='right'>RPG</TableCell>
            <TableCell align='right'>SPG</TableCell>
            <TableCell align='right'>BPG</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    

    </>



  )
}

export default CustomPlayerForm