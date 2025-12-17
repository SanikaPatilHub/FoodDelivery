import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import FoodData from "../Data/FoodData";
import Contact from "./Contact";

const Home = ({ addToCart, search }) => {
  const menuRef = useRef(null);
  const contactRef = useRef(null);
  const location = useLocation();

  const filteredFood = FoodData.filter((item) =>
    item.name.toLowerCase().includes(search?.toLowerCase() || "")
  );

  useEffect(() => {
    if ((search || location.pathname === "/menulist") && menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (location.pathname === "/contact" && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [search, location.pathname]);

  return (
    <>
      <div className="home-container">
        <div className="section3">
          <h1 className="hero-text">
            Your <span style={{ color: "orangered" }}>hunger</span> solution is{" "}
            <span style={{ color: "rgb(43, 255, 0)", fontFamily: "serif" }}>
              Now Online
            </span>
          </h1>

          <h5 className="para">
            Where fresh ingredients meet irresistible flavors.
            <br />
            Expertly crafted dishes made to excite your senses.
            <br />
            Every bite delivers pure satisfaction.
          </h5>
        </div>

       
        <div className="food-section" ref={menuRef}>
          <h1>Menu List</h1>

          <ul className="list">
            {filteredFood.length > 0 ? (
              filteredFood.map((item) => (
                <li key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="foodimage"
                    style={{ width: "190px" }}
                  />

                  <h3 style={{ color: "red" }}>{item.name}</h3>
                  <h4>₹{item.price}</h4>

                  <button
                    className="btncart"
                    onClick={() => {
                      alert("Food added to cart!");
                      addToCart(item);
                    }}
                  >
                    <i
                      className="bi bi-cart-fill"
                      style={{ paddingRight: "5px" }}
                    />
                    Add to Cart
                  </button>
                </li>
              ))
            ) : (
              <p style={{ textAlign: "center" }}>No food items found </p>
            )}
          </ul>
        </div>
      </div>

      
      <div ref={contactRef}>
        <Contact />
      </div>
    </>
  );
};

export default Home;
