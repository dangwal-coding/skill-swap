const express = require('express');
const cors = require('cors');
const db = require('./Helper/Mongodb');
const dotenv = require('dotenv');
const mailRoutes = require('./Routes/mailRoutes');
dotenv.config();

const app = express();
const path = require('path');
const Port = process.env.Port || process.env.PORT || 8080;

app.use(express.json()); // ensure JSON body parsing
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', require('./Routes/Login'));
app.use('/api', require('./Routes/Signup'));
app.use('/api', mailRoutes); // mount mail routes at /api


app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
})