import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get, push, update, remove } from "firebase/database";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";


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


const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export default database


//write database
export function writeUserData(userId, currentUser, title, content, url, country, flag, date, likeNumber) {
    const db = getDatabase();
    try{
        set(ref(db, 'users/' + userId), {
            currentUser: currentUser,
            title: title,
            content:content,
            url: url,
            country: country,
            flag: flag,
            date: date,
            likeNumber: likeNumber,
        })
        toastSuccessNotify("New Post created")
    } catch(error){
        toastErrorNotify("Failed post... please check your inputs")
    }
    
}

//update database
export function updateDB(userId, currentUser, title, content, url, country, flag, date, likeNumber){
    const db = getDatabase();

    try{
        set(ref(db, 'users/' + userId), {
            currentUser: currentUser,
            title: title,
            content:content,
            url: url,
            country: country,
            flag: flag,
            date: date,
            likeNumber: likeNumber,
        })
        toastSuccessNotify("Data updated successfully!")
    }catch(error){
        toastErrorNotify("Update failed... Please check your inputs")
    }
}


//comment database
export function commentDB(userId, currentUser, title, content, url, country, flag, date, likeNumber, comment){
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        currentUser: currentUser,
        title: title,
        content:content,
        url: url,
        country: country,
        flag: flag,
        date: date,
        likeNumber: likeNumber,
        comment: comment,
    })
        .then(() => {
            toastSuccessNotify("Your comment added")
        })
        .catch((error) => {
            toastErrorNotify("Failed comment...")
        });
}


//like database
export function likesDB(userId, currentUser, title, content, url, country, flag, date, likeNumber){
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        currentUser: currentUser,
        title: title,
        content:content,
        url: url,
        country: country,
        flag: flag,
        date: date,
        likeNumber: likeNumber,
    })
        .then(() => {
            toastSuccessNotify("You liked post :)")
        })
        .catch((error) => {
            toastErrorNotify("Failed...")
        });
}

//remove database

export function removeDB(userId){
    const db = getDatabase();
    remove(ref(db, 'users/' + userId))
        .then(() => {

            // Data saved successfully!
        })
        .catch((error) => {
            // The write failed...
        });
}


