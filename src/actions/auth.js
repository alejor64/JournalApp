import Swal from 'sweetalert2'
import { types } from "../types/types"
import {firebase, googleAuthProvider} from '../firebase/firebaseConfig'
import { finishLoading, startLoading } from "./ui"
import { noteLogout } from './notes'

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading())
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({user}) => {
                dispatch( login(user.uid, user.displayName) )
                dispatch(finishLoading())
            })
            .catch(error => {
                console.log(error.message)
                dispatch(finishLoading())
                Swal.fire('Fail', error.message, 'error')
            })
    }
}

export const startRegisterEmailPasswordName = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async({user}) => {
                await user.updateProfile({displayName: name})
                dispatch( login(user.uid, user.displayName) )
            })
            .catch(error => {
                console.log(error)
                Swal.fire('Fail', error.message, 'error')
            })
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({user}) => {
                dispatch(
                    login(user.uid, user.displayName)
                )
            })
    }
}

export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut()
        dispatch(logout())
        dispatch(noteLogout())
    }
}

export const logout = () => {
    return {
        type: types.logout
    }
}