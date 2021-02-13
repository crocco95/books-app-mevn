# Books App
A simple NEVM application to manage books 📚

## Current features:
* Search books using the search page on frontend (powered by Google APIs)
* Users registration & login (powered by Google Firebase Authentication APIs)
* Users reviews (just add for now)
* Docker infrastructure

## Next features
* User preferences set-up after registration
* Custom homepage Netflix style
* Saving on DB personal data such as page read for each book, books read, etc. (Working on...)
* Decent user profile page
* Follow - Following users logic
* Email notifications

## Instructions
### Start frontend
First thing first, go to ```fronted/config``` and taking the file ```firebase_sample.js``` as example, create a new one named ```firebase.js``` with inside the Firebase API configs taken from Firebase Console.

Now you can start the frontend client by typing:

```bash
$ npm serve # Debug/local purpose
$ npm build # Prod environment
```

### Start backend
Before to run the project, go inside backend/book/.env file and change the Google Books API key with your.

NOTE: the backend has just "book" service runnable, for now.

```bash
$ npm run dev # Debug/local purpose
```