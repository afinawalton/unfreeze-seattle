import React from 'react';
import './Blurb.css';

const Blurb = ({ id, userProfile }) => {
    // How do we pass this data onto the UserProfile itself?
    return (
        <div id="blurb">
            <img src={`http://localhost:8080/images/${userProfile['profile_pic']}`} alt='profilePic' />
            <div>
                <h3>{userProfile['first_name']}</h3>
                <p>{userProfile['blurb']}</p>
            </div>
        </div>
    )
}

export default Blurb;