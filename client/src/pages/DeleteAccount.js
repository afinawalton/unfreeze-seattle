import React from 'react';
import useAuth from '../hooks/useAuth';

const DeleteAccount = () => {
    const { deleteUser } = useAuth();

    return (
        <div>
            <h2>We're sorry to see you go!</h2>
            <h3>Please click below to confirm deletion of your account.</h3>
            <button onClick={() => deleteUser()}>Delete Account</button>
        </div>
    )
}

export default DeleteAccount;