import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD17pmzCoWog485RLqjKKCRLoFOmlEtOpc",
    authDomain: "dating-f7f4a.firebaseapp.com",
    databaseURL: "https://dating-f7f4a.firebaseio.com",
    projectId: "dating-f7f4a",
    storageBucket: "dating-f7f4a.appspot.com",
    messagingSenderId: "1090309134616",
    appId: "1:1090309134616:web:bd742be6ae8120b1d3a66d",
    measurementId: "G-7CFE2K5Z3Q"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
