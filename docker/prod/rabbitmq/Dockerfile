FROM rabbitmq:3.7-management-alpine

COPY docker/dev/rabbitmq/rabbitmq.conf /etc/rabbitmq/rabbitmq.conf

COPY docker/dev/rabbitmq/config_rabbit.sh /opt/config_rabbit.sh
RUN chmod u+x /opt/config_rabbit.sh

COPY docker/dev/rabbitmq/init.sh /opt/init.sh
RUN chmod u+x /opt/init.sh

ENV USER=booksmq
ENV PASSWORD=booksmq123!

ENV QUEUES=send-notification,update-preferences

CMD [ "/opt/init.sh" ]

EXPOSE 5672 15672