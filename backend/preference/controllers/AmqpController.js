const connect = () => {
  var amqp = require('amqplib');

  amqp.connect(process.env.AMQP_BROKER_URI).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {

      var ok = ch.assertQueue('update-preferences', {durable: true});

      ok = ok.then(function(_qok) {
        return ch.consume('update-preferences', function(msg) {
          console.log(" [x] Received '%s'", msg.content.toString());
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