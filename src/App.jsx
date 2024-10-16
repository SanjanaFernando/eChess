import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Hero from './components/Hero';
import Login from './components/Login';
import Signup from './components/Signup';
import Payment from './components/Payment';
import ChessGame from './components/ChessGame';
import './App.css';
import SignupOrganizer from './components/SignupOrganizer';
import PlayerDashboard from './components/Playerdashboard';
import TournamentRegistration from './components/TournamentRegistration';

const App = () => {
  return (
    <Router>
      <div>

        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/chessgame" element={<ChessGame />} />
            <Route path="/playerdashboard" element={<PlayerDashboard />} />
            <Route path="/signuporganizer" element={<SignupOrganizer />} />
            <Route path="/tr" element={<TournamentRegistration/>}/>
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
