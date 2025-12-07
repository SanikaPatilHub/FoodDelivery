import FoodData from "./Data";  

const Home = () => {
  return (
    <>
    <div className="Container">
      <h1 className="head">Your <span style={{color:"orangered"}}>hunger </span>solution is <span style={{color:"rgb(43, 255, 0)",fontFamily:"serif"}}>Now Online</span></h1>
      <ul className="list">
        {FoodData.map((item) => (
          <li key={item.id}>
            
           
            <img src={item.image} width="200px" style={{marginLeft:"10px",marginRight:"10px"}} className="foodimage"/>
            <h3 style={{color:"red"}}>{item.name}</h3>
            <h4>Price: ₹{item.price}</h4>
          </li>

        ))}
      </ul>
      </div>
    </>
  );
};

export default Home;
