import React, { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import useLogout from './../hooks/useLogout';
import './NavBar.css';

const NavBar = () => {
    const { user } = useContext(UserContext);
    const { logoutUser } = useLogout();

    const userNav = user ?
    <nav>
        <h1><span className="green">Unfreeze</span> <span className="blue">Seattle</span></h1>
        <ul>
            <li><a href="/">News Feed</a></li>
            <li><a href="/my-profile">My Profile</a></li>
            <li><a href="/neighborhoods">Neighborhoods</a></li>
            <li><button id='logoutButton' onClick={() => logoutUser()}>Log Out</button></li>
        </ul>
    </nav> :
    null

    return (
        userNav
    )
}

export default NavBar;