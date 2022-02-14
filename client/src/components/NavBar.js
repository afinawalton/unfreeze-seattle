import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../hooks/UserContext';
import useLogout from '../hooks/useLogout';
import './NavBar.css';

const NavBar = () => {
    const { user } = useContext(UserContext);
    const { logoutUser } = useLogout();

    const userNav = user ?
    <nav>
        <a href='/'>
            <h1 id='logo'><span className="green">Unfreeze</span> <span className="blue">Seattle</span></h1>
        </a>
        <ul>
            <li><NavLink to='/'>News Feed</NavLink></li>
            <li><NavLink to="/my-profile">My Profile</NavLink></li>
            <li><NavLink to='/neighborhoods'>Neighborhoods</NavLink></li>
            <li><button id='logoutButton' onClick={() => logoutUser()}>Log Out</button></li>
        </ul>
    </nav> :
    null

    return (
        userNav
    )
}

export default NavBar;