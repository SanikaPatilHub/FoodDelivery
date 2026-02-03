import express from "express";
import User from "../models/User.js";
import Food from "../models/food.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// GET cart
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.foodId");
   
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add item
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { foodId, quantity } = req.body;

    if (!foodId) return res.status(400).json({ message: "foodId required" });

    const food = await Food.findById(foodId);
    if (!food) return res.status(400).json({ message: "Food not found" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const qty = quantity || 1;
    const existingItem = user.cart.find(
      (item) => item.foodId.toString() === food._id.toString()
    );

    if (existingItem) existingItem.quantity += qty;
    else user.cart.push({ foodId: food._id, quantity: qty });

    await user.save();
    res.json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT update item quantity
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const { foodId, quantity } = req.body;
    if (!foodId || quantity < 1)
      return res.status(400).json({ message: "foodId and valid quantity required" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const item = user.cart.find((i) => i.foodId.toString() === foodId);
    if (!item) return res.status(404).json({ message: "Item not in cart" });

    item.quantity = quantity;

    await user.save();
    res.json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE item
router.delete("/:foodId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.cart = user.cart.filter((i) => i.foodId.toString() !== req.params.foodId);
    await user.save();
    res.json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
