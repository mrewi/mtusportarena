import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import {
  Grid, Card, CardContent, Typography, CardMedia, Box,
  Modal, Button, CircularProgress
} from '@mui/material';
import MBLNavbar from '../Navbar/MBLNavbar';

const Fixtures = () => {
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
        const fixturesList = fixturesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Sort fixtures by date (ascending order)
        fixturesList.sort((a, b) => a.date.seconds - b.date.seconds);

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
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: 'center', padding: 2 }}>
          <Typography color="error" variant="body1">{error}</Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ textAlign: 'center', padding: 2 }}>
            <Typography variant="h4" gutterBottom>Round 1</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <Grid container spacing={3} justifyContent="center">
              {fixtures.map((fixture) => (
                <Grid item xs={12} key={fixture.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Card sx={{ padding: 2, width: '30rem', fontFamily: 'Roboto Mono, monospace', textAlign: 'center' }}>
                    <Box onClick={() => handleOpenModal(fixture)} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Team A logo and name */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <CardMedia
                          component="img"
                          sx={{ width: 100, height: 100, objectFit: 'contain' }}
                          image={fixture.teamALogo}
                          alt={`${fixture.teamA} logo`}
                        />
                        <Typography variant="body1" sx={{ marginTop: 1 }}>{fixture.teamA}</Typography>
                      </Box>

                      {/* "vs" Text in the middle */}
                      <Typography variant="h6" sx={{ marginX: 2 }}>vs</Typography>

                      {/* Team B logo and name */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <CardMedia
                          component="img"
                          sx={{ width: 80, height: 80, objectFit: 'contain' }}
                          image={fixture.teamBLogo}
                          alt={`${fixture.teamB} logo`}
                        />
                        <Typography variant="body1" sx={{ marginTop: 1 }}>{fixture.teamB}</Typography>
                      </Box>
                    </Box>

                    {/* Fixture details below */}
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography variant="body1">
                        {new Date(fixture.date.seconds * 1000).toLocaleString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true
                        })}
                      </Typography>
                      <Typography variant="body2">Stadium: {fixture.stadium}</Typography>
                      <Typography variant="body2">Status: {fixture.status}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}

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
            {/* Header with Match Info */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center', color: '#333' }}>
              Match Details
            </Typography>
            
            {/* Logos, Team Names, and StartingV */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
              <Box sx={{ textAlign: 'center' }}>
                <CardMedia
                  component="img"
                  image={selectedFixture.teamALogo}
                  alt={`${selectedFixture.teamA} logo`}
                  sx={{ width: 80, height: 80, objectFit: 'contain' }}
                />
                <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>{selectedFixture.teamA}</Typography>
                {/* Starting XI for Team A */}
                <Typography variant="body2" sx={{ mt: 1 }}>Starting V:</Typography>
                {selectedFixture.teamAStartingV?.map((player, index) => (
                  <Typography variant="body2" key={index}>{player}</Typography>
                ))}
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
                {/* Starting XI for Team B */}
                <Typography variant="body2" sx={{ mt: 1 }}>Starting V:</Typography>
                {selectedFixture.teamBStartingV?.map((player, index) => (
                  <Typography variant="body2" key={index}>{player}</Typography>
                ))}
              </Box>
            </Box>

            {/* Close Button */}
            <Button onClick={handleCloseModal} sx={{ mt: 4, fontWeight: 'bold', color: '#1976d2', fontFamily: 'Roboto Mono, monospace' }}>
              Close
            </Button>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default Fixtures;
