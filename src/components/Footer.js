import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content container-wide">
        <div className="footer-grid">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🐾</span>
              <span className="logo-text">Pet Heaven</span>
            </div>
            <p className="footer-description">
              Dedicated to finding loving forever homes for abandoned pets. 
              Every animal deserves a second chance at happiness.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/pets">Adopt a Pet</Link></li>
              <li><Link to="/release">Release a Pet</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Get Involved</h4>
            <ul className="footer-links">
              <li><Link to="/register">Become a Member</Link></li>
              <li><a href="#donate">Donate</a></li>
              <li><a href="#volunteer">Volunteer</a></li>
              <li><a href="#events">Events</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="footer-contact">
              <li>📍 123 Pet Heaven Lane, Animal City</li>
              <li>📞 +65 8888 0888</li>
              <li>✉️ petheaven@gmail.com</li>
              <li>🕒 Mon-Sat: 9AM - 6PM</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Pet Heaven. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;