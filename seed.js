import mongoose from "mongoose";
import dotenv from "dotenv";
import Food from "./models/foodModel.js";
import FoodData from "./data/FoodData.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const seedFoods = async () => {
  try {
    await Food.deleteMany(); // delete old data
    await Food.insertMany(FoodData); // insert your frontend FoodData
    console.log("FoodData seeded");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedFoods();
