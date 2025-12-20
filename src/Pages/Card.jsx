
const Card = ({ cartItems, setCartItems }) => {
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };
  const grandTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cartsection">
      <h1>My Cart</h1>

      {cartItems.length === 0 ? (
        <h3>Your cart is empty</h3>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} width="120" />

              <h3>{item.name}</h3>

            
              <p>
                ₹{item.price} × {item.quantity} ={" "}
                <strong>₹{item.price * item.quantity}</strong>
              </p>
             <h3>Grand Total: ₹{grandTotal}</h3>
              
            </div>
          ))}

          
        </>
      )}
    </div>
  );
};

export default Card;
