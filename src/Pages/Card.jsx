import React, { useState, useEffect } from 'react';


const Card = ({ cartItems, setCartItems }) => {
  const [promoCode, setPromoCode] = useState('');

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = 40;
  const total = subtotal + deliveryFee;

  

  return (
    <div className="cart-container">
      <div className="cart-section">
        <h1>Your Cart</h1>

        {cartItems.length === 0 ? (
          <h3>Your cart is empty</h3>
        ) : (
          <>
            {/* Cart Table */}
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="cart-item-image"
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>₹{item.price}</td>
                    <td>
                      <div className="quantity-controls">
                        
                        <span>{item.quantity}</span>
                       
                      </div>
                    </td>
                    <td>₹{item.price * item.quantity}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Cart Summary */}
            <div className="cart-footer">
              <div className="cart-total-section">
                <h2>Cart Total</h2>
                <div className="total-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="total-row">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                
              </div>

              
                  
                </div>
              
            
          </>
        )}
      </div>
    </div>
  );
};

export default Card;