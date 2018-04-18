import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

function startApp() {
  var config = {
    apiKey: 'AIzaSyAJ9I8cztPHjro9-kqEPz0Nnz-fQ4xISB8',
    authDomain: 'dougneves-fb-web-codelab.firebaseapp.com',
    databaseURL: 'https://dougneves-fb-web-codelab.firebaseio.com',
    projectId: 'dougneves-fb-web-codelab',
    storageBucket: 'dougneves-fb-web-codelab.appspot.com',
    messagingSenderId: '966854736004'
  };
  firebase.initializeApp(config);
  ReactDOM.render(<App />, document.getElementById('root'));
  registerServiceWorker();
}

if (window.cordova) {
  console.log('cordova ligado');
  document.addEventListener('deviceready', startApp, false);
} else {
  console.log('cordova nao encontrado');
  startApp();
}
