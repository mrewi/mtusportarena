import React, { useState, useEffect } from 'react';
import { db } from '../../../../../firebaseConfig'; // Adjust this to your Firebase config path
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const MLSStandingsManagement = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [groupATeams, setGroupATeams] = useState([]);
  const [groupBTeams, setGroupBTeams] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      const standingsCollection = collection(db, 'mlsStandings');
      const standingsSnapshot = await getDocs(standingsCollection);
      const standingsList = standingsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Filter into Group A and Group B
      setGroupATeams(standingsList.filter(team => team.group === 'A'));
      setGroupBTeams(standingsList.filter(team => team.group === 'B'));
      setStandings(standingsList);
      setLoading(false);
    };
    fetchStandings();
  }, []);

  const handleOpen = (team = null) => {
    setCurrentTeam(
      team || {
        teamName: '',
        group: 'A', // Default group, adjust as needed
        played: 0,
        won: 0,
        draw: 0,
        lost: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        points: 0,
      }
    );
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleFieldChange = (field, value) => {
    setCurrentTeam(prev => ({ ...prev, [field]: parseInt(value) || 0 }));
  };

  const handleSave = async () => {
    if (currentTeam.id) {
      const teamRef = doc(db, 'mlsStandings', currentTeam.id);
      await updateDoc(teamRef, currentTeam);
    } else {
      const standingsCollection = collection(db, 'mlsStandings');
      await addDoc(standingsCollection, currentTeam);
    }
    setOpen(false);
    window.location.reload();
  };

  const renderTable = (teams, title) => (
    <TableContainer component={Paper} sx={{ maxWidth: 1000, margin: 'auto', mt: 4 }}>
      <h2 style={{ textAlign: 'center' }}>{title}</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Club</TableCell>
            <TableCell>Played</TableCell>
            <TableCell>Won</TableCell>
            <TableCell>Draw</TableCell>
            <TableCell>Lost</TableCell>
            <TableCell>GF</TableCell>
            <TableCell>GA</TableCell>
            <TableCell>GD</TableCell>
            <TableCell>Points</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teams.map((team) => (
            <TableRow key={team.id}>
              <TableCell>{team.teamName}</TableCell>
              <TableCell>{team.played}</TableCell>
              <TableCell>{team.won}</TableCell>
              <TableCell>{team.draw}</TableCell>
              <TableCell>{team.lost}</TableCell>
              <TableCell>{team.gf}</TableCell>
              <TableCell>{team.ga}</TableCell>
              <TableCell>{team.gd}</TableCell>
              <TableCell>{team.points}</TableCell>
              <TableCell>
                <Button variant="contained" color="secondary" onClick={() => handleOpen(team)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => handleOpen()}>
        Create New Team
      </Button>
      {renderTable(groupATeams, 'Group A Standings')}
      {renderTable(groupBTeams, 'Group B Standings')}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentTeam?.id ? 'Edit Team' : 'Create New Team'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Club Name"
            type="text"
            fullWidth
            value={currentTeam?.teamName || ''}
            onChange={(e) => setCurrentTeam({ ...currentTeam, teamName: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Group"
            type="text"
            fullWidth
            value={currentTeam?.group || ''}
            onChange={(e) => setCurrentTeam({ ...currentTeam, group: e.target.value })}
          />
          {['played', 'won', 'draw', 'lost', 'gf', 'ga', 'gd', 'points'].map((field) => (
            <TextField
              key={field}
              margin="dense"
              label={field.toUpperCase()}
              type="number"
              fullWidth
              value={currentTeam?.[field] || 0}
              onChange={(e) => handleFieldChange(field, e.target.value)}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MLSStandingsManagement;
