// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Button, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import MTUSportArenaLogo from '../../assets/MTU_MMINI_LEAGUE_LOGO-removebg-preview.png'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; // Adjust based on your config path

const Navbar = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsCollection = collection(db, 'mlsTeams'); // Assuming 'teams' is your Firebase collection name
        const teamSnapshot = await getDocs(teamsCollection);
        const teamsList = teamSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTeams(teamsList);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, []);

  return (
    <div>
      {/* div mtusportarena */}
      <AppBar position="static" sx={{ backgroundColor: 'BLACK' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            {/* <Typography sx={{color:'white', fontFamily:'Roberto Mono, Monospace', fontSize:'35px'}}>
              MTU SPORT ARENA
            </Typography> */}
            <CardMedia
              component="img"
              sx={{
                width: 50, // Adjust the size of the app logo
                height: 50,
                objectFit: 'contain',
                display: 'flex',
                marginRight: '2rem' // Add margin to the right of the logo
              }}
              image={MTUSportArenaLogo} // Fetch the app logo from the local directory
              alt="App logo"
            />
          </Box>
          <Typography sx={{color:'white', fontFamily:'Roberto Mono, Monospace', fontSize:'35px'}}>
              MTU SPORT ARENA
            </Typography>
        </Toolbar>
      </AppBar>

      {/* Main AppBar with logo and team logos */}
      <AppBar position="static" sx={{ backgroundColor: 'green' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
        {/* <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
            <CardMedia
              component="img"
              sx={{
                width: 50, // Adjust the size of the app logo
                height: 50,
                objectFit: 'contain',
                display: 'flex',
                marginRight: '2rem' // Add margin to the right of the logo
              }}
              image={MTUSportArenaLogo} // Fetch the app logo from the local directory
              alt="App logo"
            />
          </Box> */}
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button component={Link} to="/mls/home" sx={{ fontFamily:'Roberto Mono, Monospace', backgroundColor: 'green', color: 'white' }}>
              Football
            </Button>
            <Button component={Link} to="/mbl/home" sx={{ fontFamily:'Roberto Mono, Monospace',backgroundColor: 'green', color: 'white' }}>
              Basketball
            </Button>
            <Button component={Link} to="/mvl/home" sx={{ fontFamily:'Roberto Mono, Monospace',backgroundColor: 'green', color: 'white' }}>
              VolleyBall
            </Button>
            <Button component={Link} to="/results" sx={{ fontFamily:'Roberto Mono, Monospace',backgroundColor: 'green', color: 'white' }}>
              Table Tennis
            </Button>
            <Button component={Link} to="/standings" sx={{ fontFamily:'Roberto Mono, Monospace',backgroundColor: 'green', color: 'white' }}>
              Long Tennis
            </Button>
            {/* <Button component={Link} to="/stats" sx={{ backgroundColor: 'green', color: 'white' }}>
              Stats
            </Button> */}
            {/* <Button component={Link} to="/transfers" sx={{ backgroundColor: 'green', color: 'white' }}>
              Transfers
            </Button> */}
            {/* <Button component={Link} to="/news" sx={{ backgroundColor: 'green', color: 'white' }}>
              News
            </Button> */}
            {/* <Button component={Link} to="/clubs" sx={{ backgroundColor: 'green', color: 'white' }}>
              Clubs
            </Button> */}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Bar
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          
        </Toolbar>
      </AppBar> */}
    </div>
  );
};

export default Navbar;
