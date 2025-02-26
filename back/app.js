let express = require('express');
let dotenv = require('dotenv');
dotenv.config();
const connectdb = require('./config/db');
let bodyParser = require('body-parser');
let cors = require('cors');

let app = express();
connectdb();
let port = process.env.PORT || 7700;

app.use(bodyParser.json());
app.use(cors());

app.use('/api', require('./routes/userRoutes'));

app.get('/', async(req, res) => {
  try{
    res.status(200).send('Hello MealMatrix');
  }
  catch{
    res.status(500).send('Database not connected');
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})