// Import necessary dependencies
import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, CardMedia, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import AbialaBucks from '../Clubs/AbialaBucks/bucks.png'
import AdeshinaHawks from '../Clubs/AdeshinaHawks/hawks.png'
import OlurinHornets from '../Clubs/OlurinHornets/hornets.png'
import OlukoyaEagles from '../Clubs/OlukoyaEagles/eagles.png'
import YoungPelicans from '../Clubs/YoungPelicans/pelicans.png'
import MBLLOGO from '../assets/mbl bal.png'

// Sample team data with logos and team URLs
const teams = [
  { id: 1, name: 'Abiala Bucks', logo: AbialaBucks, teamUrl: '/mbl/clubs/abiala-bucks' },
  { id: 2, name: 'Adeshina Hawks', logo: AdeshinaHawks, teamUrl: '/mbl/clubs/adeshina-hawks' },
  { id: 3, name: 'Olurin Hornets', logo: OlurinHornets, teamUrl: '/mbl/clubs/olurin-hornets' },
  { id: 4, name: 'Olukoya Eagles', logo: OlukoyaEagles, teamUrl: '/mbl/clubs/olukoya-eagles' },
  { id: 5, name: 'Young Pelicans', logo: YoungPelicans, teamUrl: '/mbl/clubs/young-pelicans' },
];

const Navbar = () => {
  const isTabletOrSmallScreen = useMediaQuery('(max-width:960px)'); // Trigger drawer for tablets and smaller
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div>
      {/* Main AppBar with Logo and Title */}
      <AppBar position="static" sx={{ backgroundColor: 'grey' }}>
        <Toolbar sx={{ justifyContent: 'center', position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {/* Display the logo on larger screens */}
            {!isTabletOrSmallScreen && (
              <CardMedia
                component="img"
                sx={{ width: 50, height: 50, objectFit: 'contain', marginRight: '1rem' }}
                image={MBLLOGO}
                alt="App logo"
              />
            )}
            <Typography sx={{ color: 'white', fontFamily: 'Roboto Mono, monospace', fontSize: isTabletOrSmallScreen ? '20px' : '35px' }}>
              MTU BASKETBALL LEAGUE
            </Typography>
          </Box>
          {/* Admin Button on the right */}
          <Box sx={{ position: 'absolute', right: 0 }}>
            <Button component={Link} to="/mls/admin-auth" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'grey', color: 'white', fontSize: '20px' }}>
              ADMIN
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* AppBar for Team Logos */}
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            {teams.map((team) => (
              <Box key={team.id}>
                <a href={team.teamUrl}>
                  <CardMedia
                    component="img"
                    sx={{ width: 40, height: 40, objectFit: 'contain', margin: 1 }}
                    image={team.logo}
                    alt={`${team.name} logo`}
                  />
                </a>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Bar with Menu or Button Links */}
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <IconButton component={Link} to="/" sx={{ color: 'black' }}>
            <ArrowBackIcon />
          </IconButton>

          {/* Display Menu Icon on Tablet or Smaller Screens, Buttons on Larger Screens */}
          {isTabletOrSmallScreen ? (
            <IconButton onClick={toggleDrawer} sx={{ color: 'black', marginLeft: 'auto' }}>
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              {/* Navigation Buttons */}
              <Button component={Link} to="/mbl/home" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'black', color: 'white' }}>Home</Button>
              <Button component={Link} to="/mbl/players" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'black', color: 'white' }}>Players</Button>
              {/* <Button component={Link} to="/mls/matches" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'purple', color: 'white' }}>Fixtures</Button> */}
              <Button component={Link} to="/mbl/results" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'black', color: 'white' }}>Results</Button>
              <Button component={Link} to="/mbl/standings" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'black', color: 'white' }}>Standings</Button>
              <Button component={Link} to="/mbl/stats" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'black', color: 'white' }}>Stats</Button>
              <Button component={Link} to="/mbl/transfers" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'black', color: 'white' }}>Transfers</Button>
              <Button component={Link} to="/mbl/news" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'black', color: 'white' }}>News</Button>
              <Button component={Link} to="/mbl/clubs" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'black', color: 'white' }}>Clubs</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Tablet and Small Screen Navigation */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button component={Link} to="/mbl/home" onClick={toggleDrawer}><ListItemText primary="Home" /></ListItem>
          <ListItem button component={Link} to="/mbl/players" onClick={toggleDrawer}><ListItemText primary="Players" /></ListItem>
          {/* <ListItem button component={Link} to="/mls/matches" onClick={toggleDrawer}><ListItemText primary="Fixtures" /></ListItem> */}
          <ListItem button component={Link} to="/mbl/results" onClick={toggleDrawer}><ListItemText primary="Results" /></ListItem>
          <ListItem button component={Link} to="/mbl/standings" onClick={toggleDrawer}><ListItemText primary="Standings" /></ListItem>
          <ListItem button component={Link} to="/mbl/stats" onClick={toggleDrawer}><ListItemText primary="Stats" /></ListItem>
          <ListItem button component={Link} to="/mbl/transfers" onClick={toggleDrawer}><ListItemText primary="Transfers" /></ListItem>
          <ListItem button component={Link} to="/mbl/news" onClick={toggleDrawer}><ListItemText primary="News" /></ListItem>
          <ListItem button component={Link} to="/mbl/clubs" onClick={toggleDrawer}><ListItemText primary="Clubs" /></ListItem>
          </List>
      </Drawer>
    </div>
  );
};

export default Navbar;