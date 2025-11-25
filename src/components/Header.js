import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-content container-wide">
        <Link to="/" className="logo">
          <img src="/pet_heaven_logo.PNG" alt="Pet Heaven Logo" className="logo-image" />
          <span className="logo-text">Pet Heaven</span>
        </Link>

        <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <ul className="nav-list">
            <li><Link to="/" className={isActive('/')} onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
            <li><Link to="/about" className={isActive('/about')} onClick={() => setMobileMenuOpen(false)}>About</Link></li>
            <li><Link to="/pets" className={isActive('/pets')} onClick={() => setMobileMenuOpen(false)}>Adopt</Link></li>
            <li><Link to="/release" className={isActive('/release')} onClick={() => setMobileMenuOpen(false)}>Release Pet</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          {user ? (
            <div className="user-menu">
              <span className="user-name">Welcome, {user.name || user.email}</span>
              <button onClick={onLogout} className="btn btn-secondary btn-sm">Logout</button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-secondary btn-sm">Login</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Register</Link>
            </div>
          )}
        </div>

        <button
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
};

export default Header;
