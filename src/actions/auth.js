
import { getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword,signOut } from 'firebase/auth';
import { googleAuthProvider } from '../firebase/firebase-config';
import {types} from '../types/types';
import Swal from 'sweetalert2';
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';
  
export const startLoginEmailPassword = (email, password) =>{
    return (dispatch) =>{
        
        dispatch(startLoading());

        const auth = getAuth();
        signInWithEmailAndPassword(auth,email,password)
        .then(async ({user}) =>{
            dispatch(login(user.uid, user.displayName))
            dispatch(finishLoading());
        })
        .catch(e => {
            dispatch(finishLoading());
            Swal.fire('Fail',e.code,'error')
        })
        
    }
}
 
export const startGoogleLogin = () =>{
    return (dispatch) =>{
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            });
    }
}

export const startRegisterWithEmailPasssword = (email,password,name) => {
    return (dispatch) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth,email,password)
            .then(async ({user}) =>{

                await updateProfile(auth.currentUser,{displayName:name});
                
                dispatch(login(user.uid, user.displayName))
            })
            .catch(e => {
                Swal.fire('Fail',e.code,'error')
            })
    }
}
 
export const login = (uid, displayName) =>(
    {
        type:types.login,
        payload: {
            uid,
            displayName
        }
    }
)

export const startLogout = () => {
    return async (dispatch) => {
        const auth = getAuth();
        await signOut(auth);

        dispatch(logout());
        dispatch(noteLogout())
    }
}

export const logout = () => ({
    type: types.logout
})

//usar await y sync cuando utilizes funciones de firebase