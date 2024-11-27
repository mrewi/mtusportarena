// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import MBLNavbar from '../Navbar/MBLNavbar'
import { collection, getDocs } from 'firebase/firestore';  
import { db } from '../../../../firebaseConfig';  
import { Card, CardContent, Typography, Grid, CardMedia, Box, Button, Dialog, DialogContent, Divider, CircularProgress } from '@mui/material';

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const playersCollection = collection(db, 'mblPlayers');
        const playerSnapshot = await getDocs(playersCollection);
        const playersList = playerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Sort players by club name in alphabetical order
        const sortedPlayers = playersList.sort((a, b) => a.club.localeCompare(b.club));
        
        setPlayers(sortedPlayers);
      } catch (error) {
        console.error('Error fetching players:', error);
        setError('Failed to load players.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchPlayers();
  }, []);
  

  const handleOpen = (player) => {
    setSelectedPlayer(player);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPlayer(null);
  };

  return (
    <div>
      <MBLNavbar />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <Grid container spacing={3} sx={{ padding: 2 }}>
          {players.map((player) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={player.id}> {/* 5 cards per row */}

              <Card sx={{height: '100%', cursor: 'pointer' }} onClick={() => handleOpen(player)}>
                <Box sx={{ display: 'flex', alignItems: 'center', padding: 1 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 40, marginRight: 1 }}
                    image={player.teamLogo}
                    alt={`${player.club} logo`}
                  />
                  <Typography variant="h5">{player.jersey}</Typography>
                </Box>
                <CardMedia
                  component="img"
                  height="140"
                  image={player.picture}
                  alt={player.name}
                />
                <CardContent>
                  <Typography variant="h6">{player.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Position: {player.position}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Club: {player.club}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {player.rating}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

<Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
  {selectedPlayer && (
    <>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', paddingBottom: 2 }}>
              <CardMedia
                component="img"
                sx={{ width: 60, marginRight: 2 }}
                image={selectedPlayer.teamLogo}
                alt={`${selectedPlayer.club} logo`}
              />
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: '120px', 
                  fontWeight: 'bold', 
                  color: 'rgba(0, 0, 0, 0.1)'
                }}>
                {selectedPlayer.jersey}
              </Typography>

              {/* Player name in the top-right corner */}
              <Typography 
                variant="h6"
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  padding: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  zIndex: 1,
                }}
              >
                {selectedPlayer.name}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <CardMedia
              component="img"
              height="300"
              image={selectedPlayer.picture}
              alt={selectedPlayer.name}
              sx={{ borderRadius: '8px' }}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Club: {selectedPlayer.club}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body1">Appearances: {selectedPlayer.appearances}</Typography>
              <Typography variant="body1">Position: {selectedPlayer.position}</Typography>
              <Typography variant="body1">Points: {selectedPlayer.goals}</Typography>
              <Typography variant="body1">Assists: {selectedPlayer.assists}</Typography>
              <Typography variant="body1">Rebounds: {selectedPlayer.rebounds}</Typography>
              <Typography variant="body1">Steals: {selectedPlayer.steals}</Typography>
              <Typography variant="body1">Blocks: {selectedPlayer.blocks}</Typography>
              {selectedPlayer.position === 'Goalkeeper' && (
                <Typography variant="body1">Clean Sheets: {selectedPlayer.cleanSheets}</Typography>
              )}
              <Typography variant="body1">Rating: {selectedPlayer.rating}</Typography>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: 2 }}>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </Box>
    </>
  )}
</Dialog>

    </div>
  );
};

export default Players;
