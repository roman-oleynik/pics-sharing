import firebase from 'firebase';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyBuDlVwZqe5FkTqc7wUsSpThipzpNJAxwo",
    authDomain: "pics-sharing-943a2.firebaseapp.com",
    databaseURL: "https://pics-sharing-943a2.firebaseio.com",
    projectId: "pics-sharing-943a2",
    storageBucket: "pics-sharing-943a2.appspot.com",
    messagingSenderId: "493557490632",
    appId: "1:493557490632:web:4cca0fca4ded7121f716fd"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }