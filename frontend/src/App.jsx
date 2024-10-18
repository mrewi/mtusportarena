// eslint-disable-next-line no-unused-vars
import React from 'react'
import './index.css'
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom'
// import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import Home from './pages/Home'
import MLSHome from './pages/MLS/Home/MLSHome'
import MBLHome from './pages/MBL/Home/MBLHome'
import MLSPlayers from './pages/MLS/Players/MLSPlayers'
import MBLPlayers from './pages/MBL/Players/MBLPlayers'
import MLSMatches from './pages/MLS/Matches/MLSMatches'
import MBLMatches from './pages/MBL/Matches/MBLMatches'
import MLSResults from './pages/MLS/Results/MLSResults'
import MBLResults from './pages/MBL/Results/MBLResults'
import MLSStandings from './pages/MLS/Standings/MLSStanding'
import MBLStandings from './pages/MBL/Standings/MBLStandings'
import MLSNews from './pages/MLS/News/MLSNews'
import MBLNews from './pages/MBL/News/MBLNews'
import MLSStats from './pages/MLS/Stats/MLSStats'
import MBLStats from './pages/MBL/Stats/MBLStats'
import MLSTransfers from './pages/MLS/Transfers/MLSTransfers'
import MBLTransfers from './pages/MBL/Transfers/MBLTransfers'
import MLSClubs from './pages/MLS/Club/MLSClubs'
import MBLClubs from './pages/MBL/Clubs/MBLClubs'
import MLSAdminSignin from './pages/MLS/Admin/MLSAdminSignin'

// import Navbar from './components/Navbar/Navbar'

const App = () => {

  // const location = useLocation();
  // const noNavbarPaths = ['/mls/home'];
  return (
    <Router>
      <div>

      {/* {!noNavbarPaths.includes(location.pathname) && ( */}
        {/* <Navbar /> */}
      {/* )} */}

        {/* Routing */}
        <Routes>
          <Route path="/" element={<Home />} />

          {/* mls routing */}
          <Route path="/mls/home" element={<MLSHome />} />
          <Route path="/mls/players" element={<MLSPlayers />} />
          <Route path="/mls/matches" element={<MLSMatches />} />
          <Route path="/mls/results" element={<MLSResults />} />
          <Route path="/mls/standings" element={<MLSStandings />} />
          <Route path="/mls/stats" element={<MLSStats />} />
          <Route path="/mls/transfers" element={<MLSTransfers />} />
          <Route path="/mls/news" element={<MLSNews />} />
          <Route path="/mls/clubs" element={<MLSClubs />} />

          {/* mbl routing */}
          <Route path="/mbl/home" element={<MBLHome />} />
          <Route path="/mbl/players" element={<MBLPlayers />} />
          <Route path="/mbl/matches" element={<MBLMatches />} />
          <Route path="/mbl/results" element={<MBLResults />} />
          <Route path="/mbl/standings" element={<MBLStandings />} />
          <Route path="/mbl/stats" element={<MBLStats />} />
          <Route path="/mbl/transfers" element={<MBLTransfers />} />
          <Route path="/mbl/news" element={<MBLNews />} />
          <Route path="/mbl/clubs" element={<MBLClubs />} />

          {/* admin auth */}
          <Route path="/admin-auth" element={<MLSAdminSignin />} />


          
          {/* <Route path="/sign-in" element={<SignIn />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}

        </Routes>
      </div>
    </Router>
  )
}

export default App

