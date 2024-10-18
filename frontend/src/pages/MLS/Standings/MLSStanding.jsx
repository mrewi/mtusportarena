// eslint-disable-next-line no-unused-vars
import React from 'react'
import MLSNavbar from '../Navbar/MLSNavbar'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const Standing = () => {
  // Sample data for the standings table
  const teams = [
    { name: 'Abiala Giants', played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    { name: 'Olukoya Boys', played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    { name: 'Ojo Eagles', played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    { name: 'Adeshina FC', played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    { name: 'Young Stars', played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    { name: 'Olurin United', played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    { name: 'Gbenro Ballers', played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 },
    { name: 'Ayolabi Boys', played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 },
  ]

  return (
    <div>
      <MLSNavbar />
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto', mt: 4 }}>
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
            <TableRow key={team.name}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{team.name}</TableCell>
              <TableCell>{team.played}</TableCell>
              <TableCell>{team.won}</TableCell>
              <TableCell>{team.draw}</TableCell>
              <TableCell>{team.lost}</TableCell>
              <TableCell>{team.gf}</TableCell>
              <TableCell>{team.ga}</TableCell>
              <TableCell>{team.gd}</TableCell>
              <TableCell>{team.points}</TableCell>
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