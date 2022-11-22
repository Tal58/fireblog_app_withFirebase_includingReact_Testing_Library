import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"


// env. is used for security reasons
const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    databaseURL: process.env.REACT_APP_databaseURL,
  };

  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
