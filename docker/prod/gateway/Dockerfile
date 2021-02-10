FROM express-gateway

WORKDIR /var/lib/eg

COPY ./backend/gateway/config/gateway.config.yml ./gateway.config.yml
COPY ./backend/gateway/config/system.config.yml ./system.config.yml

EXPOSE 8080