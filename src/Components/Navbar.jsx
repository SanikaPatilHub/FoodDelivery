import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export function MyAppNav({ search, setSearch }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = localStorage.getItem("foodbite_auth");

  const handleLogout = () => {
    localStorage.removeItem("foodbite_auth");
    alert("Logged out successfully!");
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="my-navbar fixed-top">
      {/* Logo */}
      <NavLink to="/" className="logo-link">
        <h4 className="logo1">
          Food <span style={{ color: "chartreuse" }}>Express</span>
        </h4>
      </NavLink>

      {/* Hamburger */}
      <div
        className={`hamburger ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Menu Items */}
      <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>

        <div className="search">
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <NavLink to="/menulist" onClick={() => setMenuOpen(false)}>
          Menu
        </NavLink>

        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
          Contact
        </NavLink>

        <NavLink to="/card" onClick={() => setMenuOpen(false)}>
          <i className="bi bi-cart4" style={{ fontSize: "24px" }}></i>
        </NavLink>

        <div className="buttons">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="logoutbtn">
              Logout
            </button>
          ) : (
            <NavLink to="/login" id="loginbtn" onClick={() => setMenuOpen(false)}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default MyAppNav;
