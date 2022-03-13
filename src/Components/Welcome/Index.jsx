import React, {useState, useContext, useEffect} from "react";
import LogOut from "../LogOut/Index";
import Quiz from "../Quiz/Index";
import { FirebaseContext } from "../Firebase";

const Welcome = (props) => {

    const firebase = useContext(FirebaseContext)

    const [userSession, setUserSession] = useState(null)

    const [userData, setUserData] = useState({})

    useEffect(() => {
        let listener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push("/")
        })

        if(userSession !== null) {
            firebase.user(userSession.uid)
            .get()
            .then( (doc) => {
                if (doc && doc.exists) {
                    const myData = doc.data()
                    setUserData(myData)
                }
            })
            .catch((error) => {

            })
        }
        return () => [
            listener()
        ]
    }, [userSession])

    return userSession === null ? (
        <>
            <div className="loader"></div>
            <p>Patientez...</p>
        </>
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <LogOut/>
                <Quiz userData={userData}/>
            </div>
        </div>
    )
}

export default Welcome