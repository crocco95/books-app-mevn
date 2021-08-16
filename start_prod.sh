#!/bin/sh

SERVICE_ACCOUNT_KEY_FILE_BOOK=./backend/book/config/serviceAccountKey.json
SERVICE_ACCOUNT_KEY_FILE_USER=./backend/user/config/serviceAccountKey.json

if [ ! -f "$SERVICE_ACCOUNT_KEY_FILE_BOOK" ]; then
    echo "#################################################"
    echo "ATTENZIONE! Prima di continuare assicurarsi che sia stato inserito il file \"$SERVICE_ACCOUNT_KEY_FILE_BOOK\" per l'autenticazione ai servizi Firebase!"
    echo "È possibile trovare un file Service Account Key di esempio al link \"https://ghostbin.com/paste/3FY0H/0000953717\" inserendo come password il numero della mia matricola"
    echo "#################################################"
    exit -1
fi

if [ ! -f "$SERVICE_ACCOUNT_KEY_FILE_USER" ]; then
    echo "#################################################"
    echo "ATTENZIONE! Prima di continuare assicurarsi che sia stato inserito il file \"$SERVICE_ACCOUNT_KEY_FILE_USER\" per l'autenticazione ai servizi Firebase!"
    echo "È possibile trovare un file Service Account Key di esempio al link \"https://ghostbin.com/paste/3FY0H/0000953717\" inserendo come password il numero della mia matricola"
    echo "#################################################"
    exit -1
fi

cd ./docker
docker-compose -f docker-compose.prod.yml --project-name=mevn_books up --build -d rabbitmq
docker-compose -f docker-compose.prod.yml --project-name=mevn_books up --build -d mongodb-books mongodb-users mongodb-preferences
docker-compose -f docker-compose.prod.yml --project-name=mevn_books up --build -d books users preferences notifications gateway
docker-compose -f docker-compose.prod.yml --project-name=mevn_books up --build -d frontend
