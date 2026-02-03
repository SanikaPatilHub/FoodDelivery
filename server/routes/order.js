import express from "express";
import Order from "../models/Order.js";
import User from "../models/User.js";
import Food from "../models/food.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/place", authMiddleware, async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ message: "Address is required" });
    }

    // get user + populate food details
    const user = await User.findById(req.user.id).populate("cart.foodId");

    if (!user || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const items = user.cart.map((item) => ({
      foodId: item.foodId._id,
      name: item.foodId.name,
      price: item.foodId.price,
      image: item.foodId.image,
      quantity: item.quantity,
    }));

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      userId: user._id,
      items,
      totalAmount,
      address,
      paymentMethod: "COD",
    });

    await order.save();

    // clear cart
    user.cart = [];
    await user.save();

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
