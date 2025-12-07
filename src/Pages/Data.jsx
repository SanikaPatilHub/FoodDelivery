import pizza from "../assets/pizza.jpg";
import burger from "../assets/burgur.png";
import pasta from "../assets/pasta.avif";
import fries from "../assets/fries.jpg";
import sandwich from "../assets/sandwich.jpg";
import shake from "../assets/glass-filled-with-chocolate-ice-cream-dessert.jpg";




const FoodData = [
  { id: 1, name: "Margherita Pizza", price: 199, image: pizza },
  { id: 2, name: "Veg Burger", price: 99, image:burger},
  { id: 3, name: "Pasta Alfredo", price: 149, image: pasta },
  { id: 4, name: "French Fries", price: 79, image: fries },
  { id: 5, name: "Grilled Sandwich", price: 129, image: sandwich },
  {
    id: 6,
    name: "Chocolate Shake",
    price: 89,
    image: shake,
  },
];

export default FoodData;
