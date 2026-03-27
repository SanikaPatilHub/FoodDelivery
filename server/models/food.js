// models/food.js
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  desc: { type: String, required: true }
});

const Food = mongoose.model("Food", foodSchema); // creates "foods" collection
export default Food;
