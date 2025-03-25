import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Navbar from './components/Navbar';

// Pages
import Watchlist from './pages/Watchlist';
import Home from './pages/Home';
import Login from './components/Login';
import CustomPlayerForm from './pages/CustomPlayer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#ee6730',
    },
  },
});

function App() {
  const [username, setUsername] = useState("");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {username === "" ? (
        <Login username={username} setUsername={setUsername} />
      ) : (
        <>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home user={username} />} />
              <Route path='/custom' element={<CustomPlayerForm username={username} />} />
              <Route path='/watchlist' element={<Watchlist username={username} />} />
            </Routes>
          </div>{' '}
        </>
      )}
    </ThemeProvider>
  )
}

export default App; 
