// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Box, Typography, Card, CardMedia,  Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
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
import modal1 from '../assets/modal1.jpg';
import modal2 from '../assets/modal2.jpg';
import modal3 from '../assets/modal3.jpg';
import modal4 from '../assets/modal4.jpg';
import modal5 from '../assets/modal5.jpg';


const imageArray = [
  image1, image2, image3, image4, image5, image6,
  image7, image8, image9, image10, image11, image12,
  image13, image14, image15, image16, image17, image18,
  image19, image20
];

const intervalTimes = imageArray.map(() => Math.floor(Math.random() * 3000) + 2000);

const textSlides = [
  'Welcome to MTU Sports Arena – where champions are made.',
  'Train hard, play harder. Excellence through sports.',
  'Student Week is coming — Get Ready!',
  'Convo Week Tournaments – It’s not just a game.',
  'We rise by lifting others — both on and off the field.',
  'Join a team. Join a legacy. #MTUFamily'
];
const modalImages = [modal1, modal2, modal3, modal4, modal5];


const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(Array(20).fill(0));
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(true);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Modal navigation handlers
  const handleNextImage = () => {
    setModalImageIndex((prev) => (prev + 1) % modalImages.length);
  };

  const handlePrevImage = () => {
    setModalImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length);
  };

  // Main slideshow and text slides
  useEffect(() => {
    const imgInterval = setInterval(() => {
      setMainImageIndex((prev) => (prev + 1) % imageArray.length);
    }, 4000);

    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % textSlides.length);
    }, 5000);

    return () => {
      clearInterval(imgInterval);
      clearInterval(textInterval);
    };
  }, []);

  // Grid of changing images
  useEffect(() => {
    const intervals = currentImageIndex.map((_, i) =>
      setInterval(() => {
        setCurrentImageIndex((prev) => {
          const newIndexes = [...prev];
          newIndexes[i] = (newIndexes[i] + 1) % imageArray.length;
          return newIndexes;
        });
      }, intervalTimes[i])
    );

    return () => {
      intervals.forEach(clearInterval);
    };
  }, []);

  return (
    <div>
      <Navbar />
      

      {/* Slideshow + Text Row */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          p: 3,
          backgroundColor: '#f5f5f5',
          minHeight: '80vh',
          gap: 4,
        }}
      >
        {/* Slideshow Left */}
        <Box sx={{ flex: 1, maxWidth: 800 }}>
          <Card>
            <CardMedia
              component="img"
              image={imageArray[mainImageIndex]}
              alt="Main Slideshow"
              sx={{ height: { xs: 200, md: 400 }, objectFit: 'cover' }}
            />
          </Card>
        </Box>

        {/* Text Slide Right */}
        <Box sx={{ flex: 1, maxWidth: 500 }}>
          <Typography variant="h5" sx={{ fontFamily: 'monospace', mb: 2 }}>
            {textSlides[currentTextIndex]}
          </Typography>
        </Box>
      </Box>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
  <Box
    sx={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'transparent',
      outline: 'none',
      zIndex: 9999,
    }}
  >
    <Box sx={{ position: 'relative', display: 'inline-block' }}>
      {/* Image */}
      <CardMedia
        component="img"
        image={modalImages[modalImageIndex]}
        alt={`Slide ${modalImageIndex + 1}`}
        sx={{
          maxWidth: '90vw',
          maxHeight: '90vh',
          borderRadius: 2,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        }}
      />

      {/* Close Button */}
      <IconButton
        onClick={() => setModalOpen(false)}
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.6)',
          '&:hover': { backgroundColor: 'rgba(255,0,0,0.8)' },
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Left Arrow */}
      <IconButton
        onClick={handlePrevImage}
        sx={{
          position: 'absolute',
          top: '50%',
          left: -40,
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.6)',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.9)' },
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        onClick={handleNextImage}
        sx={{
          position: 'absolute',
          top: '50%',
          right: -40,
          transform: 'translateY(-50%)',
          color: 'white',
          backgroundColor: 'rgba(0,0,0,0.6)',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.9)' },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
      <Typography
  sx={{
    position: 'absolute',
    top: 50,
    right: -30,
    color: 'white',
    fontSize: '0.9rem',
    fontFamily: 'monospace',
    animation: 'pulse 2s infinite',
  }}
>
  ⬆ Tap to close
</Typography>

    </Box>
  </Box>
</Modal>


      <style>
        {`
          @keyframes scrollText {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
             @keyframes pulse {
                0% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.1); }
                100% { opacity: 0.6; transform: scale(1); }
              }
        `}
      </style>
    </div>
  );
};

export default Home;
