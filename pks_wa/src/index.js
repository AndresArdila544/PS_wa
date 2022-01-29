import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  FirebaseAppProvider
} from 'reactfire'
import firebaseConfig from './firebase-config'

ReactDOM.render((
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <App />
  </FirebaseAppProvider>)
  ,

  document.getElementById('root')
);

reportWebVitals();
