import firebase from 'firebase/app';
import 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyCrfAL6I72p3t3mjK9K3wT2QvLGbOdaEqc",
    authDomain: "park-in-space.firebaseapp.com",
    projectId: "park-in-space",
    storageBucket: "park-in-space.appspot.com",
    messagingSenderId: "27864174024",
    appId: "1:27864174024:web:ed01f5e706f900c906c4fd",
    measurementId: "G-LGKZFG1KXF"
};

firebase.initializeApp(firebaseConfig);


const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
    return messaging.getToken({vapidKey: 'GENERATED_MESSAGING_KEY'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    });
  }

  export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});