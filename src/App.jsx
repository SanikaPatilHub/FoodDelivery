import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Card from "./Pages/Card";
import PrivateRoute from "./Components/Route";
import Footer from "./Pages/Footer";

function App() {
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home search={search} addToCart={addToCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menulist" element={<Home search={search} addToCart={addToCart} />} />
          <Route path="/contact" element={<Home />} />
        <Route
          path="/card"
          element={
            <PrivateRoute>
              <Card cartItems={cartItems} />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
