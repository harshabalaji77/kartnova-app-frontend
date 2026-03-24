import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductList } from '../components/ProductList';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import heroLogoImage from '../assets/hero-logo-image.jpg';
import '../styles/styles.css';

export default function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState('');
  const [cartError, setCartError] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    fetchMixedProducts();
    if (username) {
      fetchCartCount();
    }
  }, [username]);

  const fetchMixedProducts = async () => {
    try {
      const response = await fetch(
        `/api/products?limit=12`, 
        { credentials: 'include' }
      );
      const data = await response.json();
      if(data) {
        setUsername(data.user?.name || 'Guest');
        // Ensure only 12 products are displayed
        const limitedProducts = (data.products || []).slice(0, 12);
        setProducts(limitedProducts);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
  };

  const fetchCartCount = async () => {
    setIsCartLoading(true);
    try {
      const response = await fetch(`/api/cart/items/count?username=${username}`, {
        credentials: 'include',
      });
      const count = await response.json();
      setCartCount(count);
      setCartError(false);
    } catch (error) {
      console.error('Error fetching cart count:', error);
      setCartError(true);
    } finally {
      setIsCartLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!username) {
      console.error('Username is required to add items to the cart');
      return;
    }
    try {
      const response = await fetch(`/api/cart/add`, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ username, productId }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        fetchCartCount();
      } else {
        console.error('Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleShopNow = () => {
    navigate('/products');
  };

  const handleLearnMore = () => {
    navigate('/about');
  };

  return (
    <div className="homepage">
      <Header
        cartCount={isCartLoading ? '...' : cartError ? 'Error' : cartCount}
        username={username}
      />
      
      {/* Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroLogoImage})` }}>
        <div className="hero-content">
          <div className="hero-text">
            <h1>Discover Your Perfect Unique Style</h1>
            <p>Explore our exclusive collection of premium products designed for modern lifestyle</p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={handleShopNow}>Shop Now</button>
              <button className="btn-secondary" onClick={handleLearnMore}>Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Check out our handpicked selection of amazing products</p>
        </div>
        <main className="main-content">
          <ProductList products={products} onAddToCart={handleAddToCart} />
        </main>
      </section>

      <Footer />
    </div>
  );
}
