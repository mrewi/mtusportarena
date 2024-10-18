// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import MBLNavbar from '../Navbar/MBLNavbar';
import { Grid, Card, CardContent, CardMedia, Typography, } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Import local team logos
import AbialaBucksLogo from '../Clubs/AbialaBucks/bucks.png'
import AdeshinaHawksLogo from '../Clubs/AdeshinaHawks/hawks.png'
import OlukoyaEaglesLogo from '../Clubs/OlukoyaEagles/eagles.png'
import OlurinHornetsLogo from '../Clubs/OlurinHornets/hornets.png'
import YoungPelicansLogo from '../Clubs/YoungPelicans/pelicans.png'

// Sample team data with local logos
const teams = [
  {  name: 'Abiala Bucks', logo: AbialaBucksLogo, id: '/mbl/clubs/abiala-bucks' },
  {  name: 'Adeshina Hawks', logo: AdeshinaHawksLogo, id: '/mbl/clubs/adeshina-hawks' },
  {  name: 'Olukoya Eagles', logo: OlukoyaEaglesLogo, id: '/mbl/clubs/olukoya-eagles' },
  {  name: 'Olurin Hornets', logo: OlurinHornetsLogo, id: '/mbl/clubs/olurin-hornets' },
  {  name: 'Young Pelicans', logo: YoungPelicansLogo, id: '/mbl/clubs/young-pelicans' },
];

const Clubs = () => {
  const navigate = useNavigate();

  const handleCardClick = (teamId) => {
    navigate(`${teamId}`); // Navigating to the team's page using the team ID
  };

  return (
    <div>
      <MBLNavbar />
      <Grid container spacing={3} sx={{ padding: 2 }}>
        {teams.map((team) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={team.id}> {/* 4 cards per row */}
            <Card sx={{ cursor: 'pointer' }} onClick={() => handleCardClick(team.id)}>
              <CardMedia
                component="img"
                height="140"
                image={team.logo} // Using local logo image
                alt={`${team.name} logo`}
              />
              <CardContent>
                <Typography variant="h6" align="center" sx={{fontFamily:'Roberto Mono, Monospace',}}>{team.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Clubs;
