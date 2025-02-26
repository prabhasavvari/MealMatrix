const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  phone: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String
  },
  rating: { type: Number, default: 0 },
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu" }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Restaurant", restaurantSchema);