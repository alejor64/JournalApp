import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Redirect,
    Switch
} from "react-router-dom"
import { useDispatch } from 'react-redux'
import {firebase} from '../firebase/firebaseConfig'
import JournalScreen from '../components/journal/JournalScreen'
import AuthRouter from './AuthRouter'
import { login } from '../actions/auth'
import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import { startLoadingNotes } from '../actions/notes'

const AppRouter = () => {
    const dispatch = useDispatch()

    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if(user?.uid){
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true)

                dispatch(startLoadingNotes(user.uid))
            }else {
                setIsLoggedIn(false)
            }
            setChecking(false)
        })
    }, [dispatch, setChecking, setIsLoggedIn])

    if(checking){
        return (
            <h3>Loading...</h3>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" isLoggedIn={isLoggedIn} component={AuthRouter} />
                    <PrivateRoute exact path="/" isLoggedIn={isLoggedIn} component={JournalScreen} />
                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    )
}

export default AppRouter
