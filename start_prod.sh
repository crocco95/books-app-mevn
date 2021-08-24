#!/bin/sh

cd ./docker
docker-compose -f docker-compose.prod.yml --project-name=mevn_books up --build -d rabbitmq
docker-compose -f docker-compose.prod.yml --project-name=mevn_books up --build -d mongodb-books mongodb-users mongodb-preferences
docker-compose -f docker-compose.prod.yml --project-name=mevn_books up --build -d books users preferences notifications gateway
docker-compose -f docker-compose.prod.yml --project-name=mevn_books up --build -d frontend
