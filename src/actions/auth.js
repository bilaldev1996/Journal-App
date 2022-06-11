import { types } from "../types/types"
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import swal from "sweetalert";
import { finishLoading, startLoading } from "./ui";




//Nuestra primera accion asincrona, hacer login en firebase
export const startLoginEmailPassword = (email, password) => {
    return ( dispatch ) => {
        
        dispatch(startLoading());
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then( ({ user }) => {
                dispatch(login(user.uid, 
                    user.displayName));
                
                //Bloquear boton login 
                swal("Good!!", "Welcome "+user.displayName, "success");
                dispatch(finishLoading());
            } )
            .catch( ({ message }) => {
                dispatch(finishLoading());
                swal("Ups!!", message, "error");
            } )
    }
}

export const googleLogin = () =>{
    return ( dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)//Retorna una promsesa
            .then(({ user }) =>{
                dispatch(login(user.uid,user.displayName))
            } ) 
    }
}


export const firebaseRegister = (name, email, password) => {
    return ( dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( async ({ user }) => {
                await user.updateProfile({
                    displayName: name
                })
                swal("Done!", "Welcome "+name, "success");
                dispatch(login(user.uid,user.displayName))
            } ).catch( ({ message }) => {
                swal(message, "Login please!", "error");
            })
    }
}


export const login = (uid,displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

//Hacer logout en firebase
export const startLogout = () => {
    return async (dispatch) => {
        try {
            await firebase.auth().signOut();
            dispatch( logout() );
        } catch (error) {
            console.log(error);
        }
    }
}

export const logout = () => ({
    type: types.logout
})

