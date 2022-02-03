import React, { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import useLogout from './../hooks/useLogout';

const NavBar = () => {
    const { user } = useContext(UserContext);
    const { logoutUser } = useLogout();

    const userNav = user ?
    <ul>
        <li><a href="/">News Feed</a></li>
        <li><a href="/my-profile">My Profile</a></li>
        <li><a href="/neighborhoods">Neighborhoods</a></li>
        <li><button onClick={() => logoutUser()}>Log Out</button></li>
    </ul> :
    null

    return (
        userNav
    )
}

export default NavBar;