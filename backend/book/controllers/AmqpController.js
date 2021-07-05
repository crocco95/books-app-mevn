const amqp = require('amqplib');
const amqpConfig = require('../config/amqp.config');

const publish = (queue, message) => {
  const key = 'info';

  console.log(` [AMQP] Preparing to send message to ${queue} and the message is ${JSON.stringify(message)}`);

  if(typeof message !== String){
    message = JSON.stringify(message);
  }

  amqp.connect( amqpConfig.broker.uri ).then(function(conn) {

    console.log(` [AMQP] Trying to connect to the host...`);

    return conn.createChannel().then(function(ch) {
      
      const ok = ch.assertExchange(amqpConfig.broker.mainTopic, 'topic', {durable: true});
      return ok.then(function() {
        ch.sendToQueue(queue, Buffer.from(message, 'utf8'));
        console.log(` [AMQP] Sent ${key}:'${message}' on '${queue}'`);
        return ch.close();
      });
    })
    .finally( () => conn.close());
  })
  .catch(console.log);
}

module.exports = {
  publish,
}