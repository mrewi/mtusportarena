// Import necessary Firebase functions
import React, { useEffect, useState } from 'react';
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../firebaseConfig'; // Adjust path based on your setup
import { Grid, Card, CardContent, Typography, CardMedia, Box, Button, Dialog, DialogContent, TextField, CircularProgress } from '@mui/material';

const FixturesManagement = () => {
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedFixture, setSelectedFixture] = useState(null);
  const [newFixture, setNewFixture] = useState({
    teamA: '',
    teamALogo: '',
    teamB: '',
    teamBLogo: '',
    date: '',
    stadium: '',
    status: '',
    teamAStartingXI: [''],
    teamBStartingXI: ['']
  });

  const fetchFixtures = async () => {
    try {
      const fixturesCollection = collection(db, 'swfFixtures');
      const fixturesSnapshot = await getDocs(fixturesCollection);
      const fixturesList = fixturesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFixtures(fixturesList);
    } catch (error) {
      console.error('Error fetching fixtures:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFixtures();
  }, []);

  const handleOpen = (fixture = null) => {
    if (fixture) {
      // Set newFixture to the selected fixture data, and convert the date to a string if necessary
      setNewFixture({
        ...fixture,
        date: fixture.date.toDate().toISOString().slice(0, 16), // Format the date correctly for datetime-local input
        teamAStartingXI: fixture.teamAStartingXI || [''],
        teamBStartingXI: fixture.teamBStartingXI || [''],
      });
    } else {
      // If no fixture is passed, reset newFixture to empty fields
      setNewFixture({
        teamA: '',
        teamALogo: '',
        teamB: '',
        teamBLogo: '',
        date: '',
        stadium: '',
        status: '',
        teamAStartingXI: [''],
        teamBStartingXI: ['']
      });
    }
    setSelectedFixture(fixture);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFixture(null);
  };

  const handleChange = (e) => {
    setNewFixture({ ...newFixture, [e.target.name]: e.target.value });
  };

  const handleAddStartingXI = (team, value) => {
    setNewFixture((prevState) => ({
      ...prevState,
      [team]: value.split(',')
    }));
  };

  const handleAddFixture = async () => {
    try {
      await addDoc(collection(db, 'swfFixtures'), {
        ...newFixture,
        date: new Date(newFixture.date)
      });
      handleClose();
      fetchFixtures();
    } catch (error) {
      console.error('Error adding fixture:', error);
    }
  };

  const handleUpdateFixture = async () => {
    try {
      const fixtureDoc = doc(db, 'swfFixtures', selectedFixture.id);
      await updateDoc(fixtureDoc, {
        ...newFixture,
        date: new Date(newFixture.date)
      });
      handleClose();
      fetchFixtures();
    } catch (error) {
      console.error('Error updating fixture:', error);
    }
  };

  const handleDeleteFixture = async (id) => {
    try {
      const fixtureDoc = doc(db, 'swfFixtures', id);
      await deleteDoc(fixtureDoc);
      fetchFixtures();
    } catch (error) {
      console.error('Error deleting fixture:', error);
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4">Fixtures Management</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
          Add Fixture
        </Button>
        <Grid container spacing={3} sx={{ padding: 2 }}>
          {fixtures.map((fixture) => (
            <Grid item xs={12} sm={8} md={6} key={fixture.id}>
              <Card sx={{ padding: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 50, height: 50 }}
                      image={fixture.teamALogo}
                      alt={fixture.teamA}
                    />
                    <Typography sx={{ marginLeft: 1 }}>{fixture.teamA}</Typography>
                  </Box>

                  <Typography variant="h6">vs</Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CardMedia
                      component="img"
                      sx={{ width: 50, height: 50 }}
                      image={fixture.teamBLogo}
                      alt={fixture.teamB}
                    />
                    <Typography sx={{ marginLeft: 1 }}>{fixture.teamB}</Typography>
                  </Box>
                </Box>
                <CardContent>
                  <Typography>{new Date(fixture.date.seconds * 1000).toLocaleString()}</Typography>
                  <Typography>Stadium: {fixture.stadium}</Typography>
                  <Typography>Status: {fixture.status}</Typography>
                </CardContent>
                <Button onClick={() => handleOpen(fixture)}>Edit</Button>
                <Button onClick={() => handleDeleteFixture(fixture.id)} color="error">Delete</Button>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <TextField
              label="Team A"
              name="teamA"
              value={newFixture.teamA}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Team A Logo URL"
              name="teamALogo"
              value={newFixture.teamALogo}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Team B"
              name="teamB"
              value={newFixture.teamB}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Team B Logo URL"
              name="teamBLogo"
              value={newFixture.teamBLogo}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Date and Time"
              name="date"
              type="datetime-local"
              value={newFixture.date}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Stadium"
              name="stadium"
              value={newFixture.stadium}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Status"
              name="status"
              value={newFixture.status}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />

             {/* Starting XI Input */}
             <TextField
              label="Team A Starting XI (comma separated)"
              name="teamAStartingXI"
              value={newFixture.teamAStartingXI.join(', ')}
              onChange={(e) => handleAddStartingXI('teamAStartingXI', e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Team B Starting XI (comma separated)"
              name="teamBStartingXI"
              value={newFixture.teamBStartingXI.join(', ')}
              onChange={(e) => handleAddStartingXI('teamBStartingXI', e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={selectedFixture ? handleUpdateFixture : handleAddFixture}
              sx={{ marginTop: 2 }}
            >
              {selectedFixture ? 'Update Fixture' : 'Add Fixture'}
            </Button>
          </DialogContent>
        </Dialog>
      </Box>
    </div>
  );
};

export default FixturesManagement;
