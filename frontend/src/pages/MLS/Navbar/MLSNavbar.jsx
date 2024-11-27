// Import necessary dependencies
import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, CardMedia, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import AbialaGiantsLogo from '../../MLS/Club/AbialaGiants/AbialaGiants.png';
import AdeshinaFcLogo from '../Club/AdeshinaFc/AdeshinaFc.png';
import AyolabiFcLogo from '../Club/AyolabiFc/AyolabiFc.png';
import GbenroBallersLogo from '../Club/GbenroBallers/GbenroBallers.png';
import OjoEaglesLogo from '../Club/OjoEagles/OjoEagles.png';
import OlukoyaStarsLogo from '../Club/OlukoyaStars/OlukoyaStars.png';
import OlurinUnitedLogo from '../Club/OlurinUnited/OlurinUnited.png';
import YoungStarsLogo from '../Club/YoungStars/YoungStars.png';
import MTUSportArenaLogo from '../../../assets/MTU_MMINI_LEAGUE_LOGO-removebg-preview.png';

// Sample team data with logos and team URLs
const teams = [
  { id: 1, name: 'Abiala Giants', logo: AbialaGiantsLogo, teamUrl: '/mls/clubs/abiala-giants' },
  { id: 2, name: 'Adeshina FC', logo: AdeshinaFcLogo, teamUrl: '/mls/clubs/adeshina-fc' },
  { id: 3, name: 'Team C', logo: AyolabiFcLogo, teamUrl: '/mls/clubs/ayolabi-fc' },
  { id: 4, name: 'Team D', logo: GbenroBallersLogo, teamUrl: '/mls/clubs/gbenro-ballers' },
  { id: 5, name: 'Team E', logo: OjoEaglesLogo, teamUrl: '/mls/clubs/ojo-eagles' },
  { id: 6, name: 'Team F', logo: OlukoyaStarsLogo, teamUrl: '/mls/clubs/olukoya-stars' },
  { id: 7, name: 'Team G', logo: OlurinUnitedLogo, teamUrl: '/mls/clubs/olurin-united' },
  { id: 8, name: 'Team H', logo: YoungStarsLogo, teamUrl: '/mls/clubs/young-stars' },
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
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar sx={{ justifyContent: 'center', position: 'relative' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            {/* Display the logo on larger screens */}
            {!isTabletOrSmallScreen && (
              <CardMedia
                component="img"
                sx={{ width: 50, height: 50, objectFit: 'contain', marginRight: '1rem' }}
                image={MTUSportArenaLogo}
                alt="App logo"
              />
            )}
            <Typography sx={{ color: 'white', fontFamily: 'Roboto Mono, monospace', fontSize: isTabletOrSmallScreen ? '20px' : '35px' }}>
              MTU LEAGUE SOCCER
            </Typography>
          </Box>
          {/* Admin Button on the right */}
          <Box sx={{ position: 'absolute', right: 0 }}>
            <Button component={Link} to="/mls/admin-auth" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'black', color: 'white', fontSize: '20px' }}>
              ADMIN
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* AppBar for Team Logos */}
      <AppBar position="static" sx={{ backgroundColor: 'purple' }}>
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
              <Button component={Link} to="/mls/home" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'purple', color: 'white' }}>Home</Button>
              <Button component={Link} to="/mls/players" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'purple', color: 'white' }}>Players</Button>
              {/* <Button component={Link} to="/mls/matches" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'purple', color: 'white' }}>Fixtures</Button> */}
              <Button component={Link} to="/mls/results" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'purple', color: 'white' }}>Results</Button>
              <Button component={Link} to="/mls/standings" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'purple', color: 'white' }}>Standings</Button>
              <Button component={Link} to="/mls/stats" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'purple', color: 'white' }}>Stats</Button>
              {/* <Button component={Link} to="/mls/transfers" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'purple', color: 'white' }}>Transfers</Button> */}
              <Button component={Link} to="/mls/news" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'purple', color: 'white' }}>News</Button>
              <Button component={Link} to="/mls/clubs" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'purple', color: 'white' }}>Clubs</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Tablet and Small Screen Navigation */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button component={Link} to="/mls/home" onClick={toggleDrawer}><ListItemText primary="Home" /></ListItem>
          <ListItem button component={Link} to="/mls/players" onClick={toggleDrawer}><ListItemText primary="Players" /></ListItem>
          {/* <ListItem button component={Link} to="/mls/matches" onClick={toggleDrawer}><ListItemText primary="Fixtures" /></ListItem> */}
          <ListItem button component={Link} to="/mls/results" onClick={toggleDrawer}><ListItemText primary="Results" /></ListItem>
          <ListItem button component={Link} to="/mls/standings" onClick={toggleDrawer}><ListItemText primary="Standings" /></ListItem>
          <ListItem button component={Link} to="/mls/stats" onClick={toggleDrawer}><ListItemText primary="Stats" /></ListItem>
          {/* <ListItem button component={Link} to="/mls/transfers" onClick={toggleDrawer}><ListItemText primary="Transfers" /></ListItem> */}
          <ListItem button component={Link} to="/mls/news" onClick={toggleDrawer}><ListItemText primary="News" /></ListItem>
          <ListItem button component={Link} to="/mls/clubs" onClick={toggleDrawer}><ListItemText primary="Clubs" /></ListItem>
          </List>
      </Drawer>
    </div>
  );
};

export default Navbar;