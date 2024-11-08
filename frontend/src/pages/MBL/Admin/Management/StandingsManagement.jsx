// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, getDocs, doc } from 'firebase/firestore';
import { db } from '../../../../../firebaseConfig';
import { Box, TextField, Button, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const AdminStanding = () => {
  const [teams, setTeams] = useState([]);
  const [teamData, setTeamData] = useState({ name: '', won: 0, lost: 0, streak: 0, ppg: 0 });
  const [editingId, setEditingId] = useState(null);

  // Fetch teams data from Firebase
  useEffect(() => {
    const fetchTeams = async () => {
      const snapshot = await getDocs(collection(db, 'mblStandings'));
      setTeams(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchTeams();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    setTeamData({
      ...teamData,
      [e.target.name]: e.target.value,
    });
  };

  // Add new team
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'mblStandings'), teamData);
      setTeams(prevTeams => [...prevTeams, teamData]);
      setTeamData({ name: '', won: 0, lost: 0, streak: 0, ppg: 0 });
      alert("Team added successfully!");
    } catch (error) {
      console.error("Error adding team: ", error);
    }
  };

  // Edit team data inline
  const handleEdit = (team) => {
    setEditingId(team.id);
    setTeamData(team);
  };

  // Save edited team data
  const handleSave = async () => {
    try {
      const teamRef = doc(db, 'mblStandings', editingId);
      await updateDoc(teamRef, teamData);
      setTeams(teams.map(team => (team.id === editingId ? { id: editingId, ...teamData } : team)));
      setEditingId(null);
      setTeamData({ name: '', won: 0, lost: 0, streak: 0, ppg: 0 });
    } catch (error) {
      console.error("Error updating team: ", error);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
      {/* <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add New Team
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            fullWidth 
            label="Team Name" 
            name="name" 
            value={teamData.teamName} 
            onChange={handleChange} 
            sx={{ mb: 2 }}
          />
          <TextField 
            fullWidth 
            type="number" 
            label="Wins" 
            name="won" 
            value={teamData.won} 
            onChange={handleChange} 
            sx={{ mb: 2 }}
          />
          <TextField 
            fullWidth 
            type="number" 
            label="Losses" 
            name="lost" 
            value={teamData.lost} 
            onChange={handleChange} 
            sx={{ mb: 2 }}
          />
          <TextField 
            fullWidth 
            type="number" 
            label="Streaks" 
            name="streak" 
            value={teamData.streak} 
            onChange={handleChange} 
            sx={{ mb: 2 }}
          />
          <TextField 
            fullWidth 
            type="number" 
            label="PPG" 
            name="ppg" 
            value={teamData.ppg} 
            onChange={handleChange} 
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" color="primary">
            Add Team
          </Button>
        </form>
      </Paper> */}

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: 'black' }}>
            <TableRow>
              <TableCell sx={{ color: 'white' }}>Club</TableCell>
              <TableCell sx={{ color: 'white' }}>Wins</TableCell>
              <TableCell sx={{ color: 'white' }}>Losses</TableCell>
              <TableCell sx={{ color: 'white' }}>Streaks</TableCell>
              <TableCell sx={{ color: 'white' }}>PPG</TableCell>
              <TableCell sx={{ color: 'white' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teams.map((team) => (
              <TableRow key={team.id}>
                <TableCell>
                  {editingId === team.id ? (
                    <TextField
                      value={teamData.teamName}
                      name="name"
                      onChange={handleChange}
                    />
                  ) : (
                    team.name
                  )}
                </TableCell>
                <TableCell>
                  {editingId === team.id ? (
                    <TextField
                      type="number"
                      value={teamData.won}
                      name="won"
                      onChange={handleChange}
                    />
                  ) : (
                    team.won
                  )}
                </TableCell>
                <TableCell>
                  {editingId === team.id ? (
                    <TextField
                      type="number"
                      value={teamData.lost}
                      name="lost"
                      onChange={handleChange}
                    />
                  ) : (
                    team.lost
                  )}
                </TableCell>
                <TableCell>
                  {editingId === team.id ? (
                    <TextField
                      type="number"
                      value={teamData.streak}
                      name="streak"
                      onChange={handleChange}
                    />
                  ) : (
                    team.streak
                  )}
                </TableCell>
                <TableCell>
                  {editingId === team.id ? (
                    <TextField
                      type="number"
                      value={teamData.ppg}
                      name="ppg"
                      onChange={handleChange}
                    />
                  ) : (
                    team.ppg
                  )}
                </TableCell>
                <TableCell>
                  {editingId === team.id ? (
                    <IconButton color="primary" onClick={handleSave}>
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton color="primary" onClick={() => handleEdit(team)}>
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminStanding;
