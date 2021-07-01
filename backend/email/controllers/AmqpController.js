const amqp = require('amqplib');
const emailService = require('../services/EmailService');

const connect = () => {

  // Connect to AMQP broker
  amqp
    .connect(process.env.AMQP_BROKER_URI)
    .then(function(conn) {
      process.once('SIGINT', function() { conn.close(); });
      return conn.createChannel().then(function(ch) {

        let ok = ch.assertQueue(process.env.AMQP_NOTIFICATION_TOPIC, {durable: true});

        ok = ok.then(function(_qok) {
          return ch.consume(process.env.AMQP_NOTIFICATION_TOPIC, function(msg) {
            console.log("[AMQP] Received '%s'", msg.content.toString());
            const message = JSON.parse(msg.content.toString());

            // Check if the message packet has the required fields
            if(message.target && message.subject && message.textBody && message.htmlBody){

              // Call the send function on EmailService
              emailService
                  .send(message.target, message.subject, message.textBody, message.htmlBody)
                  .then(p => console.log(`[AMQP] Done : ${JSON.stringify(p)}`))
                  .catch(err => console.error(err));
            }

          }, {noAck: true});
        });

        return ok.then(function(_consumeOk) {
          console.log('[AMQP] Waiting for messages.');
        });
      });
    })
    .catch(console.warn);
}

module.exports = {
  connect,
}