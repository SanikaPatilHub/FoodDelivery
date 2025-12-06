import { NavLink } from "react-router-dom";

export function MyAppNav() {
  return (
    <nav className=" my-navbar  fixed-top">
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "activemenu" : "")}
      >
        <h5 className="logo1">
          Food <span style={{ color: "chartreuse" }}>Express </span>
        </h5>
      </NavLink>

      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "activemenu" : "")}
      >
        Home
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
