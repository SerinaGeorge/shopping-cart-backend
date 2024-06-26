const express = require("express");
const router = express.Router();
const Cart = require("../database/cartschem.js");
const auth = require("../middleware/authorisation.js");

// Create a new cart item
router.post("/", auth, async (req, res) => {
  try {
    const tokenValue = req.headers["accessToken"];

    const { productName, productId, sellerId, quantity } = req.body;
    const userId = tokenValue.userData._id;
    const cartdata = {
        productName:productName,
      userId: userId,
      productId: productId,
      sellerId: sellerId,
      quantity: quantity,
    };

    const cartItem = new Cart(cartdata);
    await cartItem.save();
    res.status(201).send(cartItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all cart items for a user
router.get("/:userId", auth, async (req, res) => {
  try {
    const tokenValue = req.headers["accessToken"];
    console.log(tokenValue.userData._id);
    const cartItems = await Cart.find({ userId: tokenValue.userData._id });
    console.log(cartItems);
    res.status(200).send(cartItems);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update a cart item
router.put("/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!cartItem) {
      return res.status(404).send();
    }
    res.send(cartItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a cart item
router.delete("/:id", async (req, res) => {
  try {
    const cartItem = await Cart.findByIdAndDelete(req.params.id);
    if (!cartItem) {
      return res.status(404).send();
    }
    res.send(cartItem);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
