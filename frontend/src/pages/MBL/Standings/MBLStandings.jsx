// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import MBLNavbar from '../Navbar/MBLNavbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig'; 

const Standing = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      setLoading(true);
      try {
        const standingsCollection = collection(db, 'mblStandings');
        const standingsSnapshot = await getDocs(standingsCollection);
        const standingsData = standingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // Sort by wins in descending order, then by PPG in descending order if wins are tied
        standingsData.sort((a, b) => {
          if (b.won === a.won) {
            return b.ppg - a.ppg;
          }
          return b.won - a.won;
        });
        
        setTeams(standingsData);
      } catch (error) {
        console.error("Error fetching standings: ", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchStandings();
  }, []);
  

  return (
    <div>
      <MBLNavbar />
      <TableContainer component={Paper} sx={{ fontFamily:'Roboto Mono, Monospace', maxWidth: 800, margin: 'auto', mt: 4 }}>
          <Table>
            <TableHead sx={{ backgroundColor: 'black' }}>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Position</TableCell>
                <TableCell sx={{ color: 'white' }}>Club</TableCell>
                <TableCell sx={{ color: 'white' }}>Wins</TableCell>
                <TableCell sx={{ color: 'white' }}>Losses</TableCell>
                <TableCell sx={{ color: 'white' }}>Streaks</TableCell>
                <TableCell sx={{ color: 'white' }}>PPG</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teams.map((team, index) => (
                <TableRow key={team.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.won}</TableCell>
                  <TableCell>{team.lost}</TableCell>
                  <TableCell>{team.streak}</TableCell>
                  <TableCell>{team.ppg}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
      </TableContainer>
    </div>
  );
};

export default Standing;
