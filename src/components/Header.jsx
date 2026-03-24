import React from 'react';
import { Link } from 'react-router-dom';
import { CartIcon } from './CartIcon';
import { ProfileDropdown } from './ProfileDropdown';
import '../styles/styles.css';
import Logo from './Logo';

// Icons for navbar
const HomeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const ProductsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 7h-9"></path>
    <path d="M14 17H5"></path>
    <circle cx="17" cy="17" r="3"></circle>
    <circle cx="7" cy="7" r="3"></circle>
  </svg>
);

const AboutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

export function Header({ cartCount, username }) {
  return (
    <header className="header">
      <div className="header-content">
        <Logo />
        <nav className="header-nav">
          <Link to="/home" className="nav-link">
            <HomeIcon />
            <span>Home</span>
          </Link>
          <Link to="/products" className="nav-link">
            <ProductsIcon />
            <span>Products</span>
          </Link>
          <Link to="/about" className="nav-link">
            <AboutIcon />
            <span>About</span>
          </Link>
        </nav>
        <div className="header-actions">
          <CartIcon count={cartCount} />
          <ProfileDropdown username={username} />
        </div>
      </div>
    </header>
  );
}