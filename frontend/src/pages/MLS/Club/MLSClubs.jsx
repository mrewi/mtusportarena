// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import MLSNavbar from '../Navbar/MLSNavbar';
import { Grid, Card, CardContent, CardMedia, Typography, } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Import local team logos
import AbialaGiantsLogo from '../../MLS/Club/AbialaGiants/ABIALA_GIANT-removebg-preview.png'
import AdeshinaFcLogo from '../Club/AdeshinaFc/Adesina_FC-removebg-preview.png'
import AyolabiFcLogo from '../Club/AyolabiFc/AYOLABI_FC-removebg-preview.png'
import GbenroBallersLogo from '../Club/GbenroBallers/GBENRO_BALLARZ-removebg-preview.png'
import OjoEaglesLogo from '../Club/OjoEagles/OJO_EAGLES-removebg-preview.png'
import OlukoyaStarsLogo from '../Club/OlukoyaStars/OLUKOYA_STARS-removebg-preview.png'
import OlurinUnitedLogo from '../Club/OlurinUnited/OLURIN_UNITED-removebg-preview.png'
import YoungStarsLogo from '../Club/YoungStars/YOUNG_STARS-removebg-preview.png'

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
