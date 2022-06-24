const express = require('express');
const mongoose = require('mongoose');
require('dotenv/config');
const userRoutes = require('./routes/user');


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/user',userRoutes);

mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    });
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error: "));
db.once("open",function(){
    console.log("connection successful");
});
app.listen(3000);