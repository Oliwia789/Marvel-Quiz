import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"

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
        const app = initializeApp(firebaseConfig)
        this.auth = getAuth(app)
    }

    signupUser = (email, password) => 
    this.auth.createUserWithEmailAndPassword(email, password)

    loginUser = (email, password) => 
    this.auth.signInWithEmailAndPassword(email, password)

    signOutUser = () => this.auth.signOut()
}

export default Firebase