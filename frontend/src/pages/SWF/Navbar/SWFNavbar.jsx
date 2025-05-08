// Import necessary dependencies
import React, { useState } from 'react';
import { AppBar, Toolbar, Box, Button, CardMedia, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import MTUSportArenaLogo from '../../../assets/MTU_MMINI_LEAGUE_LOGO-removebg-preview.png';
import A1 from '../Club/A1/A1.png'
import A2 from '../Club/A2/A2.png'
import A3 from '../Club/A3/A3.png'
import A4 from '../Club/A4/A4.png'
import B1 from '../Club/B1/B1.png'
import B2 from '../Club/B2/B2.png'
import B3 from '../Club/B3/B3.png'
import B4 from '../Club/B4/B4.png'

// Sample team data with logos and team URLs
const teams = [
  { id: 1, name: 'A1', logo: A1, teamUrl: '/student-week-football/clubs/A1' },
  { id: 2, name: 'A2', logo: A2, teamUrl: '/student-week-football/clubs/A2' },
  { id: 3, name: 'A3', logo: A3, teamUrl: '/student-week-football/clubs/A3' },
  { id: 4, name: 'A4', logo: A4, teamUrl: '/student-week-football/clubs/A4' },
  { id: 5, name: 'B1', logo: B1, teamUrl: '/student-week-football/clubs/B1' },
  { id: 6, name: 'B2', logo: B2, teamUrl: '/student-week-football/clubs/B2' },
  { id: 7, name: 'B3', logo: B3, teamUrl: '/student-week-football/clubs/B3' },
  { id: 8, name: 'B4', logo: B4, teamUrl: '/student-week-football/clubs/B4' },
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
              STUDENT WEEK SOCCER
            </Typography>
          </Box>
          {/* Admin Button on the right */}
          <Box sx={{ position: 'absolute', right: 0 }}>
            <Button component={Link} to="/student-week-football/admin-auth" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'black', color: 'white', fontSize: '20px' }}>
              ADMIN
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* AppBar for Team Logos */}
      <AppBar position="static" sx={{ backgroundColor: 'grey' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            {teams.map((team) => (
              <Box key={team.id}>
                <a href={team.teamUrl}>
                  <CardMedia
                    component="img"
                    sx={{ width: 50, height: 50, objectFit: 'contain', margin: 1 }}
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
              <Button component={Link} to="/mls/home" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'grey', color: 'white' }}>Home</Button>
              <Button component={Link} to="/mls/players" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'grey', color: 'white' }}>Players</Button>
              <Button component={Link} to="/mls/results" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'grey', color: 'white' }}>Results</Button>
              <Button component={Link} to="/mls/standings" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'grey', color: 'white' }}>Standings</Button>
              <Button component={Link} to="/mls/stats" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'grey', color: 'white' }}>Stats</Button>
              <Button component={Link} to="/mls/news" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'grey', color: 'white' }}>News</Button>
              <Button component={Link} to="/mls/clubs" sx={{ fontFamily: 'Roboto Mono, monospace', backgroundColor: 'grey', color: 'white' }}>Clubs</Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Tablet and Small Screen Navigation */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <List>
          <ListItem button component={Link} to="/mls/home" onClick={toggleDrawer}><ListItemText primary="Home" /></ListItem>
          <ListItem button component={Link} to="/mls/players" onClick={toggleDrawer}><ListItemText primary="Players" /></ListItem>
          <ListItem button component={Link} to="/mls/results" onClick={toggleDrawer}><ListItemText primary="Results" /></ListItem>
          <ListItem button component={Link} to="/mls/standings" onClick={toggleDrawer}><ListItemText primary="Standings" /></ListItem>
          <ListItem button component={Link} to="/mls/stats" onClick={toggleDrawer}><ListItemText primary="Stats" /></ListItem>
          <ListItem button component={Link} to="/mls/news" onClick={toggleDrawer}><ListItemText primary="News" /></ListItem>
          <ListItem button component={Link} to="/mls/clubs" onClick={toggleDrawer}><ListItemText primary="Clubs" /></ListItem>
          </List>
      </Drawer>
    </div>
  );
};

export default Navbar;