import React, { useEffect, useState } from 'react';
import MLSNavbar from '../Navbar/MLSNavbar';
import {
  Box, Typography, Grid, Card, CardMedia, Avatar, Divider, Modal, CircularProgress, Rating,
} from '@mui/material';
import { db } from '../../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const resultsCollection = collection(db, 'mlsResults');
        const resultsSnapshot = await getDocs(resultsCollection);
        const resultsList = resultsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setResults(resultsList);
      } catch (error) {
        setError('Failed to fetch results.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const handleOpenModal = (result) => {
    setSelectedResult(result);
  };

  const handleCloseModal = () => {
    setSelectedResult(null);
  };

  return (
    <div>
      <MLSNavbar />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: 'center', padding: 2 }}>
          <Typography color="error" variant="body1">{error}</Typography>
        </Box>
      ) : (
        <>
          <Box sx={{ textAlign: 'center', padding: 2 }}>
            <Typography variant="h4" gutterBottom>Game Week 1</Typography>
          </Box>
          <Grid container spacing={3} justifyContent="center">
            {results.map((result) => (
              <Grid item xs={12} md={5} key={result.id}>
                <Card
                  sx={{
                    padding: 2,
                    width: '30rem',
                    fontFamily: 'Roboto Mono, monospace',
                    textAlign: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    '&:hover': {
                      boxShadow: '0 6px 18px rgba(0,0,0,0.15)',
                    },
                  }}
                  onClick={() => handleOpenModal(result)}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 80, height: 80, objectFit: 'contain' }}
                        image={result.teamALogo}
                        alt={`${result.teamA} logo`}
                      />
                      <Typography variant="body1" sx={{ marginTop: 1 }}>{result.teamA}</Typography>
                    </Box>
                    <Typography variant="h6">{result.scoreA} - {result.scoreB}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <CardMedia
                        component="img"
                        sx={{ width: 80, height: 80, objectFit: 'contain' }}
                        image={result.teamBLogo}
                        alt={`${result.teamB} logo`}
                      />
                      <Typography variant="body1" sx={{ marginTop: 1 }}>{result.teamB}</Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      <Modal
        open={!!selectedResult}
        onClose={handleCloseModal}
        closeAfterTransition
      >
        <Box
          sx={{
            p: 4,
            maxWidth: 600,
            mx: 'auto',
            mt: 10,
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            outline: 'none',
          }}
        >
          {selectedResult && (
            <>
              <Typography variant="h5" align="center" gutterBottom>
                {selectedResult.teamA} vs {selectedResult.teamB}
              </Typography>
              <Divider sx={{ my: 2 }} />

              {/* Goals Section */}
              <Typography variant="subtitle1" gutterBottom>Goals</Typography>
              {Array.isArray(selectedResult.goalsA) ? (
                selectedResult.goalsA.map((goal, index) => (
                  <Typography key={index} variant="body2" color="text.secondary">
                    {selectedResult.teamA}: {goal.player} (Assist: {goal.assist}, Min: {goal.minute})
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">{selectedResult.teamA}: No goals</Typography>
              )}
              {Array.isArray(selectedResult.goalsB) ? (
                selectedResult.goalsB.map((goal, index) => (
                  <Typography key={index} variant="body2" color="text.secondary">
                    {selectedResult.teamB}: {goal.player} (Assist: {goal.assist}, Min: {goal.minute})
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">{selectedResult.teamB}: No goals</Typography>
              )}
              <Divider sx={{ my: 2 }} />

              {/* Substitutions Section */}
              <Typography variant="subtitle1" gutterBottom>Substitutions</Typography>
              <Typography variant="body2" color="text.secondary">{selectedResult.teamA}: {selectedResult.substitutionsA || 'N/A'}</Typography>
              <Typography variant="body2" color="text.secondary">{selectedResult.teamB}: {selectedResult.substitutionsB || 'N/A'}</Typography>
              <Divider sx={{ my: 2 }} />

              {/* Bookings Section */}
              <Typography variant="subtitle1" gutterBottom>Bookings</Typography>
              {selectedResult.bookings && selectedResult.bookings.length > 0 ? (
                selectedResult.bookings.map((booking, index) => (
                  <Typography key={index} variant="body2" color="text.secondary">
                    {booking}
                  </Typography>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">No bookings</Typography>
              )}
              <Divider sx={{ my: 2 }} />

              {/* Man of the Match Section */}
              {selectedResult.manOfTheMatch && (
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar src={selectedResult.manOfTheMatch.clubLogo} alt={selectedResult.manOfTheMatch.player} />
                  <Box>
                    <Typography variant="subtitle1">Man of the Match</Typography>
                    <Typography variant="body2">{selectedResult.manOfTheMatch.player}</Typography>
                    <Rating value={selectedResult.manOfTheMatch.rating} readOnly />
                  </Box>
                </Box>
              )}
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Results;
