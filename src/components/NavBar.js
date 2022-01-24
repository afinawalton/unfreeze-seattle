import React from 'react';

const NavBar = () => {
    // if (userLoggedIn = true) { display different NavBar }
    return (
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/main-feed">News Feed</a></li>
            <li><a href="/my-profile">My Profile</a></li>
            <li><a href="/neighborhoods">Neighborhoods</a></li>
            <li><a href="/log-out">Log Out</a></li>
        </ul>
    )
}

export default NavBar;