import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD7eM3MS6IRRdJI5De148_nsl0xV9bSBxQ",
    authDomain: "reactapp-215fb.firebaseapp.com",
    databaseURL: "https://reactapp-215fb.firebaseio.com",
    projectId: "reactapp-215fb",
    storageBucket: "reactapp-215fb.appspot.com",
    messagingSenderId: "122723478908",
    appId: "1:122723478908:web:09fb01ab3e7eb230e288f9"
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    db,
    googleAuthProvider,
    firebase
}