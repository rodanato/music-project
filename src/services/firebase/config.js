// @flow
import * as firebase from 'firebase/app';
import "firebase/auth";
// import "firebase/firestore";

type Config = {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

type ConfigEnv = {
  [env: string]: Config
};

const configEnv: ConfigEnv = {
  test: {
    apiKey: "AIzaSyDtgnKaUTXhXIjwI5VbFcqhnn4XYPhUSZo",
    authDomain: "social-music-addd0.firebaseapp.com",
    databaseURL: "https://social-music-addd0.firebaseio.com",
    projectId: "social-music-addd0",
    storageBucket: "social-music-addd0.appspot.com",
    messagingSenderId: "751844464426",
    appId: "1:751844464426:web:7bfc02a2849bda1a3e3053"
  },
  // TODO: Update to real config
  prod: {
    apiKey: "AIzaSyDtgnKaUTXhXIjwI5VbFcqhnn4XYPhUSZo",
    authDomain: "social-music-addd0.firebaseapp.com",
    databaseURL: "https://social-music-addd0.firebaseio.com",
    projectId: "social-music-addd0",
    storageBucket: "social-music-addd0.appspot.com",
    messagingSenderId: "751844464426",
    appId: "1:751844464426:web:7bfc02a2849bda1a3e3053"
  }
};

const env: string = process.env.REACT_APP_ENV || "test";
const config: Config = configEnv[env];

firebase.initializeApp(config);

const auth = firebase.auth();

export {
  auth,
  config
};