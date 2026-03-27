import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "cod",
  });

  // ✅ Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(res.data.cart);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCart();
  }, [navigate]);

  // ✅ Input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Price calculation
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.foodId.price * item.quantity,
    0
  );

  const deliveryFee = cartItems.length ? 40 : 0;
  const total = subtotal + deliveryFee;

  // ✅ Place Order
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/order/place",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully 🎉");
      navigate("/");
    } catch (err) {
      alert("Order failed ❌");
    }
  };

  if (cartItems.length === 0) {
    return <h2 style={{ textAlign: "center" }}>Your cart is empty</h2>;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-card">
        <h1 className="checkout-title">Delivery Information</h1>

        <form className="checkout-form" onSubmit={handleSubmit}>
          {/* ROW 1 */}
          <div className="row">
            <input
              name="name"
              placeholder="Name"
              required
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Phone"
              required
              onChange={handleChange}
            />
          </div>

          {/* ADDRESS */}
          <textarea
            name="address"
            placeholder="Address"
            required
            onChange={handleChange}
          />

          {/* ROW 2 */}
          <div className="row">
            <input
              name="city"
              placeholder="City"
              required
              onChange={handleChange}
            />
            <input
              name="pincode"
              placeholder="Pincode"
              required
              onChange={handleChange}
            />
          </div>

          {/* PAYMENT */}
          <div className="payment">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === "cod"}
                onChange={handleChange}
              />
              Cash on Delivery
            </label>

            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="online"
                checked={formData.paymentMethod === "online"}
                onChange={handleChange}
              />
              Online Payment
            </label>
          </div>

          {/* TOTAL */}
          <h2 className="total">Total Amount: ₹{total}</h2>

          {/* BUTTON */}
          <button className="place-order" type="submit">
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
