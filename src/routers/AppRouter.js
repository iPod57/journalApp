
import React, { useEffect, useState } from 'react'
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {
    
    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth,(user) => {
            if(user?.uid){
                dispatch(login(user.uid,user.displayName))
                setIsLoggedIn(true);

                dispatch(startLoadingNotes(user.uid));

            }else{
                setIsLoggedIn(false);
            }

            setChecking(false);
        })
        
    }, [dispatch,setChecking,setIsLoggedIn]) //ponemos dispatch solo para quitar warning porque el authstate es un observable

    if(checking){
        return (
            <h1>Wait...</h1>
        )
    }
    
    return (
        <BrowserRouter>
                <Routes>

                    <Route path="/auth/*" element={
                        <PublicRoute isLoggedIn={isLoggedIn}>
                            <AuthRouter />
                        </PublicRoute>
                    } />
                    

                    
                    <Route path='/' element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <JournalScreen/>
                        </PrivateRoute>
                    } />

                    <Route path='*' element={<Navigate to='/auth/login'/>} />

                </Routes>
        </BrowserRouter>
    )
}
