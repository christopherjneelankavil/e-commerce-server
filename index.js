//import express module 
const express = require('express');
const PORT = 3000;
const app = express(); 
const mongoose = require('mongoose');
//import authRouter from routes/auth.js
const authRouter = require('./routes/auth'); 

  
//use express json middleware
app.use(express.json());

//register endpoint
app.use(authRouter);
const DB = ""
mongoose.connect(DB).then(()=>console.log('DB connection successful!')).catch(err=>console.log(err));

app.listen(PORT,"0.0.0.0",function(){
    console.log('Server is running on Port:',PORT);
});
