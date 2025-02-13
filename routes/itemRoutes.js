const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Item = require("../models/Item");

// CREATE a new item (Protected Route)
router.post("/", auth, async (req, res) => {
  const { name, description, quantity } = req.body;

  if (!name || !quantity) {
    return res.status(400).json({ msg: "Name and Quantity are Required" });
  }

  try {
    const newItem = new Item({
      name,
      description,
      quantity,
      user: req.user.id, // Assign item to the user creating it
    });

    const item = await newItem.save();
    res.json(item);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// GET all items (Public Route with Pagination)
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default page 1
    const limit = parseInt(req.query.limit) || 10; // Default 10 items per page
    const skip = (page - 1) * limit;

    const items = await Item.find().skip(skip).limit(limit);
    const total = await Item.countDocuments(); // Total items count

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      items,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET a single item by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: "Item not found" });

    res.json(item);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// UPDATE an Item (Protected Route)
router.put("/:id", auth, async (req, res) => {
  const { name, description, quantity } = req.body;

  try {
    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: "Item not found" });

    // Ensure the user updating the item is the same user who created it
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    // Update item fields
    item.name = name || item.name;
    item.description = description || item.description;
    item.quantity = quantity || item.quantity;

    await item.save();
    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// DELETE an item (Protected Route)
router.delete("/:id", auth, async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: "Item not found" });

    // Ensure the user deleting the item is the same user who created it
    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await item.deleteOne();
    res.json({ msg: "Item removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;