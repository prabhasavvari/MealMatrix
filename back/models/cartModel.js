const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
      restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Cart", cartSchema);
