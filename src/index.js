import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot,
    query, where, orderBy, serverTimestamp, getDoc
} from 'firebase/firestore' 
import {
    getAuth, createUserWithEmailAndPassword, signOut,
    signInWithEmailAndPassword,
    SignInMethod
} from 'firebase/auth'

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
const auth = getAuth()

const q = query(colRef, orderBy('createdAt'))

// initializing sections
const loginSection= document.getElementById("login-section")
const dashboardSection = document.getElementById("dashboard")
const signInSection = document.getElementById("sign-in-section")

const signInForm = document.querySelector(".signIn")
signInForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signInForm.email.value
    const password = signInForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .them((cred) =>{
            window.alert(`user created ${cred.user}`)
           
            dashboardSection.classList.remove('hidden')
        })
        .catch((err) => {
            window.alert(`ALERT ${err.user}`)
        })

    const changelogin = document.querySelector('.loginBTN')
    changelogin.addEventListener('click', () => {
        loginSection.classList.remove('hidden')
        signInSection.classList.add('hidden')
    })
    
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
   e.preventDefault()

   const email = loginForm.email.value
   const password =loginForm.password.value

   signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
        window.alert(`User created: ${cred.user}`)

        dashboardSection.classList.remove('hidden')
    })
    .catch((err) =>{
        window.alert(`ALERT: ${err.message}`)
    })
    
})

    const changesignin = document.querySelector('.signinBTN')
    changesignin.addEventListener('click', () =>  {
        loginSection.classList.add('hidden')
        signInSection.classList.remove('hidden')
    })
        
    const changelogin = document.querySelector('.loginBTN')
    changelogin.addEventListener('click', () => {
        loginSection.classList.remove('hidden')
        signInSection.classList.add('hidden')
    })   
