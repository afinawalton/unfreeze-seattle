import React, { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import useLogout from './../hooks/useLogout';

const NavBar = (props) => {
    const { user } = useContext(UserContext);
    const { logoutUser } = useLogout();

    // if (userLoggedIn = true) { display different NavBar }
    // const auth = useAuth();

    // if auth.user, render the standard navbar
    // if not, only display a login
    const userNav = user ? 
    <ul>
        <li><a href="/">News Feed</a></li>
        <li><a href="/my-profile">My Profile</a></li>
        <li><a href="/neighborhoods">Neighborhoods</a></li>
        <li><button onClick={() => logoutUser()}>Log Out</button></li>
    </ul> :
    null
    // <ul>
    //     <li><a href="/create-account">Home</a></li>
    //     <li><a href="/neighborhoods">Neighborhoods</a></li>
    //     <li><a href="/edit-profile">Edit Profile</a></li>
    // </ul>

    return (
        userNav
    )
}

export default NavBar;