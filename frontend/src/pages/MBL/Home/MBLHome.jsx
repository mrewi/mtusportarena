import React, { useState, useEffect } from 'react';
import BasketballMedia1 from '../assets/basketball home media 5.jpg'
// import BasketballMedia4 from '../assets/Screenshot 2024-11-05 224839.png'
import BasketballMedia2 from '../assets/highlight1 home.jpg'

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import {
  Grid, Card, CardContent, Typography, CardMedia, Box,
  Paper, Modal, CircularProgress, Button
} from '@mui/material';
import MBLNavbar from '../Navbar/MBLNavbar';

const Home = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [selectedFixture, setSelectedFixture] = useState(null);

  const handleOpenModal = (fixture) => {
    setSelectedFixture(fixture);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const fixturesCollection = collection(db, 'mblFixtures');
        const fixturesSnapshot = await getDocs(fixturesCollection);
        const fixturesList = fixturesSnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data(),
          date: doc.data().date.toDate()  // Convert Firebase Timestamp to Date object
        }));

        // Sort fixtures by date (ascending order)
        fixturesList.sort((a, b) => a.date - b.date);  // Sorting the fixtures by date (earliest first)
        
        setFixtures(fixturesList);
      } catch (error) {
        console.error('Error fetching fixtures:', error);
        setError('Failed to load fixtures.');
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  return (
    <div>
      <MBLNavbar />
      <Box sx={{ p: 3, fontFamily: 'Roboto Mono, monospace' }}>
        <Grid container spacing={3}>
          {/* Main Media Card */}
          <Grid item xs={12} md={8}>
            <Card sx={{ position: 'relative', height: 400 }}>
              <CardMedia
                component="img"
                height="400"
                image={BasketballMedia1}  // Sample basketball image
                alt="Basketball Media"
              />
              <CardContent
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  color: 'white',
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  width: '100%',
                  p: 3,
                }}
              >
                <Typography variant="h4" sx={{fontWeight:'bold', fontFamily:'roberto mono, monospace'}}>FULL FOCUS: 5 TEAMS. 4 GAMES</Typography>
                <Typography variant="h8" sx={{ fontFamily:'roberto mono, monospace', width:'10%'}}>
                From stellar performances to jaw-dropping highlights, every team gets in on the fun.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Fixtures Section */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Upcoming Fixtures
              </Typography>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                  <CircularProgress />
                </Box>
              ) : error ? (
                <Typography color="error" variant="body1" align="center">
                  {error}
                </Typography>
              ) : (
                fixtures.map((fixture) => (
                  <Card
                    key={fixture.id}
                    sx={{ display: 'flex', alignItems: 'center', mb: 1, cursor: 'pointer' }}
                    onClick={() => handleOpenModal(fixture)}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 40, height: 40, mr: 2 }}
                      image={fixture.teamALogo}
                      alt={`${fixture.teamA} logo`}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography variant="body1">{fixture.teamA} vs {fixture.teamB}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {/* Format and display the fixture date */}
                        {new Date(fixture.date).toLocaleString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true
                        })}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Highlights Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Highlights
          </Typography>
          <Grid container spacing={3}>
            {/* Each highlight card */}
            {[1, 2, 3, 4].map((highlight) => (
              <Grid item xs={12} sm={6} md={3} key={highlight}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={BasketballMedia2} // Sample image for highlights
                    alt="Highlight"
                  />
                  <CardContent>
                    <Typography variant="body2">
                      Highlight description goes here. Game-changing moments, best plays, and more!
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Modal for Fixture Details */}
      {selectedFixture && (
        <Modal open={openModal} onClose={handleCloseModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box
            sx={{
              width: 400,
              bgcolor: 'background.paper',
              p: 4,
              boxShadow: 24,
              borderRadius: 2,
              fontFamily: 'Roboto Mono, monospace',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center', color: '#333' }}>
              Match Details
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <CardMedia
                  component="img"
                  image={selectedFixture.teamALogo}
                  alt={`${selectedFixture.teamA} logo`}
                  sx={{ width: 80, height: 80, objectFit: 'contain' }}
                />
                <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>{selectedFixture.teamA}</Typography>
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mx: 2, color: '#888' }}>vs</Typography>
              <Box sx={{ textAlign: 'center' }}>
                <CardMedia
                  component="img"
                  image={selectedFixture.teamBLogo}
                  alt={`${selectedFixture.teamB} logo`}
                  sx={{ width: 80, height: 80, objectFit: 'contain' }}
                />
                <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>{selectedFixture.teamB}</Typography>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ mt: 2 }}>
              {new Date(selectedFixture.date).toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
              })}
            </Typography>
            <Button onClick={handleCloseModal} sx={{ mt: 3, color: '#1976d2', fontWeight: 'bold' }}>
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Home;
