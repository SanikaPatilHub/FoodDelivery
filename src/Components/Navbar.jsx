import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function MyAppNav({ search, setSearch }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <nav className="my-navbar fixed-top">
      <NavLink to="/" className="logo-link"><h4 className="logo1">Food <span style={{color:"chartreuse"}}>Express</span></h4></NavLink>

      <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span><span></span><span></span>
      </div>

      <div className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <NavLink to="/" onClick={() => setMenuOpen(false)}>Home</NavLink>
        <div className="search">
          <input type="text" placeholder="Search food..." value={search} onChange={(e)=>setSearch(e.target.value)} className="bar1"/>
        </div>
        <NavLink to="/menulist" onClick={() => setMenuOpen(false)}>Menu</NavLink>
        <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
       <NavLink to="/card">
  <i className="bi bi-cart4" style={{ fontSize: "24px" }}></i>
</NavLink>

          
        <div className="buttons">
          {isLoggedIn ? <button onClick={handleLogout} className="logoutbtn">Logout</button> :
          <NavLink to="/login" onClick={() => setMenuOpen(false)}>Login</NavLink>}
        </div>
      </div>
    </nav>
  );
}

export default MyAppNav;
