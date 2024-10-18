// eslint-disable-next-line no-unused-vars
import React from 'react'
import MBLNavbar from '../Navbar/MBLNavbar'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const Standing = () => {
  // Sample data for the standings table
  const teams = [
    { name: 'Abiala Bucks', won: 0, lost: 0, streak: 0, ppg: 0},
    { name: 'Adeshina Hawks', won: 0, lost: 0, streak: 0, ppg: 0},
    { name: 'Olukoya Eagles', won: 0, lost: 0, streak: 0, ppg: 0},
    { name: 'Olurin Hornets', won: 0, lost: 0, streak: 0, ppg: 0},
    { name: 'Young Pelicans', won: 0, lost: 0, streak: 0, ppg: 0},
  ]

  return (
    <div>
      <MBLNavbar />
    <TableContainer component={Paper} sx={{ fontFamily:'Roberto Mono, Monospace',maxWidth: 800, margin: 'auto', mt: 4 }}>
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
            <TableRow key={team.name}>
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
  )
}

export default Standing


// const players = [
//   { name: 'Player 1', position: 'Forward', club: 'Abiala Giants', rating: 90, jersey: 9, appearances: 20, goals: 15, assists: 7, cleanSheets: null },
//   { name: 'Player 2', position: 'Midfielder', club: 'Olukoya Boys', rating: 88, jersey: 8, appearances: 18, goals: 5, assists: 10, cleanSheets: null },
//   { name: 'Player 3', position: 'Defender', club: 'Ojo Eagles', rating: 85, jersey: 5, appearances: 22, goals: 2, assists: 3, cleanSheets: null },
//   { name: 'Player 4', position: 'Goalkeeper', club: 'Adeshina', rating: 92, jersey: 1, appearances: 20, goals: 0, assists: 0, cleanSheets: 12 },
//   { name: 'Player 5', position: 'Forward', club: 'Young Stars', rating: 89, jersey: 10, appearances: 19, goals: 12, assists: 8, cleanSheets: null },
//   // Add the remaining players as needed
// ]