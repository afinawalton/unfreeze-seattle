import React from 'react';
import { useAuth } from '../hooks/useAuth';

const NavBar = (props) => {
    // if (userLoggedIn = true) { display different NavBar }
    const auth = useAuth();

    // if auth.user, render the standard navbar
    // if not, only display a login
    const currentUser = auth.user ? 
    <ul>
        <li><a href="/">News Feed</a></li>
        <li><a href="/my-profile">My Profile</a></li>
        <li><a href="/neighborhoods">Neighborhoods</a></li>
        <li><button onClick={() => auth.logout()}>Log Out</button></li>
    </ul> :
    <ul>
        <li><a href="/create-account">Home</a></li>
        <li><a href="/neighborhoods">Neighborhoods</a></li>
        <li><a href="/edit-profile">Edit Profile</a></li>
    </ul>

    return (
        currentUser
    )
}

export default NavBar;