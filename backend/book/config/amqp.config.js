const broker = {
    uri: 'amqps://cxgivvzk:UvkDjSVw17WCKTwYsB67_4BmAs-M6us9@cow.rmq2.cloudamqp.com/cxgivvzk',
    mainTopic: 'amq.topic',
}

const updatePreferencesQueue = 'update-preferences';
const notifyFollowersQueue = 'notify-followers';

module.exports = {
    broker,
    updatePreferencesQueue,
    notifyFollowersQueue,
}