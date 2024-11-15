// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Box, Typography, Grid, Card, CardMedia } from '@mui/material';
import image1 from '../assets/main media 1.jpg';
import image2 from '../assets/main media 2.jpg';
import image3 from '../assets/main media 3.jpg';
import image4 from '../assets/main media 4.jpg';
import image5 from '../assets/main media 5.jpg';
import image6 from '../assets/main media 6.jpg';
import image7 from '../assets/main media 7.jpg';
import image8 from '../assets/main media 8.jpg';
import image9 from '../assets/main media 9.jpg';
import image10 from '../assets/main media 10.jpg';
import image11 from '../assets/main media 11.jpg';
import image12 from '../assets/main media 12.jpg';
import image13 from '../assets/main media 13.jpg';
import image14 from '../assets/main media 14.jpg';
import image15 from '../assets/main media 15.jpg';
import image16 from '../assets/main media 16.jpg';
import image17 from '../assets/main media 17.jpg';
import image18 from '../assets/main media 18.jpg';
import image19 from '../assets/main media 19.jpg';
import image20 from '../assets/main media 20.jpg';
// Import additional images similarly...

// Array of imported images for the cards
const imageArray = [image1, image2, image3, image4, image5, image6,image7,image8,image9,image10,image11,image12,image13,image14,image15,image16,image17,image18,image19,image20 /*, add more imports here*/];

// Generate random interval times between 2 and 5 seconds for each card
const intervalTimes = imageArray.map(() => Math.floor(Math.random() * 3000) + 2000);

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(Array(20).fill(0));

  // Change images for each card independently at varying intervals
  useEffect(() => {
    const intervals = currentImageIndex.map((_, i) =>
      setInterval(() => {
        setCurrentImageIndex((prev) => {
          const newIndexes = [...prev];
          newIndexes[i] = (newIndexes[i] + 1) % imageArray.length; // Cycle through images
          return newIndexes;
        });
      }, intervalTimes[i])
    );
    return () => intervals.forEach(clearInterval); // Cleanup intervals on component unmount
  }, []);

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          p: 3,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        {/* Scrolling Text with Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden', whiteSpace: 'nowrap', mb: 4 }}>
          {/* <MTUSPORTSARENALOGO sx={{ fontSize: 60, color: 'blue', mr: 2 }} /> */}
          <Typography
            variant="h4"
            sx={{
              display: 'inline-block',
              fontWeight: 'bold',
              fontFamily: 'monospace',
              animation: 'scrollText 15s linear infinite',
            }}
          >
            Welcome to MTU SPORTS ARENA
          </Typography>
        </Box>

        {/* 20 Animated Image Cards */}
        <Grid container spacing={2} sx={{ maxWidth: 1200 }}>
          {Array.from({ length: 20 }).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardMedia
                  component="img"
                  image={imageArray[currentImageIndex[index]]}
                  alt={`Image ${index + 1}`}
                  sx={{ height: 150 }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* CSS for Scrolling Text Animation */}
      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
