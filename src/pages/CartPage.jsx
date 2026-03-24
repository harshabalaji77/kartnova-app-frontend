import React, { useEffect, useState } from "react";
import "../styles/CartPage.css";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useNavigate } from "react-router-dom";

const TrashIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [overallPrice, setOverallPrice] = useState(0);
  const [username, setUsername] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(`/api/cart/items`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch cart items");
        const data = await response.json();

        setCartItems(
          data?.cart?.products.map((item) => ({
            ...item,
            total_price: parseFloat(item.total_price).toFixed(2),
            price_per_unit: parseFloat(item.price_per_unit).toFixed(2),
          })) || []
        );
        setOverallPrice(parseFloat(data?.cart?.overall_total_price || 0).toFixed(2));
        setUsername(data?.username || "");
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const total = cartItems
      .reduce((total, item) => total + parseFloat(item.total_price), 0)
      .toFixed(2);
    setSubtotal(total);
  }, [cartItems]);

  const handleRemoveItem = async (productId) => {
    try {
      const response = await fetch(`/api/cart/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, productId }),
      });
      if (response.status === 204) {
        setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));
      } else throw new Error("Failed to remove item");
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      if (newQuantity <= 0) {
        handleRemoveItem(productId);
        return;
      }
      const response = await fetch(`/api/cart/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, productId, quantity: newQuantity }),
      });
      if (response.ok) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.product_id === productId
              ? {
                  ...item,
                  quantity: newQuantity,
                  total_price: (item.price_per_unit * newQuantity).toFixed(2),
                }
              : item
          )
        );
      } else throw new Error("Failed to update quantity");
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const requestBody = {
        totalAmount: subtotal,
        cartItems: cartItems.map((item) => ({
          productId: item.product_id,
          quantity: item.quantity,
          price: item.price_per_unit,
        })),
      };

      const response = await fetch(`/api/payment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error(await response.text());
      const razorpayOrderId = await response.text();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: subtotal * 100, // Razorpay expects amount in paise
        currency: "INR",
        name: "KartNova",
        description: "Test Transaction",
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            const verifyResponse = await fetch(`/api/payment/verify`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              credentials: "include",
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id, // Ensure key matches backend
                razorpayPaymentId: response.razorpay_payment_id, // Ensure key matches backend
                razorpaySignature: response.razorpay_signature, // Ensure key matches backend
              }),
            });
            const result = await verifyResponse.text();
            if (verifyResponse.ok) {
              alert("Payment verified successfully!");
              navigate("/home"); // Redirect to Customer Home Page
            } else {
              alert("Payment verification failed: " + result);
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: username,
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      alert("Payment failed. Please try again.");
      console.error("Error during checkout:", error);
    }
  };

  const totalProducts = () => cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const shipping = (5.0 * 74).toFixed(2); // Hardcoded shipping value

  if (cartItems.length === 0) {
    return (
      <div className="cart-page empty">
        <Header cartCount={0} username={username} />
        <div className="empty-cart-container">
          <div className="empty-cart-content">
            <div className="empty-cart-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                <circle cx="8" cy="21" r="1" fill="currentColor" />
                <circle cx="16" cy="21" r="1" fill="currentColor" />
              </svg>
            </div>
            <h2>Your Cart is Empty</h2>
            <p>Add some items to get started!</p>
            <button 
              className="continue-shopping-btn"
              onClick={() => navigate('/home')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ width: "100vw" }}>
      <Header cartCount={totalProducts()} username={username} />
      <div className="cart-container">
        <div className="cart-page">
          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <p>You have {cartItems.length} items in your cart</p>
          </div>

          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.product_id} className="cart-item">
                <img
                  src={item.image_url || "https://via.placeholder.com/80?text=No+Image"}
                  alt={item.name}
                />
                <div className="item-details">
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}>
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}>
                        +
                      </button>
                    </div>
                    <span className="price">₹{item.total_price}</span>
                    <button className="remove-btn" onClick={() => handleRemoveItem(item.product_id)}>
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="checkout-section">
          <h2>Order Summary</h2>
          <p className="summary-description">Review your items and proceed to secure checkout.</p>
          <div className="checkout-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="summary-row">
              <span>Total Products</span>
              <span>{totalProducts()}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{(parseFloat(subtotal) + parseFloat(shipping)).toFixed(2)}</span>
            </div>
            <button className="checkout-button" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;