// Footer.jsx
import React from 'react';
import '../styles/styles.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-content">
          <div className="footer-center">
            <h3 className="footer-title">KartNova</h3>
            <p className="footer-tagline">Simplifying shopping, one place at a time.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="text-center">&copy; 2026 KartNova. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}