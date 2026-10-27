import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/cart`);
        setCartItems(response.data);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };

    fetchCart();
  }, []);

  const handleOrder = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/order`, cartItems);
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        setCartItems([]);
      }, 3000);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to complete order');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} style={{ marginBottom: '10px' }}>
              <strong>{item.name}</strong> - ₹{item.price} x {item.quantity}
            </div>
          ))}

          <button onClick={handleOrder} style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
            Place Order
          </button>
        </>
      )}

      {showPopup && (
        <div style={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#dff0d8',
          border: '1px solid #3c763d',
          color: '#3c763d',
          borderRadius: '5px'
        }}>
          ✅ Order Completed Successfully!
        </div>
      )}
    </div>
  );
};

export default Cart;
