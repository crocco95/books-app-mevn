const amqp = require('amqplib');
const amqpConfig = require('../config/amqp.config');
const notificationController = require('./NotificationController');

const publishMessage = (topic, message) => {

      const key = 'info';

      if(typeof message !== String){
        message = JSON.stringify(message);
      }

      return amqp.connect( amqpConfig.broker.uri ).then(function(conn) {

        return conn.createChannel().then(function(ch) {

          const ok = ch.assertExchange(amqpConfig.broker.mainTopic, 'topic', {durable: true});
          return ok.then(function() {
            ch.sendToQueue(topic, Buffer.from(message, 'utf8'));
            console.log(" [AMQP] Sent %s:'%s'", key, message);
            return ch.close();
          });
        })
        .finally(function() { conn.close(); })
      })
      .catch(console.log);
};

const listen = () => {

  // Connect to AMQP broker
  amqp
      .connect(amqpConfig.broker.uri)
      .then(function(conn) {
        process.once('SIGINT', function() { conn.close(); });
        return conn.createChannel().then(function(ch) {

          let ok = ch.assertQueue(amqpConfig.queues.notifyFollowers, {durable: true});

          ok = ok.then(function(_qok) {
            return ch.consume(amqpConfig.queues.notifyFollowers, async function (msg) {
                console.log("[AMQP] Received '%s'", msg.content.toString());
                const message = JSON.parse(msg.content.toString());

                // Check if the message packet has the required fields
                if (message.userId && message.book) {

                    const notifications = await notificationController
                        .build(message.userId, message.book)
                        .catch(err => console.error(`[ERROR] ${err}`));

                    if(notifications){
                        notifications.forEach(notification =>
                            publishMessage(amqpConfig.queues.sendNotifications, notification)
                        );
                    }
                }

            }, {noAck: true});
          });

          return ok.then(function(_consumeOk) {
            console.log('[AMQP] Waiting for messages.');
          });
        });
      })
      .catch(console.warn);
};

module.exports = {
    listen,
    publishMessage,
}