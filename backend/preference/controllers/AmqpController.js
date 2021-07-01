const amqp = require('amqplib');
const amqpConfig = require('../config/amqp.config');
const userPreferenceService = require('../services/UserPreferenceService');

const connect = () => {

  amqp
    .connect(amqpConfig.brokerUri).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {

      let ok = ch.assertQueue(amqpConfig.brokerUri, {durable: true});

      ok = ok.then(function(_qok) {
        return ch.consume(amqpConfig.queues.updatePreferences, function(msg) {
          console.log("[AMQP] Received '%s'", msg.content.toString());
          const preference = JSON.parse(msg.content.toString());

          userPreferenceService.list(preference.userId)
          .then(p => {
            return (p ? userPreferenceService.edit(preference) : userPreferenceService.add({
              userId: preference.userId,
              categories : {
                [preference.category]: 1
              }
            }))
          })
          .then(p => console.log(`[AMQP] Done : ${JSON.stringify(p)}`))
          .catch(err => console.error(err));

        }, {noAck: true});
      });

      return ok.then(function(_consumeOk) {
        console.log('[AMQP]  Waiting for messages.');
      });
    });
  })
  .catch(console.warn);
}

module.exports = {
  connect,
}