console.log("edrich");

import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, getDocs 
} from 'firebase/firestore' 

const firebaseConfig = {
    apiKey: "AIzaSyACQCEbGGkFLra0S-PQB1FyoQCSzJ_k6iE",
    authDomain: "fir-tutorial-8b83e.firebaseapp.com",
    projectId: "fir-tutorial-8b83e",
    storageBucket: "fir-tutorial-8b83e.appspot.com",
    messagingSenderId: "154291836076",
    appId: "1:154291836076:web:931a15f0cbeb276fb53b09",
    measurementId: "G-R5L0MXNKMJ"
};

//initialize the firebase app
initializeApp(firebaseConfig);

//initialize the service
const db = getFirestore();

//Collect the reference
const colRef = collection(db,'Tasks');

//gets the collection Data
getDocs(colRef)
    .then((snapshot) => {
        let tasks = [];
        snapshot.docs.forEach((doc) => {
        tasks.push({...doc.data(), id: doc.id})
        })
        console.log(tasks);
    })
    .catch(err =>{
        console.log(err.message);
    })

console.log("edrich");
console.log("edrich");