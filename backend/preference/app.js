// Setting up Express, the NodeJS framework
const express = require('express');
const app = express();

require('dotenv/config');

// Setting up Mongoose
const mongoose = require('mongoose');

try{
  mongoose.connect( process.env.MONGO_DB_CONNECTION ,
    {
      useUnifiedTopology: true,
      useNewUrlParser:true
    },
    (o) => console.log({
      log:'DB Connected successfully!',
      o: o
    })
  );
}catch(err){
  console.log({error: err});
}

const amqpController = require('./controllers/AmqpController');
amqpController.connect();