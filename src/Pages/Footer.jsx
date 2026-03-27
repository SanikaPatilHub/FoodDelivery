import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer1">
        <div className="footer-contact">
          <h3 className="footer-head">Get In Touch</h3>
          <p className="paragraph">
            <i
              className="fa-solid fa-location-dot"
              style={{ marginRight: "0.5em" }}
            ></i>
            Mumbai ,Maharashtra
          </p>
          <p className="paragraph">
            <i className="fa fa-phone-alt" style={{ marginRight: "0.5em" }}></i>
            99087849
          </p>
          <p className="paragraph">
            <i className="fa fa-envelope" style={{ marginRight: "0.5em" }}></i>
            foodexpress@gmail.com
          </p>
        </div>
        <div className="links">
  <h3 className="link_header">QUICK LINKS</h3>

  <NavLink  
    to="/"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    id="navlink"
  >
    Home
  </NavLink>

  <NavLink
    to="/menulist"
    className={({ isActive }) => (isActive ? "activemenu" : "")}  
    id="navlink"
    
  >
    Menu
  </NavLink>

  <NavLink
  id="navlink"
    to="/contact"
    className={({ isActive }) => (isActive ? "activemenu" : "")}
  >
    Contact
  </NavLink>
</div>
        <div className="footer-top"></div> 
    <div class="footer-social">
  <h3 class="link_header">Follow Us</h3>
  <div class="social-icons">
    <a href="https://www.facebook.com/" target="blank"  aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
    <a href="https://www.instagram.com/" target="blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
    <a href="https://x.com/"  target="blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
    <a href="https://www.youtube.com/"  target="blank" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
  </div>
</div>

      </footer>

      <div className="footer-bottom">
        <a href="#" className="copy2" style={{ color: "red" }}>
          &copy; Online Delivery
        </a>
        , All Rights Reserved.
      </div>
  

    </>
  );
};

export default Footer;
