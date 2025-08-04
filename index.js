const express = require("express");
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const userRoute = require('./routers/UserRoute');
const productRoute = require('./routers/ProductRoute');

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
}));

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/products', productRoute);
app.use('/api/users', userRoute);