# Books App
Una semplice applicazione web per gestire i libri letti 📚

## Feature correnti:
* Preferenze dell'utente
* Una homepage personalizzata sulle preferenze dell'utente
* Ricerca di libri e volumi tramite una pagina di ricerca (powered by Google APIs)
* Registrazione e Login utenti (powered by Google Firebase Authentication APIs)
* Recensioni degli utenti
* Notifiche Email
* Salvataggio di informazioni legate all'utente, come ad esempio libri letti, numero di pagine lette e così via.
* Una pagina di profilo utente
* Logica di follow/following tra utenti
* Infrastruttura Docker

## Prossime feature
* Nessuna feature futura attesa

## Requisiti minimi
* Docker 
* Docker Swarm
* Docker Compose (se la versione di Docker corrente non include già Docker Compose)

## Quick start
Per il "quick start" dell'applicativo ci sono 2 file, uno per avviare l'ambiente di sviluppo e l'altro quello di produzione:
* start_dev.sh : avvia l'infrastruttura Docker in ambiente di sviluppo
* start_prod.sh : avvia l'infrastruttura Docker in ambiente di produzione

NOTE: per avviare il progetto è necessario inserire il file di Service Account Key, il file è contenuto nella repository esclusivamente per facilitare la valutazione del progetto all'interno di un ambito didattico. In ambiente reale sarebbe dovuto essere escluso dalla repository, in special modo se pubblica.
## Installazione manuale

### Start RabbitMQ instance
Prima di avviare qualsiasi componente è necessario avviare il container del servizio AMQP RabbitMQ.
Per farlo, eseguire:

```bash
#!/bin/bash
$ cd ./docker
$ docker-compose -f docker-compose.[dev/prod].yml --project-name=mevn_books up --build -d rabbitmq
```

Se quello che si sta eseguendo è il primo avvio del servizio, lo script Dockerfile creerà le code, gli utenti ed altri componenti. Per fare ciò impiegherà più tempo rispetto ai futuri avvii ed è importante attendere questo tipo di inizializzazione prima di avviare altri container/microservizi che sfruttano questo servizio.
Il container RabbitMQ in DEV esporrà la porta ```5672``` per le connessioni esterne da parte di altri microservizi e ```15672``` per accedere alla GUI di amministrazione.
In ambiente di produzione ogni porta sarà chiusa all'esterno per ragioni di sicurezza.

### Avvio del Backend.
#### Sviluppo
Per lanciare l'infrastruttura Docker di sviluppo, eseguire il comando di seguito sostituendo "service name" con il nome del servizio che si intende avviare:
```bash
#!/bin/bash
$ cd ./docker
$ docker-compose -f docker-compose.dev.yml --project-name=mevn_books up --build -d [service name]
```
Non è previsto nessun web-server dedicato per i servizi e di default il gateway sarà in ascolto sulla porta esposta ```8080```, gli altri servizi backend saranno nascosti e non accessibili direttamente se non attraverso il gateway stesso.
#### Produzione
Per lanciare l'infrastruttura Docker di produzione, eseguire il comando di seguito sostituendo "service name" con il nome del servizio che si intende avviare:
```bash
#!/bin/bash
$ cd ./docker
$ docker-compose -f docker-compose.prod.yml --project-name=mevn_books up --build -d [service name]
```
Il Dockerfile in questo caso eseguirà il comando ```npm run build``` e successivamente copierà la cartella di distribuzione all'interno del container per essere utilizzata dal web server NGINX.
Il gateway sarà in ascolto sulla porta esposta ```8080```, gli altri servizi backend saranno nascosti e non accessibili direttamente se non attraverso il gateway stesso.

#### Test
Sono presenti test per ogni microservizio ad esclusione del frontend. Per eseguire i test è necessario eseguire questi comandi di seguito a seconda delle proprie esigenze:
* ```npm test``` : esegue tutti i test, calcola la percentuale di coverage ed esce.
* ```npm run test-n-watch``` : esegue ogni test, calcola la percentuale di coverage e rimane in ascolto.

**NOTE**: Per eseguire i comandi di test è necessario prima cambiare il file di configurazione relativo alla connessione con il DB del servizio nel valore  ```host``` oppure eseguire i comandi direttamente all'interno del container. Questo perchè il database host è impostato su un hostname che risponde solamente all'interno del Docker network. Se si intende cambiare il valore di ```host``` , è consiglieto utilizzare l'indirizzo IP ```0.0.0.0``` e cambiare la porta in modo adeguato anche sul file Docker.

At the moment the code coverage is good and there are both unit and integration tests.
Tutti i test sono eseguiti tramite CI GitHub actions al momento della push (sorgenti nella cartella ```.github/workflows```)
### Start frontend
Per prima cosa è necessario andare nella cartella ```fronted/config``` e prendendo come esempio ```firebase_sample.js```, crearne uno nuovo chiamandolo ```firebase.js``` con all'interno le configurazioni per eseguire l'autenticazione ai servizi Firebase.

Ora è possibile avviare il frontend!

#### Sviluppo
Per avviare in ambiente locale SENZA l'uso di Docker:
```bash
#!/bin/bash
$ npm serve # Watchout for VueJS version installed in your machine 
```
Per avviare in ambiente locale utilizzando Docker:
```bash
#!/bin/bash
$ docker-compose -f docker-compose.dev.yml --project-name=mevn_books up --build -d frontend
```
Con quest'ultima configurazione è possibile continuare a sviluppare utilizzando però i container Docker.
Il sorgente sarà aggiornato e ricompilato ogni volta che si salverà, questo grazie all'utilizzo dei volumi Docker.
Di default la porta esposta per accedere al frontend è la ```8081```.
#### Production
Per compilare ed avviare il frontend in ambiente di produzione è necessario eseguire:
```bash
#!/bin/bash
$ docker-compose -f docker-compose.prod.yml --project-name=mevn_books up --build -d frontend
```
Il Dockerfile in questo caso eseguirà il comando ```npm run build``` e successivamente copierà la cartella di distribuzione all'interno del container per essere utilizzata dal web server NGINX.
Di default la porta esposta per accedere al frontend è la ```8000```.