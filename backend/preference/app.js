// Setting up Express, the NodeJS framework
const express = require('express');
const app = express();

// Setting up Mongoose
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');

try{
  mongoose.connect( dbConfig.connectionUri ,
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

const routes = require('./routes');
app.use('/api/v1',routes);

// Setting up application port
const port = process.env.PORT || 3000;
console.log(`Listening on port ${port}`);

// Listen for connections
app.listen(port);

const amqpController = require('./controllers/AmqpController');
amqpController.connect();