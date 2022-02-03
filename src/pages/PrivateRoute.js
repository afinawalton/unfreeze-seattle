import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
import MainFeed from './MainFeed';

const PrivateRoute = () => {
    const { user } = useContext(UserContext);

    return user === null ? <Navigate to='/login' /> : <Navigate to='/main-feed' />
}

export default PrivateRoute;