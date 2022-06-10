import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyB_0IK76JWFw4o0d0-cNEUhRifyV4iqJFk",
    authDomain: "react-apps-ddeea.firebaseapp.com",
    projectId: "react-apps-ddeea",
    storageBucket: "react-apps-ddeea.appspot.com",
    messagingSenderId: "310327780130",
    appId: "1:310327780130:web:d0567fdfcc1bfec2a83b7b",
    measurementId: "G-50XE1T7KNF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);


//Grabar datos en mi db
const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();//twitter, facebook, github
/* const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider(); */

export {
    db,
    googleAuthProvider,
    firebase
}