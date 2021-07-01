FROM rabbitmq:3.7-management-alpine

COPY docker/prod/rabbitmq/rabbitmq.config /etc/rabbitmq/rabbitmq.config
# RUN rabbitmq-plugins enable --offline rabbitmq_mqtt rabbitmq_federation_management rabbitmq_stomp