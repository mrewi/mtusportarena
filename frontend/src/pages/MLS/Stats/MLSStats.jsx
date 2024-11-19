import React from 'react';
import MLSNavbar from '../Navbar/MLSNavbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const MLSStats = () => {
  // Sample data
  const statsData = [
    { sn: 1, name: 'Atisola Daniel', club: 'Olukoya Stars', goals: 0, assists: 2, yellowCards: 1, cleanSheets: 0 },
    { sn: 2, name: 'Zino', club: 'Olukoya Stars', goals: 3, assists: 1, yellowCards: 0, cleanSheets: 0 },
    { sn: 2, name: 'Delight', club: 'Olukoya Stars', goals: 0, assists: 1, yellowCards: 1, cleanSheets: 0 },
    { sn: 2, name: 'Cabaman', club: 'Olukoya Stars', goals: 0, assists: 0, yellowCards: 0, cleanSheets: 1 },
    { sn: 2, name: 'Ipetan', club: 'Olukoya Stars', goals: 2, assists: 1, yellowCards: 0, cleanSheets: 0 },
    { sn: 3, name: 'Chisom', club: 'Olurin United', goals: 5, assists: 0, yellowCards: 2, cleanSheets: 0 },
    { sn: 3, name: 'Husswin Anson', club: 'Olurin United', goals: 1, assists: 0, yellowCards: 0, cleanSheets: 0 },
    { sn: 3, name: 'AY', club: 'Olurin United', goals: 0, assists: 0, yellowCards: 1, cleanSheets: 0 },
    { sn: 3, name: 'Dickson Wright', club: 'Olurin United', goals: 0, assists: 0, yellowCards: 1, cleanSheets: 0 },
    { sn: 3, name: 'Michael', club: 'Olurin United', goals: 0, assists: 0, yellowCards: 1, cleanSheets: 0 },
    { sn: 3, name: 'Manchi', club: 'Olurin United', goals: 0, assists: 0, yellowCards: 1, cleanSheets: 0 },
    { sn: 3, name: 'Aderonmu Segun', club: 'Olurin United', goals: 0, assists: 4, yellowCards: 2, cleanSheets: 0 },
    { sn: 3, name: 'Irantiola Reuben', club: 'Olurin United', goals: 1, assists: 0, yellowCards: 1, cleanSheets: 0 },
    { sn: 3, name: 'Olumide', club: 'Ayolabi Boys', goals: 1, assists: 0, yellowCards: 1, cleanSheets: 0 },
    { sn: 3, name: 'Kay', club: 'Ayolabi Boys', goals: 1, assists: 1, yellowCards: 1, cleanSheets: 0 },
    { sn: 3, name: 'Kush', club: 'Ayolabi Boys', goals: 2, assists: 0, yellowCards: 0, cleanSheets: 0 },
    { sn: 3, name: 'Agbo David', club: 'Ayolabi Boys', goals: 1, assists: 1, yellowCards: 0, cleanSheets: 0 },
    { sn: 3, name: 'Olowofoyekun', club: 'Ayolabi Boys', goals: 1, assists: 0, yellowCards: 0, cleanSheets: 0 },
    { sn: 3, name: 'Joshua Igotun', club: 'Ayolabi Boys', goals: 1, assists: 1, yellowCards: 0, cleanSheets: 0 },
    { sn: 3, name: 'Harla Alabi', club: 'Abiala Giants', goals: 0, assists: 0, yellowCards: 0, cleanSheets: 1 },
  ];

  // Sorting and filtering functions
  const sortedByGoals = [...statsData].filter((player) => player.goals > 0).sort((a, b) => b.goals - a.goals);
  const sortedByAssists = [...statsData].filter((player) => player.assists > 0).sort((a, b) => b.assists - a.assists);
  const sortedByYellowCards = [...statsData].filter((player) => player.yellowCards > 0).sort((a, b) => b.yellowCards - a.yellowCards);
  const sortedByCleanSheets = [...statsData].filter((player) => player.cleanSheets > 0).sort((a, b) => b.cleanSheets - a.cleanSheets);

  const tableStyle = {
    border: '1px solid #ddd',
    margin: '10px',
    textAlign: 'center',
  };

  const headerStyle = {
    backgroundColor: 'purple',
    color: 'white',
  };

  return (
    <div>
      <MLSNavbar />
      <Typography sx={{ padding: '16px', fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>PLAYERS STATS</Typography>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', padding: '20px' }}>
        {/* Table 1: Goals */}
        <TableContainer component={Paper} style={tableStyle}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={headerStyle}>Name</TableCell>
                <TableCell style={headerStyle}>Club</TableCell>
                <TableCell style={headerStyle}>Goals</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedByGoals.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.club}</TableCell>
                  <TableCell>{row.goals}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table 2: Assists */}
        <TableContainer component={Paper} style={tableStyle}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={headerStyle}>Name</TableCell>
                <TableCell style={headerStyle}>Club</TableCell>
                <TableCell style={headerStyle}>Assists</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedByAssists.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.club}</TableCell>
                  <TableCell>{row.assists}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table 3: Yellow Cards */}
        <TableContainer component={Paper} style={tableStyle}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={headerStyle}>Name</TableCell>
                <TableCell style={headerStyle}>Club</TableCell>
                <TableCell style={headerStyle}>Yellow Cards</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedByYellowCards.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.club}</TableCell>
                  <TableCell>{row.yellowCards}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Table 4: Clean Sheets */}
        <TableContainer component={Paper} style={tableStyle}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={headerStyle}>Name</TableCell>
                <TableCell style={headerStyle}>Club</TableCell>
                <TableCell style={headerStyle}>Clean Sheets</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedByCleanSheets.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.club}</TableCell>
                  <TableCell>{row.cleanSheets}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default MLSStats;
