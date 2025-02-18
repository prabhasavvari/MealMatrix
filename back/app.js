let express = require('express');
let dotenv = require('dotenv');
dotenv.config();
const { connectToDatabase, getDb } = require('./config/db');
let bodyParser = require('body-parser');
let cors = require('cors');

let app = express();
let port = process.env.PORT || 5500;

app.use(bodyParser.json());
app.use(cors());

connectToDatabase()
  .then(() => {
    console.log('Connected to MongoDB'); // This will log when the connection is successful
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Exit the app if the connection fails
  });

app.get('/', async(req, res) => {
  try{
    const db = getDb();
    res.status(200).send('hello zomato');
  }
  catch{
    res.status(500).send('Database not connected');
  }
});

app.listen(port, (err) => {
  if(err) throw err;
  console.log(`Server running on port: ${port}`)
})