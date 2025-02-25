const mongoose = require('mongoose');

// Connection URI
const uri = process.env.MONGO_URI; 

const connectdb = () => mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Mongodb connected succesfully"))
.catch(err => console.error("Error connecting to Mongodb:", err));

module.exports = connectdb;