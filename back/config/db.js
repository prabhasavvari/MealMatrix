const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// Connection URI
const uri = process.env.MONGO_URI; 

const connectdb = () => mongoose.connect(uri, {})
.then(() => console.log("Mongodb connected succesfully"))
.catch(err => console.error("Error connecting to Mongodb:", err));

module.exports = connectdb;