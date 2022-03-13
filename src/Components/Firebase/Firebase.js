import firebase from "firebase/compat/app"
import {initializeApp} from "firebase/app"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from "firebase/auth"
import "firebase/compat/firestore"
import { doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC18Nar0FRuhoI8QGn_WuNgnWLDK0jv7aY",
    authDomain: "marvel-quiz-cdef4.firebaseapp.com",
    projectId: "marvel-quiz-cdef4",
    storageBucket: "marvel-quiz-cdef4.appspot.com",
    messagingSenderId: "79286314351",
    appId: "1:79286314351:web:ffbeb3fb050105d5edb49a"
};


class Firebase {
    constructor() {
        const app = firebase.initializeApp(firebaseConfig)
        this.auth = getAuth(app)
        this.db = app.firestore()
    }

    signupUser = (email, password) => 
    createUserWithEmailAndPassword(this.auth, email, password)

    loginUser = (email, password) => 
    signInWithEmailAndPassword(this.auth, email, password)

    signOutUser = () => this.auth.signOut()

    passwordReset = (email) => sendPasswordResetEmail(this.auth, email)

    user = (uid) => this.db.doc(`users/${uid}`)
}

export default Firebase