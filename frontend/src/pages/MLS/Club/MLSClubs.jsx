// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import MLSNavbar from '../Navbar/MLSNavbar';
import { Grid, Card, CardContent, CardMedia, Typography, } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Import local team logos
import AbialaGiantsLogo from '../../MLS/Club/AbialaGiants/AbialaGiants.png'
import AdeshinaFcLogo from '../Club/AdeshinaFc/AdeshinaFc.png'
import AyolabiFcLogo from '../Club/AyolabiFc/AyolabiFc.png'
import GbenroBallersLogo from '../Club/GbenroBallers/GbenroBallers.png'
import OjoEaglesLogo from '../Club/OjoEagles/OjoEagles.png'
import OlukoyaStarsLogo from '../Club/OlukoyaStars/OlukoyaStars.png'
import OlurinUnitedLogo from '../Club/OlurinUnited/OlurinUnited.png'
import YoungStarsLogo from '../Club/YoungStars/YoungStars.png'

// Sample team data with local logos
const teams = [
  {  name: 'Abiala Giants', logo: AbialaGiantsLogo, id: '/mls/clubs/abiala-giants' },
  {  name: 'Adeshina Fc', logo: AdeshinaFcLogo, id: '/mls/clubs/adeshina-fc' },
  {  name: 'Ayolabi Fc', logo: AyolabiFcLogo, id: '/mls/clubs/ayolabi-fc' },
  {  name: 'Gbenro Ballers', logo: GbenroBallersLogo, id: '/mls/clubs/gbenro-ballers' },
  {  name: 'Ojo Eagles', logo: OjoEaglesLogo, id: '/mls/clubs/ojo-eagles' },
  {  name: 'Olukoya Stars', logo: OlukoyaStarsLogo, id: '/mls/clubs/olukoya-stars' },
  {  name: 'Olurin United', logo: OlurinUnitedLogo, id: '/mls/clubs/olurin-united' },
  {  name: 'Young Stars', logo: YoungStarsLogo, id: '/mls/clubs/young-stars' },
];

const Clubs = () => {
  const navigate = useNavigate();

  const handleCardClick = (teamId) => {
    navigate(`${teamId}`); // Navigating to the team's page using the team ID
  };

  return (
    <div>
      <MLSNavbar />
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
                <Typography variant="h6" align="center">{team.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Clubs;
