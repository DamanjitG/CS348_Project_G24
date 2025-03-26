import React, { useState } from 'react'
import { Typography, Paper, Button, Box, TextField, Alert } from '@mui/material'
import { addCustomToPlayer } from '../services/custom'

const CustomPlayerForm = ({ username }) => {
  const [successMessage, setSuccessMessage] = useState(null)

  const addCustomPlayer = async e => {
    e.preventDefault()
    const formData = new FormData(e.target)
    formData.append('username', username)

    const response = await addCustomToPlayer(formData)
    if (response.success) {
      setSuccessMessage('Added player successfully')
      e.target.reset()
      setTimeout(() => setSuccessMessage(null), 3000)
    } else {
      console.error('failed to add custom player', response.error)
    }
  }

  return (
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
  )
}

export default CustomPlayerForm