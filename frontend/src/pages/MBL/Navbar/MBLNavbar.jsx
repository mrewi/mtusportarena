// eslint-disable-next-line no-unused-vars
import React from 'react';
import { AppBar, Toolbar, Box, Button, CardMedia, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import AbialaBucksLogo from '../Clubs/AbialaBucks/bucks.png'
import AdeshinaHawksLogo from '../Clubs/AdeshinaHawks/hawks.png'
import OlukoyaEaglesLogo from '../Clubs/OlukoyaEagles/eagles.png'
import OlurinHornetsLogo from '../Clubs/OlurinHornets/hornets.png'
import YoungPelicansLogo from '../Clubs/YoungPelicans/pelicans.png'
import MBLLogo from '../assets/mbl bal.png'


// Sample team data, now fetching logos from the local directory
const teams = [
  {  name: 'Abiala Bucks', logo: AbialaBucksLogo, id: '/mbl/clubs/abiala-bucks' },
  {  name: 'Adeshina Hawks', logo: AdeshinaHawksLogo, id: '/mbl/clubs/adeshina-hawks' },
  {  name: 'Olukoya Eagles', logo: OlukoyaEaglesLogo, id: '/mbl/clubs/olukoya-eagles' },
  {  name: 'Olurin Hornets', logo: OlurinHornetsLogo, id: '/mbl/clubs/olurin-hornets' },
  {  name: 'Young Pelicans', logo: YoungPelicansLogo, id: '/mbl/clubs/young-pelicans' },
];

const Navbar = () => {
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'grey', position: 'relative' }}>
        <Toolbar sx={{ justifyContent: 'center', position: 'relative' }}>
          {/* Centered Logo and Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <CardMedia
              component="img"
              sx={{
                width: 50,
                height: 50,
                objectFit: 'contain',
                marginRight: '1rem',
              }}
              image={MBLLogo}
              alt="App logo"
            />
            <Typography sx={{ color: 'white', fontFamily: 'Roberto Mono, Monospace', fontSize: '35px' }}>
              MTU BASKETBALL LEAGUE
            </Typography>
          </Box>

          {/* Admin Button on the Far Right */}
          <Box sx={{ position: 'absolute', right: 0 }}>
            <Button component={Link} to="/mbl/admin-auth" sx={{ fontFamily: 'Roberto Mono, Monospace', backgroundColor: 'grey', color: 'white', fontSize: '20px' }}>
              ADMIN
            </Button>
          </Box>
        </Toolbar>
      </AppBar>


      {/* Main AppBar with logo and team logos */}
      <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          {/* Center the team logos */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            {teams.map((team) => (
              <Box key={team.id} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <a href={team.teamUrl} target="_self" rel="noopener noreferrer"> {/* Navigating to team's page */}
                  <CardMedia
                    component="img"
                    sx={{
                      width: 80,    // Set the maximum width to 50px
                      height: 60,   // Set the maximum height to 50px
                      objectFit: 'contain', // Ensure the logos resize proportionally without being cut
                      margin: 1     // Add spacing between each logo
                    }}
                    image={team.logo} // Fetch the logo from the local directory
                    alt={`${team.name} logo`}
                  />
                </a>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navigation Bar */}
      <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
        <IconButton component={Link} to="/" sx={{ color: 'black' }}>
          <ArrowBackIcon />
        </IconButton>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button component={Link} to="/mbl/home" sx={{ fontFamily:'Roberto Mono, Monospace',backgroundColor: 'black', color: 'white' }}>
              Home
            </Button>
            <Button component={Link} to="/mbl/players" sx={{ fontFamily:'Roberto Mono, Monospace',backgroundColor: 'black', color: 'white' }}>
              Players
            </Button>
            <Button component={Link} to="/mbl/matches" sx={{ fontFamily:'Roberto Mono, Monospace',backgroundColor: 'black', color: 'white' }}>
              Fixtures
            </Button>
            <Button component={Link} to="/mbl/results" sx={{ fontFamily:'Roberto Mono, Monospace',backgroundColor: 'black', color: 'white' }}>
              Results
            </Button>
            <Button component={Link} to="/mbl/standings" sx={{ fontFamily:'Roberto Mono, Monospace',backgroundColor: 'black', color: 'white' }}>
              Standings
            </Button>
            <Button component={Link} to="/mbl/stats" sx={{ fontFamily:'Roberto Mono, Monospace',backgroundColor: 'black', color: 'white' }}>
              Stats
            </Button>
            <Button component={Link} to="/mbl/transfers" sx={{ fontFamily:'Roberto Mono, Monospace',backgroundColor: 'black', color: 'white' }}>
              Transfers
            </Button>
            <Button component={Link} to="/mbl/news" sx={{ fontFamily:'Roberto Mono, Monospace',backgroundColor: 'black', color: 'white' }}>
              News
            </Button>
            <Button component={Link} to="/mbl/clubs" sx={{ fontFamily:'Roberto Mono, Monospace',backgroundColor: 'black', color: 'white' }}>
              Clubs
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
