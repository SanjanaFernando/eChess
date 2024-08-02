import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Hero from './components/Hero';
import Login from './components/Login';
import Signup from './components/Signup';
import Payment from './components/Payment';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="bg-blue-500 p-4">
          <ul className="flex justify-center space-x-4">
            <li>
              <Link to="/" className="text-white text-lg hover:text-gray-200">Home</Link>
            </li>
            <li>
              <Link to="/login" className="text-white text-lg hover:text-gray-200">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="text-white text-lg hover:text-gray-200">Signup</Link>
            </li>
            <li>
              <Link to="/payment" className="text-white text-lg hover:text-gray-200">Payment</Link>
            </li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
