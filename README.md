# Books App
A simple NEVM application to manage books 📚

## Current features:
* User preferences
* Home personalized based on preferences
* Search books using the search page on frontend (powered by Google APIs)
* Users registration & login (powered by Google Firebase Authentication APIs)
* Users reviews (just add for now)
* Saving on DB personal data such as page read for each book, books read, etc.
* Decent user profile page
* Follow - Following users logic
* Docker infrastructure

## Next features
* Email notifications

## Instructions
### Start frontend
First thing first, go to ```fronted/config``` and taking the file ```firebase_sample.js``` as example, create a new one named ```firebase.js```
with inside the Firebase API configs taken from Firebase Console.

Now you can start the frontend client by typing:

#### Development
For local purpose w/o Docker
```bash
#!/bin/bash
$ npm serve # Watchout for VueJS version installed in your machine 
```
For local purpose w/ Docker
```bash
#!/bin/bash
$ docker-compose -f docker-compose.dev.yml --project-name=mevn_books up --build -d frontend
```
With this configuration you can continue to develop on local and the containers
will update every time you save because of the volumes.
By default the frontend listen on port ```8081```.
#### Production
Go to Docker directory and execute:
```bash
#!/bin/bash
$ docker-compose -f docker-compose.prod.yml --project-name=mevn_books up --build -d frontend
```
The Dockerfile in this case will execute the command ```npm run build``` and
than copy the distribution directory to be served using NGINX web server.
By default the frontend listen on port ```8000```.
### Start backend
Before to run the project, go inside backend/book/.env file and change the
Google Books API key with yours.

#### Development
You can run every service on local using the following command inside the
service directory:
```bash
#!/bin/bash
$ npm run dev
```
You can also (recommended) use Docker dev/local infrastructure by launching:
```bash
#!/bin/bash
$ docker-compose -f docker-compose.dev.yml --project-name=mevn_books up --build -d
```
There isn't a dedicated web server and by default the gateway listen on port ```8080```, the other services are hidden behind the gateway and are not
accessible directly.
#### Production
Go to Docker directory and execute:
```bash
#!/bin/bash
$ docker-compose -f docker-compose.prod.yml --project-name=mevn_books up --build -d
```
The Dockerfile in this case will execute the command ```npm run build``` and than
copy the distribution directory to be served using NGINX web server.
By default the gateway listen on port ```8080```, the other services are hidden behind the gateway and are not accessible directly.