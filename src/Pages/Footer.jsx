import { NavLink } from "react-router-dom";
import tacoImage from "../assets/delicious-taco-studio-removebg-preview.png";

const Footer = () => {
  return (
    <>
      <footer className="footer1">
        <div className="footer-contact">
          <h3 className="footer-head">Get In Touch</h3>
          <p>
            <i
              className="fa-solid fa-location-dot"
              style={{ marginRight: "0.5em" }}
            ></i>
            Mumbai ,Maharashtra
          </p>
          <p>
            <i className="fa fa-phone-alt" style={{ marginRight: "0.5em" }}></i>
            99087849
          </p>
          <p>
            <i className="fa fa-envelope" style={{ marginRight: "0.5em" }}></i>
            foodexpress@gmail.com
          </p>
        </div>
        <div className="links">
          <h3 className="link_header">QUICK LINKS</h3>
          <NavLink to="/" className="footer-link">
            Home
          </NavLink>
        </div>
        <div className="footer-top"></div>
        <h1 className="header">
          Food <span style={{ color: "rgb(35, 255, 6)" }}> Express</span>
        </h1>
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
