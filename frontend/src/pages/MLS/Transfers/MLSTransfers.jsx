// eslint-disable-next-line no-unused-vars
import React from 'react'
import MLSNavbar from '../Navbar/MLSNavbar'
import { Box, Typography,  } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';


const Results = () => {
  return (
    <div>
      <MLSNavbar />
      <Box
        sx={{
          height: '70vh', // Full viewport height
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

        {/* Call to Action Button */}
        {/* <Button
          variant="contained"
          color="warning"
          sx={{
            fontSize: '1.2rem',
            padding: '10px 30px',
          }}
        >
          Notify Me
        </Button> */}
      </Box>
    </div>
  );
}

export default Results