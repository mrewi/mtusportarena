// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Box, Grid, Card, CardContent, CardActions, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const options = [
    { name: 'Home', path: '/mbl/admin-dashboard/home' },
    { name: 'Players', path: '/mbl/admin-dashboard/players' },
    { name: 'Fixtures', path: '/mbl/admin-dashboard/fixtures' },
    { name: 'Results', path: '/mbl/admin-dashboard/results' },
    { name: 'Standings', path: '/mbl/admin-dashboard/standings' },
    { name: 'Stats', path: '/mbl/admin-dashboard/stats' },
    { name: 'Transfers', path: '/mbl/admin-dashboard/transfers' },
    { name: 'News', path: '/mbl/admin-dashboard/news' },
    { name: 'Clubs', path: '/mbl/admin-dashboard/clubs' },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 4, fontFamily: 'Roberto Mono, Monospace' }}>
        MBL Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {options.map((option) => (
          <Grid item xs={12} sm={6} md={4} key={option.name}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {option.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Manage {option.name.toLowerCase()} in the application.
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={Link} to={option.path} size="small">
                  Go to {option.name}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
