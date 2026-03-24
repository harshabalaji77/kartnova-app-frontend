import React, { useState, useEffect } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import '../styles/styles.css';

export default function AboutPage() {
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState('');
  const [cartError, setCartError] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    fetchUserInfo();
    if (username) {
      fetchCartCount();
    }
  }, [username]);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(
        `/api/products`, 
        { credentials: 'include' }
      );
      const data = await response.json();
      if(data) {
        setUsername(data.user?.name || 'Guest');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      setUsername('Guest');
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

  return (
    <div className="about-page">
      <Header
        cartCount={isCartLoading ? '...' : cartError ? 'Error' : cartCount}
        username={username}
      />
      
      <main className="about-main">
        <section className="about-hero">
          <div className="about-hero-content">
            <h1>About Kartnova</h1>
            <p>Your trusted partner in online shopping</p>
          </div>
        </section>

        <section className="about-content">
          <div className="about-section">
            <h2>Our Story</h2>
            <p>
              Founded in 2024, Kartnova emerged from a simple vision: to make online shopping accessible, 
              secure, and enjoyable for everyone. What started as a small team of passionate individuals 
              has grown into a trusted e-commerce platform serving thousands of customers across the country.
            </p>
            <p>
              Our journey began with a commitment to quality and customer satisfaction. We carefully 
              curated our product selection, focusing on items that meet our high standards for quality, 
              value, and reliability. Today, we continue to expand our offerings while maintaining the 
              same dedication to excellence that defined our early days.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Mission & Vision</h2>
            <p>
              At Kartnova, our mission is to revolutionize the online shopping experience by combining 
              convenience, quality, and exceptional service. We believe that shopping should be a 
              delightful experience, not a chore. That's why we've built a platform that makes it easy 
              to find exactly what you're looking for, with competitive prices and reliable delivery.
            </p>
            <p>
              Our vision is to become the most trusted and customer-centric e-commerce destination, 
              where quality meets affordability and service exceeds expectations. We're not just selling 
              products; we're building relationships and creating a community of satisfied customers.
            </p>
          </div>

          <div className="about-section">
            <h2>What Sets Us Apart</h2>
            <p>
              What makes Kartnova different? It's our unwavering commitment to you, our customer. 
              We understand that you have choices when it comes to online shopping, which is why we 
              go above and beyond to ensure your experience with us is nothing short of exceptional.
            </p>
            <p>
              From our carefully selected product range to our secure payment systems and fast delivery 
              options, every aspect of Kartnova is designed with your needs in mind. We offer competitive 
              prices, regular promotions, and a customer support team that's always ready to help. 
              Plus, our easy returns policy ensures you can shop with confidence.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Values</h2>
            <p>
              Our values guide everything we do at Kartnova. We believe in quality, which means every 
              product on our platform meets rigorous standards. We value trust, building relationships 
              through transparency and reliability in all our interactions. Innovation drives us to 
              continuously improve our platform and services, staying ahead of industry trends and 
              customer needs.
            </p>
            <p>
              Above all, we're customer-focused. Your satisfaction isn't just a goal—it's our top 
              priority. We listen to your feedback, learn from your experiences, and constantly work 
              to make Kartnova better for you.
            </p>
          </div>

          <div className="about-section">
            <h2>Get In Touch</h2>
            <p>
              We love hearing from our customers! Whether you have questions, feedback, or suggestions, 
              we're here to listen and help. Your input helps us improve and serve you better.
            </p>
            <p>
              Reach out to us at <strong>support@kartnova.com</strong> or call us at 
              <strong>1-800-KARTNOVA</strong>. Our customer service team is available Monday through 
              Friday, 9 AM to 6 PM, to assist you with any inquiries.
            </p>
            <p>
              Visit our headquarters at <strong>123 Commerce Street, Tech City, TC 12345</strong> if 
              you'd like to meet our team or learn more about what we do. We'd love to show you 
              around and share our passion for e-commerce excellence.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
