// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Button, CardMedia, Typography, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MTUSportArenaLogo from '../../assets/MTU_MMINI_LEAGUE_LOGO-removebg-preview.png'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; // Adjust based on your config path

const Navbar = () => {
  const [teams, setTeams] = useState([]);
  // const sports = ['Football', 'Basketball', 'VolleyBall', 'Table Tennis', 'Lawn Tennis'];
  const dropdowns = {
    Football: [
      { label: 'MLS', path: '/mls/home' },
      { label: 'Student Week', path: '/student-week-football/home' },
      { label: 'Convo Week', path: '/' },
      { label: 'Others', path: '/' }
    ],
    Basketball: [
      { label: 'MBL', path: '/mbl/home' },
      { label: 'Student Week', path: '/student-week-basketball/home' },
      { label: 'Convo Week', path: '/basketball/convoweek' },
      { label: 'Others', path: '/basketball/others' }
    ],
    'VolleyBall': [
      { label: 'MVL', path: '/mvl/home' },
      { label: 'Student Week', path: '/student-week-volleyball/home' },
      { label: 'Convo Week', path: '/' },
      { label: 'Others', path: '/' }
    ],
    'Athletics': [
      { label: 'MAL', path: '/mal/home' },
      { label: 'Student Week', path: '/student-week-athletics/home' },
      { label: 'Convo Week', path: '/' },
      { label: 'Others', path: '/' }
    ],
    'Chess': [
      { label: 'MCL', path: '/mcl/home' },
      { label: 'Student Week', path: '/student-week-chess/home' },
      { label: 'Convo Week', path: '/' },
      { label: 'Others', path: '/' }
    ],
    'Table Tennis': [
      { label: 'MTTL', path: '/mttl/home' },
      { label: 'Student Week', path: '/student-week-tabletennis/home' },
      { label: 'Convo Week', path: '/' },
      { label: 'Others', path: '/' }
    ],
    'Lawn Tennis': [
      { label: 'MLTL', path: '/mltl/home' },
      { label: 'Student Week', path: '/student-week-lawntennis/home' },
      { label: 'Convo Week', path: '/' },
      { label: 'Others', path: '/' }
    ]
  };
  

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

  const [anchorEl, setAnchorEl] = useState({});


  return (
    <div>
      {/* div mtusportarena */}
      <AppBar position="static" sx={{ backgroundColor: 'BLACK' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
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
              MTU SPORTS ARENA
            </Typography>
        </Toolbar>
      </AppBar>

      {/* Main AppBar with logo and team logos */}
      <AppBar position="static" sx={{ backgroundColor: 'green' }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {Object.keys(dropdowns).map((sport, index) => (
              <Box key={index}>
                <Button
                  sx={{ fontFamily: 'Roberto Mono, Monospace', backgroundColor: 'green', color: 'white' }}
                  onClick={(event) => setAnchorEl({ ...anchorEl, [sport]: event.currentTarget })}
                >
                  {sport}
                </Button>
                <Menu
                  anchorEl={anchorEl[sport]}
                  open={Boolean(anchorEl[sport])}
                  onClose={() => setAnchorEl({ ...anchorEl, [sport]: null })}
                >
                  {dropdowns[sport].map((item, i) => (
                    <MenuItem
                      key={i}
                      component={Link}
                      to={item.path}
                      onClick={() => setAnchorEl({ ...anchorEl, [sport]: null })}
                    >
                      {item.label}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

    </div>
  );
};

export default Navbar;
