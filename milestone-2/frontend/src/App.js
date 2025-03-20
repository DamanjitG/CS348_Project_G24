import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Navbar from './components/Navbar';
import LoginCard from './pages/Login';

// Pages
import Watchlist from './pages/Watchlist';
import Home from './pages/Home';

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

  const [user, setUser] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home  user={user} />} />
          <Route path="/login" element={<LoginCard setUser={setUser}/>} />
          <Route path="/watchlist" element={<Watchlist user={user} />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App; 
