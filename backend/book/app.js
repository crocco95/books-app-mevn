// Setting up Express, the NodeJS framework
const express = require('express');
const app = express();

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

console.log('Connecting to DB ...');

const dbUtil = require('./utils/db');
dbUtil
    .connect()
    .then( () => {
        console.log('Setting up routes ...');
        const routes = require('./routes');
        app.use('/api/v1',routes);
    }).then( () => {
        // Setting up application port
        const port = process.env.PORT || 3000;
        console.log(`Listening on port ${port}`);

        app.listen(port);
    })
    .catch( ex => console.log(ex.message));