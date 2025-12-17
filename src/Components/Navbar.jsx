import { NavLink, useNavigate } from "react-router-dom";
import trolley from "../assets/trolley.png";

export function MyAppNav({ search, setSearch }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("foodbite_auth");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="my-navbar fixed-top">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "activemenu" : "")}
      >
        <h4 className="logo1">
          Food <span style={{ color: "chartreuse" }}>Express</span>
        </h4>
      </NavLink>

      <NavLink
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
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
      <NavLink
        to="/menulist"
        className={({ isActive }) => (isActive ? "activemenu" : "")}
      >
        Menu
      </NavLink>
 <NavLink
        to="/contact"
        className={({ isActive }) => (isActive ? "activemenu" : "")}
      >
        Contact
      </NavLink>
      <NavLink
        to="/card"
        className={({ isActive }) => (isActive ? "activemenu" : "")}
      >
      
        <i className="bi bi-cart4 "style={{fontSize: "24px"}} ></i>

      </NavLink>

      <div className="buttons">
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "activemenu" : "")}
          id="loginbtn"
        >
          Login
        </NavLink>

        <button onClick={handleLogout} className="logoutbtn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default MyAppNav;
