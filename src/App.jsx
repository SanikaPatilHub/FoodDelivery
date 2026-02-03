import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Card from "./Pages/Card"; // keep your existing name
import PrivateRoute from "./Components/Route";
import Footer from "./Pages/Footer";
import Checkout from "./Pages/Checkout";
import Register from "./Pages/register"; // keep original casing

function App() {
  const [search, setSearch] = useState("");

  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync cart with localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = async (item) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login first");
        return;
      }

      // Ensure _id exists for backend
      const foodId = item._id;
      if (!foodId) {
        alert("Invalid food item, cannot add to cart");
        return;
      }

      const quantity = 1; // always send quantity

      // Send request to backend
      const res = await axios.post(
        "http://localhost:5000/api/cart/add",
        { foodId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local cart state (prevent duplicates)
      setCartItems((prev) => {
        const existing = prev.find((i) => i._id === foodId);
        if (existing) {
          return prev.map((i) =>
            i._id === foodId
              ? { ...i, quantity: i.quantity + quantity }
              : i
          );
        } else {
          return [...prev, { ...item, quantity }];
        }
      });

      alert("Food added to cart successfully");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />

      <Routes>
        <Route
          path="/"
          element={<Home search={search} addToCart={addToCart} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/menulist"
          element={<Home search={search} addToCart={addToCart} />}
        />
        <Route path="/contact" element={<Home />} />

        <Route
          path="/card"
          element={
            <PrivateRoute>
              <Card cartItems={cartItems} setCartItems={setCartItems} />
            </PrivateRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout cartItems={cartItems} />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
