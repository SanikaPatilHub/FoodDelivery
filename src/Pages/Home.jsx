import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FoodData from "../Data/FoodData"; // keep your frontend data for display
import Contact from "./Contact";

const Home = ({ search }) => {
  const menuRef = useRef(null);
  const contactRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ State for Read More / Read Less (per item)
  const [expandedItems, setExpandedItems] = useState([]);
  const [backendFoods, setBackendFoods] = useState([]);

  // ✅ State for custom Add-to-Cart alert
  const [alertItem, setAlertItem] = useState(null);

  // Fetch backend foods to get proper _id for Add to Cart
  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/food");
        const data = await res.json();
        setBackendFoods(data); // store backend food data with real _id
      } catch (err) {
        console.error("Failed to fetch foods:", err);
      }
    };
    fetchFoods();
  }, []);

  // Toggle description
  const toggleDesc = (id) => {
    setExpandedItems((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  // Scroll handling
  useEffect(() => {
    if ((search || location.pathname === "/menulist") && menuRef.current) {
      menuRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (location.pathname === "/contact" && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [search, location.pathname]);

  // Add to cart
  const addToCart = async (frontendItem) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Please login first");

    // find corresponding backend food by name
    const backendItem = backendFoods.find(
      (food) => food.name === frontendItem.name
    );
    if (!backendItem) return alert("This item cannot be added");

    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ foodId: backendItem._id, quantity: 1 }),
      });

      const data = await res.json();
      if (!res.ok) return alert(data.message);

      // ✅ Show custom alert with View Cart
      setAlertItem(frontendItem);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to add to cart");
    }
  };

  // Filter frontend food based on search
  const filteredFood = FoodData.filter((item) =>
    item.name.toLowerCase().includes(search?.toLowerCase() || "")
  );

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

                    <p className="food-desc">
                      {isExpanded ? item.desc : item.desc.slice(0, 40) + "..."}
                      {item.desc.length > 40 && (
                        <span
                          className="read-more"
                          onClick={() => toggleDesc(item.id)}
                        >
                          {isExpanded ? " Read Less" : " Read More"}
                        </span>
                      )}
                    </p>

                    <button className="btncart" onClick={() => addToCart(item)}>
                      <i className="bi bi-cart-fill" style={{ paddingRight: "5px" }} />
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

      <div ref={contactRef}>
        <Contact />
      </div>

      {/* ✅ Custom Add to Cart Alert */}
      {alertItem && (
        <div
          className="custom-alert"
          style={{
            position: "fixed",
            bottom: "300px",
            right: "20px",
            background: "#fff",
            border: "1px solid #ccc",
            padding: "15px 20px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <p style={{ margin: 0, paddingBottom: "10px" }}>
            <strong>{alertItem.name}</strong> added to cart!
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => {
                navigate("/card");
                setAlertItem(null);
              }}
              style={{
                background: "orangered",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                
              }}
            >
              View Cart
            </button>
            <button
              onClick={() => setAlertItem(null)}
              style={{
                background: "#ccc",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
