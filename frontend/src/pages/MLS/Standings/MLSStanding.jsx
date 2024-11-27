import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Typography, Box } from '@mui/material';
import MLSNavbar from '../Navbar/MLSNavbar';

const Standing = () => {
  const [groupATeams, setGroupATeams] = useState([]);
  const [groupBTeams, setGroupBTeams] = useState([]);
  const [qualifiedTeams, setQualifiedTeams] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      const standingsCollection = collection(db, 'mlsStandings');
      const standingsSnapshot = await getDocs(standingsCollection);
      const standingsList = standingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      // Sort teams by points in descending order, then by GD in descending order if points are tied
      standingsList.sort((a, b) => (b.points === a.points ? b.gd - a.gd : b.points - a.points));
  
      // Divide teams into Group A and Group B
      const groupA = standingsList.filter(team => team.group === 'A');
      const groupB = standingsList.filter(team => team.group === 'B');
  
      // Save top 2 teams from each group
      const topTeams = [...groupA.slice(0, 2), ...groupB.slice(0, 2)];
  
      setGroupATeams(groupA);
      setGroupBTeams(groupB);
      setQualifiedTeams(topTeams);
    };
  
    fetchStandings();
  }, []);

  const renderTable = (teams, title) => (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <Typography variant="h6" align="center" sx={{ marginTop: 2 }}>{title}</Typography>
      <Table>
        <TableHead sx={{ backgroundColor: 'black' }}>
          <TableRow>
            <TableCell sx={{ color: 'white' }}>Position</TableCell>
            <TableCell sx={{ color: 'white' }}>Club</TableCell>
            <TableCell sx={{ color: 'white' }}>Played</TableCell>
            <TableCell sx={{ color: 'white' }}>Won</TableCell>
            <TableCell sx={{ color: 'white' }}>Draw</TableCell>
            <TableCell sx={{ color: 'white' }}>Lost</TableCell>
            <TableCell sx={{ color: 'white' }}>GF</TableCell>
            <TableCell sx={{ color: 'white' }}>GA</TableCell>
            <TableCell sx={{ color: 'white' }}>GD</TableCell>
            <TableCell sx={{ color: 'white' }}>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team, index) => (
            <TableRow
              key={team.id}
              sx={{
                backgroundColor: index >= 2 ? 'rgba(255, 0, 0, 0.2)' : 'inherit',
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{team.teamName}</TableCell>
              <TableCell>{team.played}</TableCell>
              <TableCell>{team.won}</TableCell>
              <TableCell>{team.draw}</TableCell>
              <TableCell>{team.lost}</TableCell>
              <TableCell>{team.gf}</TableCell>
              <TableCell>{team.ga}</TableCell>
              <TableCell>{team.gd}</TableCell>
              <TableCell>{team.points}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderKnockoutDiagram = () => (
    <Box sx={{ textAlign: 'center', marginTop: 4 }}>
      <Typography variant="h5" gutterBottom>Semi-Finals</Typography>
      <Grid container spacing={4} justifyContent="center">
        {/* Semi-Final Match 1 */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              border: '2px solid black',
              borderRadius: '10px',
              padding: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">{qualifiedTeams[0]?.teamName}</Typography>
            <Typography variant="body1">vs</Typography>
            <Typography variant="h6">{qualifiedTeams[3]?.teamName}</Typography>
          </Box>
        </Grid>
        {/* Semi-Final Match 2 */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              border: '2px solid black',
              borderRadius: '10px',
              padding: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="h6">{qualifiedTeams[1]?.teamName}</Typography>
            <Typography variant="body1">vs</Typography>
            <Typography variant="h6">{qualifiedTeams[2]?.teamName}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <div>
      <MLSNavbar />
      {qualifiedTeams.length === 4 && renderKnockoutDiagram()}
      {renderTable(groupATeams, 'Group A Standings')}
      {renderTable(groupBTeams, 'Group B Standings')}
      {/* {qualifiedTeams.length === 4 && renderKnockoutDiagram()} */}
    </div>
  );
};

export default Standing;
