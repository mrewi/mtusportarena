import React, { useEffect, useState } from 'react';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import MLSNavbar from '../Navbar/MLSNavbar';

const Standing = () => {
  const [teams, setTeams] = useState([]);
  const [groupATeams, setGroupATeams] = useState([]);
  const [groupBTeams, setGroupBTeams] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      const standingsCollection = collection(db, 'mlsStandings');
      const standingsSnapshot = await getDocs(standingsCollection);
      const standingsList = standingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
      // Sort teams by points in descending order, then by GD in descending order if points are tied
      standingsList.sort((a, b) => {
        if (b.points === a.points) {
          return b.gd - a.gd;
        }
        return b.points - a.points;
      });
  
      // Divide teams into Group A and Group B
      const groupA = standingsList.filter(team => team.group === 'A');
      const groupB = standingsList.filter(team => team.group === 'B');
  
      setGroupATeams(groupA);
      setGroupBTeams(groupB);
      setTeams(standingsList);  // Optional: keep a full list if needed
    };
  
    fetchStandings();
  }, []);

  const handleUpdate = async (teamId, updatedData) => {
    const teamDocRef = doc(db, 'mlsStandings', teamId);  // Note: update based on your collection name
    await updateDoc(teamDocRef, updatedData);
  };

  const renderTable = (teams, title) => (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
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
            <TableRow key={team.id}>
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
              {/* Uncomment below if you add a button for inline updates */}
              {/* <TableCell>
                <Button onClick={() => handleUpdate(team.id, { })}>Update</Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div>
      <MLSNavbar />
      {renderTable(groupATeams, 'Group A Standings')}
      {renderTable(groupBTeams, 'Group B Standings')}
    </div>
  );
};

export default Standing;
