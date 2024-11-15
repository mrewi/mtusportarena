// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import BasketballMedia1 from '../assets/basketball home media 1.jpg';
import BasketballMedia2 from '../assets/basketball home media 2.jpg';
import BasketballMedia3 from '../assets/basketball home media 3.jpg';
import BasketballMedia4 from '../assets/basketball home media 4.jpg';
import BasketballMedia5 from '../assets/basketball home media 5.jpg';
import BasketballMedia6 from '../assets/basketball home media 6.jpg';
import BasketballMedia7 from '../assets/basketball home media 7.jpg';
import BasketballMedia8 from '../assets/basketball home media 8.jpg';
import BasketballMedia9 from '../assets/basketball home media 9.jpg';
import BasketballMedia10 from '../assets/basketball home media 10.jpg';
import BasketballMedia11 from '../assets/basketball home media 11.jpg';
import BasketballMedia12 from '../assets/basketball home media 12.jpg';
import FaceOfTheWeek from '../Clubs/AbialaBucks/bucks.png';
import PlayerOfTheWeek from '../Clubs/AbialaBucks/bucks.png';
import CoachOfTheWeek from '../Clubs/AbialaBucks/bucks.png';
import DunkOfTheWeek from '../Clubs/AbialaBucks/bucks.png';
import RookieOfTheWeek from '../Clubs/YoungPelicans/pelicans.png';
// import TeamOfTheWeek1 from '../assets/teamof the week1.png';
import BasketballMediaHighlight1 from '../assets/basketball media highlight 1.jpg';
import BasketballMediaHighlight2 from '../assets/basketball media highlight 2.jpg';
import BasketballMediaHighlight3 from '../assets/basketball media highlight 3.jpg';
import BasketballMediaHighlight4 from '../assets/basketball media highlight 4.jpg';
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
  const [openPlayerModal, setOpenPlayerModal] = useState(true);  // Show "Player of the Week" modal on page load
  const [openFixtureModal, setOpenFixtureModal] = useState(false);  // Fixture details modal
  const [selectedFixture, setSelectedFixture] = useState(null);

  const playerImages = [
    { image: PlayerOfTheWeek, label: "Player of the Week: Dabira" },
    { image: CoachOfTheWeek, label: "Coach of the Week: Coach Keku" },
    { image: RookieOfTheWeek, label: "Rookie of the Week: Chicago" },
    { image: DunkOfTheWeek, label: "Dunk of the Week: Dabira" },
    { image: FaceOfTheWeek, label: "Face of the Week: Coach Ewi" }
  ];
  // const teamOfTheWeekImage = TeamOfTheWeek1;

  const images = [BasketballMedia1,BasketballMedia2,BasketballMedia3,BasketballMedia4,BasketballMedia5,BasketballMedia6,BasketballMedia7,BasketballMedia8,BasketballMedia9,BasketballMedia10,BasketballMedia11,BasketballMedia12];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(intervalId);
  }, [images.length]);

  const handleOpenFixtureModal = (fixture) => {
    setSelectedFixture(fixture);
    setOpenFixtureModal(true);
  };

  const handleClosePlayerModal = () => setOpenPlayerModal(false);
  const handleCloseFixtureModal = () => setOpenFixtureModal(false);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const fixturesCollection = collection(db, 'mblFixtures');
        const fixturesSnapshot = await getDocs(fixturesCollection);
        const fixturesList = fixturesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date.toDate()
        }));

        fixturesList.sort((a, b) => a.date - b.date);
        
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
        
      <Modal
        open={openPlayerModal}
        onClose={handleClosePlayerModal}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflowY: 'auto',  // Allow vertical scrolling for the entire modal on smaller screens
        }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            p: { xs: 2, sm: 4 },  // Responsive padding
            borderRadius: 2,
            boxShadow: 24,
            textAlign: 'center',
            maxHeight: '90vh',  // Limit height to 90% of viewport height for better fit
            overflowY: 'auto',  // Allow scrolling within the box if content is too long
            width: { xs: '90%', sm: '80%', md: '60%' },  // Responsive width
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>Weekly Awards</Typography>
          <Grid container spacing={2}>
            {playerImages.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia component="img" height="140" image={item.image} alt={item.label} />
                  <CardContent>
                    <Typography variant="body1">{item.label}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Button onClick={handleClosePlayerModal} variant="contained" color="primary" sx={{ mt: 2 }}>Close</Button>
        </Box>
      </Modal>


        <Grid container spacing={3}>
          {/* Main Media Card with Slideshow */}
          <Grid item xs={12} md={8}>
            <Card sx={{ position: 'relative', height: 400 }}>
              <CardMedia component="img" height="400" image={images[currentImageIndex]} alt="Football Media" />
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
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontFamily: 'Roboto Mono, monospace' }}>
                  FULL FOCUS: 5 TEAMS. 4 GAMES
                </Typography>
                <Typography variant="subtitle1" sx={{ fontFamily: 'Roboto Mono, monospace' }}>
                Triple-Double Magic! UTIBE puts up an incredible triple-double performance, leading ADESHINA HAWKS with points, rebounds, and assists to secure a dominant win over their rivals.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Fixtures Section */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" sx={{ mb: 1, fontFamily:'robeto mono, monospace' }}>
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
                    onClick={() => handleOpenFixtureModal(fixture)}
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
            {[
              { image: BasketballMediaHighlight1, description: "Huge Dunk! UTIBE throws it down as ABIALA BUCKS rallies late" },
              { image: BasketballMediaHighlight2, description: "Buzzer-Beater! JACHI sinks a three to win it for OLURIN HORNETS" },
              { image: BasketballMediaHighlight3, description: "Lockdown Defense! YOUNG PELICANS forces 10 turnovers, cruising to a win." },
              { image: BasketballMediaHighlight4, description: "Triple-Double! DABIRA’s all-around game powers ABIALA BUCKS to a big win." },
            ].map((highlight, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card>
                  <CardMedia component="img" height="200" image={highlight.image} alt="Highlight" />
                  <CardContent>
                    <Typography variant="body2">
                      {highlight.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Modal for Fixture Details */}
        {selectedFixture && (
          <Modal open={openFixtureModal} onClose={handleCloseFixtureModal} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
              <Button onClick={handleCloseFixtureModal} variant="contained" color="primary" sx={{ mt: 2 }}>Close</Button>
            </Box>
          </Modal>
        )}

        {/* Team of the Week Section
        <Box sx={{ mt: 5, mb: 5 }}>
          <Typography variant="h4" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            Team of the Week
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CardMedia component="img" image={teamOfTheWeekImage} alt="Team of the Week" sx={{ maxWidth: '50%', height: 'auto' }} />
          </Box>
        </Box> */}
      </Box>
    </div>
  );
};

export default Home;
