import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
import MainFeed from './MainFeed';

const PrivateRoute = () => {
    // const { user, isLoading } = useContext(UserContext);
    const { user } = useContext(UserContext);

    return user ? <MainFeed /> : <Navigate to='/login' />
}

export default PrivateRoute;