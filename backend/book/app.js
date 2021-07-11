// Setting up Express, the NodeJS framework
const express = require('express');
const dbConfig = require('./config/db.config');
const app = express();

// Setting up Mongoose
const dbUtil = require('./utils/db');
try{
    console.log('Connecting to DB ...');
    await dbUtil.connect();
    console.log('Connecting to DB: Done.');
}catch (ex) {
    console.error(ex);
    return;
}

// Setting up cors: it helps to solve cors policy problem when client calls API
const cors = require('cors');
app.use(cors());

// It permits to extract data from http request body
app.use(express.json());

// Setting up Firebase Admin SDK
const firebaseAdmin = require('firebase-admin');
const serviceAccount = require("./config/serviceAccountKey.json");

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
});

const routes = require('./routes');
app.use('/api/v1',routes);

// Setting up application port
const port = process.env.PORT || 3000;
console.log(`Listening on port ${port}`);

// Listen for connections
app.listen(port);