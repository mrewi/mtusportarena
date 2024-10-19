// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebaseConfig'; // Adjust the path to your firebase.js file
import { useNavigate } from 'react-router-dom';

const MBLAdminSignin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // On successful sign-in, redirect to the admin dashboard
      navigate('/mbl/admin-dashboard');
    } catch {
      setError('Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'grey.100',
        padding: 3
      }}
    >
      <Typography variant="h4" sx={{ mb: 3, fontFamily: 'Roberto Mono, Monospace' }}>
        Admin Sign In
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box
        component="form"
        onSubmit={handleSignIn}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}
      >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{ fontFamily: 'Roberto Mono, Monospace', backgroundColor: 'purple', color: 'white' }}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </Box>
    </Box>
  );
};

export default MBLAdminSignin;
