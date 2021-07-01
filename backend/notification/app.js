// Load AMQP Controller to listen for messages
const amqpController = require('./controllers/AmqpController');
amqpController.connect();