// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { db } from '../../../../../firebaseConfig';  // Adjust the path to your firebase config
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { Box, Button, TextField, Grid, Dialog, DialogContent, Typography, CircularProgress, Alert } from '@mui/material';

const PlayersManagement = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    jersey: '',
    position: '',
    club: '',
    picture: '',
    rating: '',
    goals: 0,
    points: 0,
    assists: 0,
    appearances: 0,
    cleanSheets: 0,
    teamLogo: ''
  });

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const playersCollection = collection(db, 'mblPlayers');
      const playerSnapshot = await getDocs(playersCollection);
      const playersList = playerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPlayers(playersList);
    } catch (error) {
      console.error('Error fetching players:', error);
      setError('Failed to load players.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers(); // Call the fetch function when the component mounts
  }, []);

  const handleOpen = (player) => {
    setSelectedPlayer(player);
    setNewPlayer(player || {
      name: '',
      jersey: '',
      position: '',
      club: '',
      picture: '',
      rating: '',
      goals: 0,
      points: 0,
      assists: 0,
      appearances: 0,
      cleanSheets: 0,
      teamLogo: ''
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPlayer(null);
  };

  const handleChange = (e) => {
    setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
  };

  const handleAddPlayer = async () => {
    try {
      await addDoc(collection(db, 'mblPlayers'), newPlayer);
      handleClose();  // Close the dialog after adding
      fetchPlayers(); // Refresh the players list
    } catch (error) {
      setError('Error adding player: ' + error.message);
    }
  };

  const handleUpdatePlayer = async () => {
    try {
      const playerDoc = doc(db, 'mblPlayers', selectedPlayer.id);
      await updateDoc(playerDoc, newPlayer);
      handleClose();  // Close the dialog after updating
      fetchPlayers(); // Refresh the players list
    } catch (error) {
      setError('Error updating player: ' + error.message);
    }
  };

  const handleDeletePlayer = async (id) => {
    try {
      const playerDoc = doc(db, 'mblPlayers', id);
      await deleteDoc(playerDoc);
      fetchPlayers(); // Refresh the players list
    } catch (error) {
      setError('Error deleting player: ' + error.message);
    }
  };

  return (
    <div>
      <Typography variant="h4" sx={{ padding: 2 }}>Players Management</Typography>
      <Button variant="contained" color="primary" onClick={() => handleOpen(null)}>
        Add Player
      </Button>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={2}>
          {players.map((player) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={player.id}>
              <Box sx={{ border: '1px solid #ccc', padding: 2, borderRadius: 1 }}>
                <Typography variant="h6">{player.name}</Typography>
                <Typography>Club: {player.club}</Typography>
                <Typography>Jersey: {player.jersey}</Typography>
                <Button onClick={() => handleOpen(player)}>Edit</Button>
                <Button onClick={() => handleDeletePlayer(player.id)} color="error">Delete</Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={newPlayer.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Jersey"
            name="jersey"
            value={newPlayer.jersey}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Position"
            name="position"
            value={newPlayer.position}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Club"
            name="club"
            value={newPlayer.club}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Picture URL"
            name="picture"
            value={newPlayer.picture}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Team Logo URL"
            name="teamLogo"
            value={newPlayer.teamLogo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Rating"
            name="rating"
            type="number"
            value={newPlayer.rating}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Goals"
            name="goals"
            type="number"
            value={newPlayer.goals}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {/* <TextField
            label="Points"
            name="goals"
            type="number"
            value={newPlayer.points}
            onChange={handleChange}
            fullWidth
            margin="normal"
          /> */}
          <TextField
            label="Assists"
            name="assists"
            type="number"
            value={newPlayer.assists}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Appearances"
            name="appearances"
            type="number"
            value={newPlayer.appearances}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {newPlayer.position === 'Goalkeeper' && (
            <TextField
              label="Clean Sheets"
              name="cleanSheets"
              type="number"
              value={newPlayer.cleanSheets}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
          )}
          <Button 
            variant="contained" 
            color="primary" 
            onClick={selectedPlayer ? handleUpdatePlayer : handleAddPlayer}
            sx={{ marginTop: 2 }}
          >
            {selectedPlayer ? 'Update Player' : 'Add Player'}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlayersManagement;
