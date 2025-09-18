const express = require('express');
const dotenv = require('dotenv');
const db = require('./Helper/Mongodb');
const cors = require('cors');
dotenv.config();

const app = express();
const Port= process.env.Port;

app.use(express.json());
app.use(cors());
app.use('/api', require('./Routes/Login'));
app.use('/api', require('./Routes/Signup'));


app.listen(Port,()=>{
    console.log(`Server is running on port ${Port}`);
})