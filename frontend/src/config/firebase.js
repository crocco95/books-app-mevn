// Init firebase
import firebase from 'firebase/app';
import 'firebase/firebase-auth';

const config = {
  apiKey: "AIzaSyACAcKxTXuIjy9EKMXITd4YJ9uYq7sQp2k",
  authDomain: "nevm-books-app-project.firebaseapp.com",
  projectId: "nevm-books-app-project",
  storageBucket: "nevm-books-app-project.appspot.com",
  messagingSenderId: "526442081013",
  appId: "1:526442081013:web:e487eadc2d0fd9b8d333bc"
};

const app = !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
app.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export default {
  app,
}