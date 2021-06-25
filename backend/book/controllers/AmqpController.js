var amqp = require('amqplib');

const publish = (topic, message) => {
  const key = 'info';

  if(typeof message !== String){
    message = JSON.stringify(message);
  }

  amqp.connect( process.env.AMQP_BROKER_URI ).then(function(conn) {

    return conn.createChannel().then(function(ch) {
      
      const ok = ch.assertExchange('amq.topic', 'topic', {durable: true});
      return ok.then(function() {
        ch.sendToQueue(topic, Buffer.from(message, 'utf8'));
        console.log(" [x] Sent %s:'%s'", key, message);
        return ch.close();
      });
    }).finally(function() { conn.close(); })
  })
  .catch(console.log);
}

module.exports = {
  publish,
}