import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
import MainFeed from './MainFeed';

const PrivateRoute = (props) => {
    // const { user, isLoading } = useContext(UserContext);

    return props.user ? <MainFeed /> : <Navigate to='/login' />
}

export default PrivateRoute;