import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Card from "./Pages/Card";
import PrivateRoute from "./Components/Route";
import Footer from "./Pages/Footer";
import Checkout from "./Pages/Checkout";

function App() {
  const [search, setSearch] = useState("");

  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
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

        {/* ✅ ADD THIS ROUTE */}
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
