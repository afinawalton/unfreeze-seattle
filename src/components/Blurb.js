import React from 'react';
import './Blurb.css';

const Blurb = ({ userProfile }) => {
    return (
        <div id='blurb'>
            <img src={userProfile['profile_pic']} alt='profilePic' />
            <div>
                <h3><a href=''>{userProfile['first_name']}</a></h3>
                <p>{userProfile['blurb']}</p>
            </div>
        </div>
    )
}

export default Blurb;