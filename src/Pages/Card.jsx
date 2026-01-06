import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const CartPage = ({ cartItems, setCartItems }) => {
  const navigate = useNavigate(); 
  const [promoCode, setPromoCode] = useState('');

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = 40;
  const total = subtotal + deliveryFee;

  const handlePromoSubmit = () => {
    console.log('Promo code:', promoCode);
    alert('Promo code applied!');
  };

  return (
    <div className="cart-page">
      <div className="cart-content">
        <h1 className="cart-title">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p>Add some delicious items to get started!</p>
          </div>
        ) : (
          <>
            {/* Cart Table */}
            <div className="cart-table-wrapper">
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
                          className="cart-item-img"
                        />
                      </td>
                      <td className="item-title">{item.name}</td>
                      <td className="item-price">₹{item.price}</td>
                      <td className="item-quantity">{item.quantity}</td>
                      <td className="item-total">₹{item.price * item.quantity}</td>
                      <td>
                        <button
                          className="remove-button"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
              {/* Right Side - Promo Code */}
          {/* Cart Summary Section */}
            <div className="cart-summary-wrapper">
              {/* Left Side - Cart Total */}
              <div className="cart-total-box">
                <h2>Cart Total</h2>
                <div className="total-line">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="total-line">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <div className="total-line grand-total">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
                <button
  className="checkout-button"
  onClick={() => navigate("/checkout")}
>
  PROCEED TO CHECKOUT
</button>

              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;