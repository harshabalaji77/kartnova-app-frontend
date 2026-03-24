import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

export function CartIcon({ count }) {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/cart'); // Navigate to the cart page
  };

  return (
    <div className="cart-icon" onClick={handleCartClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="cart-icon-svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
        <circle cx="8" cy="21" r="1" fill="currentColor" />
        <circle cx="16" cy="21" r="1" fill="currentColor" />
      </svg>
      <span className="cart-badge">{count}</span> {/* Always display the count */}
    </div>
  );
}