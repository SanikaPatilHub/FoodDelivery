import FoodData from "./Data";  

const Home = () => {
  return (
    <>
    <div className="Container">
      <ul className="list">
        {FoodData.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <h4>Price: ₹{item.price}</h4>
            <img src={item.image} width="120" />
          </li>
        ))}
      </ul>
      </div>
    </>
  );
};

export default Home;
