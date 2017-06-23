import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyAyPFAZInMyPgIpaGrFhqfiZJ_iQkSjKBs",
  authDomain: "cpsurveytest.firebaseapp.com",
  databaseURL: "https://cpsurveytest.firebaseio.com",
  projectId: "cpsurveytest",
  storageBucket: "",
  messagingSenderId: "461303632771"
};

firebase.initializeApp(config);

const database  = firebase.database();
const auth      = firebase.auth();

export { database, auth };
