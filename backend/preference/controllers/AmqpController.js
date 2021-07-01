const userPreferenceService = require('../services/UserPreferenceService');

const connect = () => {
  const amqp = require('amqplib');

  amqp.connect(process.env.AMQP_BROKER_URI).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {

      let ok = ch.assertQueue('update-preferences', {durable: true});

      ok = ok.then(function(_qok) {
        return ch.consume('update-preferences', function(msg) {
          console.log(" [x] Received '%s'", msg.content.toString());
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
          .then(p => console.log(`Done : ${JSON.stringify(p)}`))
          .catch(err => console.error(err));
          
        }, {noAck: true});
      });

      return ok.then(function(_consumeOk) {
        console.log(' [*] Waiting for messages.');
      });
    });
  }).catch(console.warn);
}

module.exports = {
  connect,
}