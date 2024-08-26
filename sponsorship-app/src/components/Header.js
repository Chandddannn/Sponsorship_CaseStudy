
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const auth = localStorage.getItem('auth');
  const user = auth ? JSON.parse(auth) : null;

  const handleLogout = () => {
    localStorage.removeItem('auth');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="nav-container">
        <div className="user-info-container">
          {user && <span className="welcome">Welcome, {user.username}</span>}
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink></li>
            <li><NavLink to="/sponsor-payment-summary" className="nav-link" activeClassName="active">Sponsor Payment Summary</NavLink></li>
            <li><NavLink to="/match-payment-summary" className="nav-link" activeClassName="active">Match Payment Summary</NavLink></li>
            <li><NavLink to="/match-count-summary" className="nav-link" activeClassName="active">Match Count Summary</NavLink></li>
            <li><NavLink to="/add-payment" className="nav-link" activeClassName="active">Add Payment</NavLink></li>
          </ul>
        </nav>
        <div className="logout-container">
          {user && <button className="logout-button" onClick={handleLogout}>Logout</button>}
        </div>
      </div>
    </header>
  );
};

export default Header;
