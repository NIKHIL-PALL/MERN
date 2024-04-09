const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const User = require('./model/UserModel.js');
const userRoutes = require('./routes/userRoutes.js');
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

mongoose.connect(
  process.env.URI
).then(() => {
    console.log("Connection to the Database was Successful");
    app.listen(process.env.PORT, () => {
        console.log("Listening on Port : "+ process.env.PORT);
      });
}); 

app.use(userRoutes);