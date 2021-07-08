const brokerUri = 'amqp://booksmq:booksmq123!@rabbitmq:5672/';

const queues = {
    notifications: 'send-notification',
};

module.exports = {
    brokerUri,
    queues,
}