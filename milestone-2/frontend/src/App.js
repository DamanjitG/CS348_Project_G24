import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Navbar from './components/Navbar';
import LoginCard from './pages/Login';

// Pages
import Watchlist from './pages/Watchlist';
import Home from './pages/Home';
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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginCard />} />
          <Route path="/custom" element={<CustomPlayerForm />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App; 
