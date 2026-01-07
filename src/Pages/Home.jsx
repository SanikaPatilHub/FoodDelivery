import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import FoodData from "../Data/FoodData";
import Contact from "./Contact";

const Home = ({ addToCart, search }) => {
  const menuRef = useRef(null);
  const contactRef = useRef(null);
  const location = useLocation();

  // ✅ State for Read More / Read Less (per item)
  const [expandedItems, setExpandedItems] = useState([]);

  // ✅ Toggle description
  const toggleDesc = (id) => {
    setExpandedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  // ✅ Filter food based on search
  const filteredFood = FoodData.filter((item) =>
    item.name.toLowerCase().includes(search?.toLowerCase() || "")
  );

  // ✅ Scroll handling
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
        {/* HERO SECTION */}
        <div className="section3">
          <h1 className="hero-text">
            Your <span style={{ color: "rgb(5, 243, 37)" }}>hunger</span> solution
            is <span style={{ color: "orangered" }}>Now Online</span>
          </h1>

          <h5 className="para">
            Where fresh ingredients meet irresistible flavors.
            <br />
            Expertly crafted dishes made to excite your senses.
            <br />
            Every bite delivers pure satisfaction.
          </h5>

          {/* VIEW MENU BUTTON */}
          <div className="view_menu">
            <button
              className="btn-secondary1"
              onClick={() =>
                menuRef.current.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Menu
            </button>
          </div>
        </div>

        {/* MENU SECTION */}
        <div className="food-section" ref={menuRef}>
          <h1 style={{ fontSize: "3rem" }}>Menu List</h1>

          <ul className="list">
            {filteredFood.length > 0 ? (
              filteredFood.map((item) => {
                const isExpanded = expandedItems.includes(item.id);

                return (
                  <li key={item.id}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="foodimage"
                      style={{ width: "270px" }}
                    />

                    <h5 className="item">{item.name}</h5>
                    <h6 className="price">₹{item.price}</h6>

                    {/* DESCRIPTION */}
                    <p className="food-desc">
                      {isExpanded
                        ? item.desc
                        : item.desc.slice(0, 40) + "..."}

                      {item.desc.length > 40 && (
                        <span
                          className="read-more"
                          onClick={() => toggleDesc(item.id)}
                        >
                          {isExpanded ? " Read Less" : " Read More"}
                        </span>
                      )}
                    </p>

                    {/* ADD TO CART */}
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
                );
              })
            ) : (
              <p style={{ textAlign: "center" }}>No food items found</p>
            )}
          </ul>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div ref={contactRef}>
        <Contact />
      </div>
    </>
  );
};

export default Home;
