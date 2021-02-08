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

// Setting up cors: it helps to solve cors policy problem when client calls API
const cors = require('cors');
app.use(cors());

// Setting up body-parser: it permits to extract data from http request body
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const routes = require('./routes');
app.use('/api/v1',routes);

// Setting up application port
const port = process.env.PORT || 3000;
console.log(`Listening on port ${port}`);

// Listen for connections
app.listen(port);