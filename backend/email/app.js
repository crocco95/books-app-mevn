// Import dotenv package to load .env file
const dotenv = require('dotenv');
dotenv.config();

// Load AMQP Controller to listen for messages
const amqpController = require('./controllers/AmqpController');
amqpController.connect();