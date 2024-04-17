import firebase from 'firebase/app'; // Import the firebase namespace
import 'firebase/storage'; // Import the storage service


const firebaseConfig = {
    apiKey: "AIzaSyAbd5oP_kTm0LpL1oKRfJv1X9r70vNCoBw",
    authDomain: "yabbastocks-1310c.firebaseapp.com",
    projectId: "yabbastocks-1310c",
    storageBucket: "yabbastocks-1310c.appspot.com",
    messagingSenderId: "578527412810",
    appId: "1:578527412810:web:03614d1212752b2a571cb3",
    measurementId: "G-0L1V5TRCBT"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  // Export Firebase instance
  export default firebase;


