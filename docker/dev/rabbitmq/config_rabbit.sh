#!/bin/sh

# This script needs to be executed just once
if [ -f /$0.completed ] ; then
  echo "$0 `date` /$0.completed found, skipping run"
  exit 0
fi

# Wait for RabbitMQ startup
for  c in $(seq 5) ; do
  sleep 5
  rabbitmqctl -q node_health_check > /dev/null 2>&1
  if [ $? -eq 0 ] ; then
    echo "$0 `date` rabbitmq is now running"
    break
  else
    echo "$0 `date` waiting for rabbitmq startup"
  fi
done

# Execute RabbitMQ config commands here

# Create user
rabbitmqctl add_user $USER $PASSWORD
rabbitmqctl set_permissions -p / $USER ".*" ".*" ".*"
rabbitmqctl set_user_tags $USER administrator
echo "$0 `date` user $USER created"

# Create queues
queues=$(echo $QUEUES | tr "," "\n")

for queue in $queues
do
    rabbitmqadmin declare queue name=$queue durable=true
    echo "> queue [$queue] created"
done

echo "$0 `date` queues created"

# Create mark so script is not ran again
touch /$0.completed