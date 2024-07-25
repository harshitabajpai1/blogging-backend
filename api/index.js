require("dotenv").config();
// console.log("helloworld")


const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;
const connectDB = require("../config/dbConnect");
const mongoose = require("mongoose");
var cors = require('cors')
const corsOptions = require('../config/corsOptions');


connectDB();
//user routes => /api/users and /api/user
app.use(cors(corsOptions));
app.use(express.json()); //middleware to parse json

// user routes for /api/users and /api/user
app.use("/api/user", require("../routes/userRoutes"));


// article routes 

app.use("/api/articles", require("../routes/articleRoutes"));


mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
});

mongoose.connection.on('error', (err) => {
    console.log('Error while connection to MongoDB: ',err)
});

console.log(`MONGO_URI: ${process.env.DATABASE_URI}`);
console.log(`PORT: ${process.env.PORT}`);

app.get('/', (req, res) => {
  res.send('Server is running');
});

