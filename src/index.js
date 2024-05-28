import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot,
    query, where, orderBy, serverTimestamp, getDoc
} from 'firebase/firestore' 
import {
    getAuth, createUserWithEmailAndPassword, signOut
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

////gets the collection Data-------------------
// getDocs(colRef)
//     .then((snapshot) => {
//         let tasks = [];
//         snapshot.docs.forEach((doc) => {
//         tasks.push({...doc.data(), id: doc.id})
//         })
//         console.log(tasks);
//     })
//     .catch(err =>{
//         console.log(err.message);
//     })
////--------------------------------------------



//Real-time collection of Data
onSnapshot(q, (snapshot) => {
    let tasks = [];
    snapshot.docs.forEach((doc) => {
    tasks.push({...doc.data(), id: doc.id})
    })
    console.log(tasks);
})


//add task
const AddTaskForm = document.querySelector('.add')
AddTaskForm.addEventListener('submit',  (e) =>{
    e.preventDefault()

    //add the values that the 'colRef' collects
    addDoc(colRef, {
        task: AddTaskForm.taskname.value, 
        startDate: AddTaskForm.startdate.value ,
        dueDate: AddTaskForm.duedate.value,
        assignedperson: AddTaskForm.assignedperson.value,
        createdAt: serverTimestamp()
    })
    .then(() =>{
        AddTaskForm.reset()
    })
})

const DeleteTaskForm = document.querySelector('.delete')
DeleteTaskForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const docRef = doc(db, 'Tasks', DeleteTaskForm.id.value)
        
    deleteDoc(docRef)
        .then(() => {
            DeleteTaskForm.reset()
        })
        .catch(err => {
            console.log("Wrong input");
            console.log(err.message);
        })

})

//fetch a single file

const docRef = doc(db, 'Tasks', 'nGJ91FXkZsmSDP6argYM')

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

//signing users up
const Signupform = document.querySelector('.signup')
DeleteTaskForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const email = Signupform.email.value
    const password = Signupform.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) =>{
            console.log("User created: ",cred.user)
            Signupform.reset()
        })
        .catch((err) => {
            console.log(err.message)
        })

})

const LoginForm = document.querySelector('.login')
LoginForm.addEventListener('submit', (e) =>{
    e.preventDefault()

    const email = LoginForm.email.value
    const password = LoginForm.email.value


})

const LogoutForm = document.querySelector('.logout')
LogoutForm.addEventListener('click', () => {
    
    signOut()
})

