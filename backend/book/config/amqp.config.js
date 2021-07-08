const broker = {
    uri: 'amqp://booksmq:booksmq123!@rabbitmq:5672/',
    mainTopic: 'amq.topic',
}

const updatePreferencesQueue = 'update-preferences';
const notifyFollowersQueue = 'notify-followers';

module.exports = {
    broker,
    updatePreferencesQueue,
    notifyFollowersQueue,
}