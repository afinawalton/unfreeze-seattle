import React from 'react';
import { useAuth } from '../use-auth';

const NavBar = (props) => {
    // if (userLoggedIn = true) { display different NavBar }
    const auth = useAuth();

    // if auth.user, render the standard navbar
    // if not, only display a login
    const currentUser = auth.user ? 
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/main-feed">News Feed</a></li>
        <li><a href="/my-profile">My Profile</a></li>
        <li><a href="/neighborhoods">Neighborhoods</a></li>
        <li><button onClick={() => auth.logout()}>Log Out</button></li>
    </ul> :
    <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/neighborhoods">Neighborhoods</a></li>
    </ul>

    return (
        currentUser
    )
}

export default NavBar;