const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  items: [
    {
      menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
  orderStatus: { type: String, enum: ["Pending", "Accepted", "On the way", "Delivered", "Cancelled"], default: "Pending" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
