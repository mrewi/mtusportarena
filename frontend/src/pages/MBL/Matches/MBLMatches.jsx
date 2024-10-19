// Import necessary Firebase functions
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig'; // Adjust path based on your setup
import { Grid, Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
import MBLNavbar from '../Navbar/MBLNavbar';

const Fixtures = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const fixturesCollection = collection(db, 'mblFixtures'); // Replace 'mlsFixtures' with your collection name
        const fixturesSnapshot = await getDocs(fixturesCollection);
        const fixturesList = fixturesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setFixtures(fixturesList);
      } catch (error) {
        console.error('Error fetching fixtures:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, []);

  if (loading) return <p>Loading fixtures...</p>;

  return (
    <div>
      <MBLNavbar />
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
        <Grid container spacing={3} justifyContent="center">
          {fixtures.map((fixture) => (
            <Grid item xs={12} sm={8} md={6} key={fixture.id}> {/* Center the cards */}
              <Card sx={{ padding: 2, height:'10rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  
                  {/* Team A logo and name */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 80, height: 80, objectFit: 'contain' }} // Adjust logo size
                      image={fixture.teamALogo}
                      alt={`${fixture.teamA} logo`}
                    />
                    <Typography variant="body1" sx={{ marginTop: 1 }}>{fixture.teamA}</Typography> {/* Team A Name */}
                  </Box>

                  {/* "vs" Text in the middle */}
                  <Typography variant="h6" sx={{ marginX: 2 }}>
                    vs
                  </Typography>

                  {/* Team B logo and name */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 80, height: 80, objectFit: 'contain' }} // Adjust logo size
                      image={fixture.teamBLogo}
                      alt={`${fixture.teamB} logo`}
                    />
                    <Typography variant="body1" sx={{ marginTop: 1 }}>{fixture.teamB}</Typography> {/* Team B Name */}
                  </Box>
                </Box>

                {/* Fixture details below */}
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="body1">
                    {new Date(fixture.date.seconds * 1000).toLocaleString()}
                  </Typography>
                  <Typography variant="body2">
                    Stadium: {fixture.stadium}
                  </Typography>
                  <Typography variant="body2">
                    Status: {fixture.status}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Fixtures;
