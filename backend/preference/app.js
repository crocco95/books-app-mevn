// Setting up Express, the NodeJS framework
const express = require('express');
const app = express();

console.log('Connecting to DB ...');

const dbUtil = require('./utils/db');
dbUtil
    .connect()
    .then( () => {
        console.log('Setting up routes ...');
        const routes = require('./routes');
        app.use('/api/v1',routes);
    })
    .then( () => {
        console.log('Connecting to AMQP bus ...');
        const amqpController = require('./controllers/AmqpController');
        amqpController.connect();
    })
    .then( () => {
        // Setting up application port
        const port = process.env.PORT || 3000;
        console.log(`Listening on port ${port}`);

        app.listen(port);
    })
    .catch( ex => console.log(ex.message));