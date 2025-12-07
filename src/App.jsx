import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Card from "./Pages/Card";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/card" element={<Card />} />
      </Routes>
    </>
  );
}

export default App;
