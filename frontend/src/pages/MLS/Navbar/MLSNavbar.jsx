// eslint-disable-next-line no-unused-vars
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Toolbar, Box, Button, CardMedia, Typography,IconButton    } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import AbialaGiantsLogo from '../../MLS/Club/AbialaGiants/ABIALA_GIANT-removebg-preview.png'
import AdeshinaFcLogo from '../Club/AdeshinaFc/AdeshinaFc.png'
import AyolabiFcLogo from '../Club/AyolabiFc/AyolabiFc.png'
import GbenroBallersLogo from '../Club/GbenroBallers/GBENRO_BALLARZ-removebg-preview.png'
import OjoEaglesLogo from '../Club/OjoEagles/OjoEagles.png'
import OlukoyaStarsLogo from '../Club/OlukoyaStars/OLUKOYA_STARS-removebg-preview.png'
import OlurinUnitedLogo from '../Club/OlurinUnited/OLURIN_UNITED-removebg-preview.png'
import YoungStarsLogo from '../Club/YoungStars/YoungStars.png'
import MTUSportArenaLogo from '../../../assets/MTU_MMINI_LEAGUE_LOGO-removebg-preview.png'


// Sample team data, now fetching logos from the local directory
const teams = [
  { id: 1, name: 'Abiala Giants', logo: AbialaGiantsLogo, teamUrl: '/mls/clubs/abiala-giants' },
  { id: 2, name: 'Team B', logo: AdeshinaFcLogo, teamUrl: '/mls/clubs/adeshina-fc' },
  { id: 3, name: 'Team C', logo: AyolabiFcLogo, teamUrl: '/mls/clubs/ayolabi-fc' },
  { id: 4, name: 'Team D', logo: GbenroBallersLogo, teamUrl: '/mls/clubs/gbenro-ballers' },
  { id: 5, name: 'Team E', logo: OjoEaglesLogo, teamUrl: '/mls/clubs/ojo-eagles' },
  { id: 6, name: 'Team F', logo: OlukoyaStarsLogo, teamUrl: '/mls/clubs/olukoya-stars' },
  { id: 7, name: 'Team G', logo: OlurinUnitedLogo, teamUrl: '/mls/clubs/olurin-united' },
  { id: 8, name: 'Team H', logo: YoungStarsLogo, teamUrl: '/mls/clubs/young-stars' },
];

const Navbar = () => {
  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: 'BLACK', position:'relative' }}>
        <Toolbar sx={{ justifyContent: 'center', position:'relative' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
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
            <Typography sx={{ color: 'white', fontFamily: 'Roberto Mono, Monospace', fontSize: '35px' }}>

          {/* <Typography sx={{color:'white', fontFamily:'Roberto Mono, Monospace', fontSize:'35px'}}> */}
              MTU LEAGUE SOCCER
            </Typography>
          </Box>
          {/* Admin Button on the Far Right */}
          <Box sx={{ position: 'absolute', right: 0 }}>
            <Button component={Link} to="/mls/admin-auth" sx={{ fontFamily: 'Roberto Mono, Monospace', backgroundColor: 'black', color: 'white', fontSize: '20px' }}>
              ADMIN
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Main AppBar with logo and team logos */}
      <AppBar position="static" sx={{ backgroundColor: 'purple' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          {/* Center the team logos */}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
            {teams.map((team) => (
              <Box key={team.id} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <a href={team.teamUrl} target="_self" rel="noopener noreferrer"> {/* Navigating to team's page */}
                  <CardMedia
                    component="img"
                    sx={{
                      width: 50,    // Set the maximum width to 50px
                      height: 50,   // Set the maximum height to 50px
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
            {/* <Button component={Link} to="/" sx={{ fontFamily:'Roberto Mono, Monospace',backgroundColor: 'grey', color: 'white' }}>
              BACK
            </Button> */}
            <Button component={Link} to="/mls/home" sx={{ backgroundColor: 'purple', color: 'white' }}>
              Home
            </Button>
            <Button component={Link} to="/mls/players" sx={{ backgroundColor: 'purple', color: 'white' }}>
              Players
            </Button>
            <Button component={Link} to="/mls/matches" sx={{ backgroundColor: 'purple', color: 'white' }}>
              Fixtures
            </Button>
            <Button component={Link} to="/mls/results" sx={{ backgroundColor: 'purple', color: 'white' }}>
              Results
            </Button>
            <Button component={Link} to="/mls/standings" sx={{ backgroundColor: 'purple', color: 'white' }}>
              Standings
            </Button>
            <Button component={Link} to="/mls/stats" sx={{ backgroundColor: 'purple', color: 'white' }}>
              Stats
            </Button>
            <Button component={Link} to="/mls/transfers" sx={{ backgroundColor: 'purple', color: 'white' }}>
              Transfers
            </Button>
            <Button component={Link} to="/mls/news" sx={{ backgroundColor: 'purple', color: 'white' }}>
              News
            </Button>
            <Button component={Link} to="/mls/clubs" sx={{ backgroundColor: 'purple', color: 'white' }}>
              Clubs
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
