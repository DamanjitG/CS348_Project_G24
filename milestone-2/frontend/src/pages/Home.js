import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Typography, Paper, Button, Box } from '@mui/material'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'

const Home = () => {
  return (
    <div>
      <Typography variant='h4' component='h1' gutterBottom>
        Welcome to FantasyBasketball++ ᕙ(▀̿ĺ̯▀̿ ̿)ᕗ
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FormatListBulletedIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
          <Typography variant='h5' component='h2'>
            Manage Your Watchlists
          </Typography>
        </Box>
        
        <Typography variant='body1'>
          Frontend implementation of R8-watchlist.
        </Typography>
        
        <Typography variant='body1'>
          Here is where you can manage your watchlists of basketball players.
        </Typography>
        
        

        <Box sx={{ mt: 3 }}>
          <Button 
            variant='contained' 
            component={RouterLink} 
            to='/watchlist'
            size='large'
          >
            Go to Watchlists
          </Button>
        </Box>
      </Paper>
    </div>
  )
}

export default Home
