// CategoryNavigation.jsx
import React, { useState } from 'react';
import '../styles/styles.css';

const categories = ['Shirts', 'Pants', 'Accessories', 'Mobiles', 'Mobile Accessories'];

export function CategoryNavigation({ onCategoryClick }) {
  const [active, setActive] = useState(categories[0]);

  const handleClick = (category) => {
    setActive(category);
    onCategoryClick?.(category);
  };

  return (
    <nav className="category-navigation">
      <ul className="category-list">
        {categories.map((category) => (
          <li
            key={category}
            className={`category-item ${active === category ? 'active' : ''}`}
            onClick={() => handleClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </nav>
  );
}