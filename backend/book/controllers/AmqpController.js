const amqp = require('amqplib');
const amqpConfig = require('../config/amqp.config');

const publish = (topic, message) => {
  const key = 'info';

  if(typeof message !== String){
    message = JSON.stringify(message);
  }

  amqp.connect( amqpConfig.broker.uri ).then(function(conn) {

    return conn.createChannel().then(function(ch) {
      
      const ok = ch.assertExchange(amqpConfig.broker.mainTopic, 'topic', {durable: true});
      return ok.then(function() {
        ch.sendToQueue(topic, Buffer.from(message, 'utf8'));
        console.log(" [AMQP] Sent %s:'%s'", key, message);
        return ch.close();
      });
    }).finally(function() { conn.close(); })
  })
  .catch(console.log);
}

module.exports = {
  publish,
}