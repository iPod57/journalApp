import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';


export const PrivateRoute = ({isLoggedIn,children}) => {

    //const location = useLocation();
    //console.log(location);

    //localStorage.setItem('lasturl',location.pathname+location.search);


    return isLoggedIn
        ? children
        : <Navigate to="/auth/login" />
}


//children son los dashboards