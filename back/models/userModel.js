const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type: String},
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String
  },
  role: { type: String, enum: ["customer", "restaurant_owner", "admin"], default: "customer" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);