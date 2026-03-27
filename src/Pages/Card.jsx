// Card.jsx
import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const Card = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const axiosConfig = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  // Fetch cart items
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cart", axiosConfig);
        setCartItems(res.data.cart || []);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token, navigate]);

  if (!token) return <Navigate to="/login" />;
  if (loading) return <h3>Loading cart...</h3>;

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.foodId?.price || 0) * item.quantity,
    0
  );
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  // Remove item from cart
  const removeItem = async (foodId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/cart/${foodId}`, axiosConfig);
      setCartItems(res.data.cart || []);
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    }
  };

  // Update quantity
  const updateQuantity = async (foodId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const res = await axios.put(
        "http://localhost:5000/api/cart/update",
        { foodId, quantity: newQuantity },
        axiosConfig
      );
      setCartItems(res.data.cart || []);
    } catch (err) {
      console.error(err);
      alert("Failed to update quantity");
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.foodId?._id}>
                  <td>{item.foodId?.name}</td>
                  <td>₹{item.foodId?.price}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.foodId?._id, Number(e.target.value))
                      }
                    />
                  </td>
                  <td>₹{(item.foodId?.price || 0) * item.quantity}</td>
                  <td>
                    <button
                      onClick={() => removeItem(item.foodId?._id)}
                      style={{
                        background: "orangered",
                        color: "#fff",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <p>Subtotal: ₹{subtotal}</p>
            <p>Delivery Fee: ₹{deliveryFee}</p>
            <h3>Total: ₹{total}</h3>
            <button
              onClick={() => navigate("/checkout")}
              style={{
                background: "green",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "10px 15px",
                cursor: "pointer",
              }}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
