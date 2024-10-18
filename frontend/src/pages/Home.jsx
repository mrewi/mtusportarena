// eslint-disable-next-line no-unused-vars
import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Box, Typography, Button } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Box
        sx={{
          height: '100vh', // Full viewport height
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f5f5f5', // Light background color
          textAlign: 'center',
        }}
      >
        {/* Warning Icon */}
        <WarningAmberIcon sx={{ fontSize: 100, color: 'orange', mb: 3 }} />

        {/* Coming Soon Text */}
        <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
          Coming Soon!
        </Typography>

        {/* Subtext */}
        <Typography variant="h6" sx={{ mb: 4 }}>
          We’re working hard to bring something amazing. Stay tuned!
        </Typography>
      </Box>
    </div>
  );
};

export default Home;
