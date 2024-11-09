import React, { useState, useEffect } from 'react';
import {
  Box, TextField, Button, Typography, Grid, Card, CardContent, IconButton,
  MenuItem, Select, InputLabel, FormControl, Avatar, Rating
} from '@mui/material';
import { db } from '../../../../../firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, getDocs, doc } from 'firebase/firestore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const ResultsAdmin = () => {
    const [teamA, setTeamA] = useState('');
    const [teamALogo, setTeamALogo] = useState('');
    const [teamB, setTeamB] = useState('');
    const [teamBLogo, setTeamBLogo] = useState('');
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);
    const [substitutionsA, setSubstitutionsA] = useState('');
    const [substitutionsB, setSubstitutionsB] = useState('');
    const [goalsA, setGoalsA] = useState([{ player: '', assist: '', minute: '' }]);
    const [goalsB, setGoalsB] = useState([{ player: '', assist: '', minute: '' }]);
    const [bookings, setBookings] = useState([]);
    const [manOfTheMatch, setManOfTheMatch] = useState({ player: '', clubLogo: '', rating: 0 });
    const [possessionA, setPossessionA] = useState(50);
    const [possessionB, setPossessionB] = useState(50);
    const [results, setResults] = useState([]);
    const [editId, setEditId] = useState(null);
  
    const fetchResults = async () => {
      const resultsCollection = collection(db, 'mlsResults');
      const resultsSnapshot = await getDocs(resultsCollection);
      const resultsList = resultsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setResults(resultsList);
    };
  
    useEffect(() => {
      fetchResults();
    }, []);
  
    const handleAddGoal = (team) => {
      if (team === 'A') {
        setGoalsA([...goalsA, { player: '', assist: '', minute: '' }]);
      } else {
        setGoalsB([...goalsB, { player: '', assist: '', minute: '' }]);
      }
    };
  
    const handleGoalChange = (team, index, field, value) => {
      const updatedGoals = team === 'A' ? [...goalsA] : [...goalsB];
      updatedGoals[index][field] = value;
      team === 'A' ? setGoalsA(updatedGoals) : setGoalsB(updatedGoals);
    };
  
    const handleSaveResult = async () => {
      try {
        const newResult = {
          teamA, teamALogo, teamB, teamBLogo, scoreA, scoreB, substitutionsA, substitutionsB,
          goalsA, goalsB, bookings, manOfTheMatch, possessionA, possessionB
        };
        if (editId) {
          const resultRef = doc(db, 'mlsResults', editId);
          await updateDoc(resultRef, newResult);
          setEditId(null);
        } else {
          await addDoc(collection(db, 'mlsResults'), newResult);
        }
        alert('Result saved successfully');
        resetForm();
        await fetchResults(); // Fetch results to update the list after save
      } catch (error) {
        console.error("Error saving result: ", error);
      }
    };
  
    const resetForm = () => {
      setTeamA('');
      setTeamALogo('');
      setTeamB('');
      setTeamBLogo('');
      setScoreA(0);
      setScoreB(0);
      setSubstitutionsA('');
      setSubstitutionsB('');
      setGoalsA([{ player: '', assist: '', minute: '' }]);
      setGoalsB([{ player: '', assist: '', minute: '' }]);
      setBookings([]);
      setManOfTheMatch({ player: '', clubLogo: '', rating: 0 });
      setPossessionA(50);
      setPossessionB(50);
      setEditId(null);
    };
  
    const handleEditResult = (result) => {
        setEditId(result.id);
        setTeamA(result.teamA || '');
        setTeamALogo(result.teamALogo || '');
        setTeamB(result.teamB || '');
        setTeamBLogo(result.teamBLogo || '');
        setScoreA(result.scoreA || 0);
        setScoreB(result.scoreB || 0);
        setSubstitutionsA(result.substitutionsA || '');
        setSubstitutionsB(result.substitutionsB || '');
        
        // Ensure goalsA and goalsB are arrays
        setGoalsA(Array.isArray(result.goalsA) ? result.goalsA : [{ player: '', assist: '', minute: '' }]);
        setGoalsB(Array.isArray(result.goalsB) ? result.goalsB : [{ player: '', assist: '', minute: '' }]);
      
        setBookings(result.bookings || []);
        setManOfTheMatch(result.manOfTheMatch || { player: '', clubLogo: '', rating: 0 });
        setPossessionA(result.possessionA || 50);
        setPossessionB(result.possessionB || 50);
      };
    const handleDeleteResult = async (id) => {
      try {
        const resultDoc = doc(db, 'mlsResults', id);
        await deleteDoc(resultDoc);
        setResults(results.filter(result => result.id !== id));
      } catch (error) {
        console.error('Error deleting results:', error);
      }
    };
  
  

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>{editId ? 'Edit Result' : 'Add Result'}</Typography>
      <Card sx={{ p: 3, mb: 4 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Team A Name" value={teamA} onChange={(e) => setTeamA(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Team A Logo" value={teamALogo} onChange={(e) => setTeamALogo(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Team B Name" value={teamB} onChange={(e) => setTeamB(e.target.value)} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Team B Logo" value={teamBLogo} onChange={(e) => setTeamBLogo(e.target.value)} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth type="number" label="Team A Score" value={scoreA} onChange={(e) => setScoreA(Number(e.target.value))} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth type="number" label="Team B Score" value={scoreB} onChange={(e) => setScoreB(Number(e.target.value))} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Substitutions Team A" value={substitutionsA} onChange={(e) => setSubstitutionsA(e.target.value)} helperText="Format: Player IN/OUT (minute)" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Substitutions Team B" value={substitutionsB} onChange={(e) => setSubstitutionsB(e.target.value)} helperText="Format: Player IN/OUT (minute)" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Goals Team A</Typography>
              {goalsA.map((goal, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Scorer"
                      value={goal.player}
                      onChange={(e) => handleGoalChange('A', index, 'player', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Assist"
                      value={goal.assist}
                      onChange={(e) => handleGoalChange('A', index, 'assist', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Minute"
                      value={goal.minute}
                      onChange={(e) => handleGoalChange('A', index, 'minute', e.target.value)}
                    />
                  </Grid>
                </Grid>
              ))}
              <Button onClick={() => handleAddGoal('A')}>Add Goal</Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Goals Team B</Typography>
              {goalsB.map((goal, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Scorer"
                      value={goal.player}
                      onChange={(e) => handleGoalChange('B', index, 'player', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Assist"
                      value={goal.assist}
                      onChange={(e) => handleGoalChange('B', index, 'assist', e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      label="Minute"
                      value={goal.minute}
                      onChange={(e) => handleGoalChange('B', index, 'minute', e.target.value)}
                    />
                  </Grid>
                </Grid>
              ))}
              <Button onClick={() => handleAddGoal('B')}>Add Goal</Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bookings"
                helperText="Format: Player (Yellow Card or Red Card)"
                value={bookings.join(', ')}
                onChange={(e) => setBookings(e.target.value.split(',').map(item => item.trim()))}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth type="number" label="Team A Possession (%)" value={possessionA} onChange={(e) => setPossessionA(Math.min(100, Math.max(0, Number(e.target.value))))} helperText="Must be between 0 and 100" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth type="number" label="Team B Possession (%)" value={possessionB} InputProps={{ readOnly: true }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Man of the Match</Typography>
              <TextField fullWidth label="Player Name" value={manOfTheMatch.player} onChange={(e) => setManOfTheMatch({ ...manOfTheMatch, player: e.target.value })} />
              <TextField fullWidth label="Club Logo URL" value={manOfTheMatch.clubLogo} onChange={(e) => setManOfTheMatch({ ...manOfTheMatch, clubLogo: e.target.value })} />
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Rating</InputLabel>
                <Select value={manOfTheMatch.rating} onChange={(e) => setManOfTheMatch({ ...manOfTheMatch, rating: e.target.value })}>
                  <MenuItem value={1}>1 Star</MenuItem>
                  <MenuItem value={2}>2 Stars</MenuItem>
                  <MenuItem value={3}>3 Stars</MenuItem>
                  <MenuItem value={4}>4 Stars</MenuItem>
                  <MenuItem value={5}>5 Stars</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button variant="contained" sx={{ mt: 3 }} onClick={handleSaveResult}>
            {editId ? 'Update Result' : 'Save Result'}
          </Button>
        </CardContent>
      </Card>

      <Typography variant="h5" gutterBottom>Match Results</Typography>
      <Grid container spacing={2}>
        {results.map((result) => (
          <Grid item xs={12} md={6} key={result.id}>
            <Card sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
              <Box>
                <Typography variant="h6">{result.teamA} vs {result.teamB}</Typography>
                <Typography>Score: {result.scoreA} - {result.scoreB}</Typography>
                <Typography>Possession: {result.possessionA}% - {result.possessionB}%</Typography>
              </Box>
              <Box>
                <IconButton onClick={() => handleEditResult(result)}><EditIcon /></IconButton>
                <IconButton onClick={() => handleDeleteResult(result.id)}><DeleteIcon /></IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ResultsAdmin;
