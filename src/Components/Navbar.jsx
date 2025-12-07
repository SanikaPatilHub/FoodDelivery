import { NavLink } from "react-router-dom";
import trolley from "../assets/trolley.png";  // IMPORT IMAGE

export function MyAppNav() {
  return (
    <nav className="my-navbar fixed-top">

      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "activemenu" : "")}
      >
        <h5 className="logo1">
          Food <span style={{ color: "chartreuse" }}>Delivery</span>
        </h5>
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "activemenu" : "")}
      >
        Home
      </NavLink>
<NavLink
        to="/card"
        className={({ isActive }) => (isActive ? "activemenu" : "")}
      >
        <img src={trolley} className="file" />
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) => (isActive ? "activemenu" : "")}
        id="btn1"
      >
        LOGIN
      </NavLink>

      

    </nav>
  );
}

export default MyAppNav;
