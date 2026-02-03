import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/auth.js";
import foodRoutes from "./routes/foodroute.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js"; // ✅ ORDER ROUTE

// Models & Seed Data
import Food from "./models/food.js";
import FoodData from "./data1/FoodData.js";

// ES module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

// ================= MIDDLEWARES =================
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ================= SERVE IMAGES =================
// create folder: server/images
app.use("/images", express.static(path.join(__dirname, "images")));

// ================= DATABASE =================
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    // Seed food only once
    const count = await Food.countDocuments();
    if (count === 0) {
      await Food.insertMany(FoodData);
      console.log("Food data seeded");
    } else {
      console.log("Food data already exists");
    }
  } catch (err) {
    console.error("MongoDB error:", err.message);
    process.exit(1);
  }
};
connectDB();

// ================= ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes); // ✅ REQUIRED FOR CHECKOUT

// ================= TEST =================
app.get("/", (req, res) => {
  res.send("FoodExpress API is running");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
