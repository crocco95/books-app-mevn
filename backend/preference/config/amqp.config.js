const brokerUri = 'amqp://booksmq:booksmq123!@rabbitmq:5672/';

const queues = {
    updatePreferences: 'update-preferences',
};

module.exports = {
    brokerUri,
    queues,
}