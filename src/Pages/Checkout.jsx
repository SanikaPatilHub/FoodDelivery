import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const deliveryFee = cartItems.length > 0 ? 40 : 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    localStorage.removeItem("cartItems");
    navigate("/");
    console.log(formData);
    
  };

  if (cartItems.length === 0) {
    return <h2 style={{ textAlign: "center" }}>Your cart is empty</h2>;
  }

  return (
    <div className="checkout-page">
      

      <div className="checkout-card">
        <h1 className="checkout-title">Checkout</h1>
        <form className="checkout-form" onSubmit={handleSubmit}>

          {/* ROW 1 */}
          <div className="row">
            <input name="name" placeholder="Name" required onChange={handleChange} />
            <input name="email" type="email" placeholder="Email" required onChange={handleChange} />
            <input name="phone" placeholder="Phone" required onChange={handleChange} />
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
            <input name="city" placeholder="City" required onChange={handleChange} />
            <input name="state" placeholder="State" required onChange={handleChange} />
            <input name="pincode" placeholder="Pincode" required onChange={handleChange} />
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
