// routes/foodroute.js
import express from "express";
import Food from "../models/food.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// GET all foods (for frontend)
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find({});
    res.json(foods); // send array of foods
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single food by ID (optional)
router.get("/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
