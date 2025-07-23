const express = require("express");
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const userRoute = require('./routers/UserRoute');

const app = express();

connectDB();

app.listen(
    process.env.SERVER_PORT, 
    () => console.log("Server started on port "+
        process.env.SERVER_PORT)
);

app.use(cors({
  origin: 'http://localhost:3000', // Your React app's URL
  credentials: true
}));git 

app.use(express.json());

app.use('/api/users', userRoute);