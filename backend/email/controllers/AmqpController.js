const emailService = require('../services/EmailService');

const connect = () => {
  const amqp = require('amqplib');

  amqp.connect(process.env.AMQP_BROKER_URI).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {

      let ok = ch.assertQueue('send-notification', {durable: true});

      ok = ok.then(function(_qok) {
        return ch.consume('send-notification', function(msg) {
          console.log(" [x] Received '%s'", msg.content.toString());
          const message = JSON.parse(msg.content.toString());

          emailService.send(message.target, message.subject, message.textBody, message.htmlBody)
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