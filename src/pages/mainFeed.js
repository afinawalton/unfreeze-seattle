import React, { useContext, useEffect, useState } from 'react';
import Blurb from '../components/Blurb';
import { UserContext } from '../hooks/UserContext';
import '../components/MainFeed.css'
const axios = require('axios');

const MainFeed = () => {
    const { user } = useContext(UserContext);
    const [blurbs, setBlurbs] = useState([]);

    useEffect(() => {
        return user.resident_type === 'local' ?
        axios.get('http://localhost:8080/users?residentType=transplant')
        .then((res) => {
            setBlurbs(res.data);
        })
        .catch(err => {
            console.log(err);
        })

        : user.resident_type === 'transplant' ?
        axios.get('http://localhost:8080/users/?residentType=local')
        .then((res) => {
            setBlurbs(res.data);
        })
        .catch(err => {
            console.log(err);
        })

        : null
    }, [])

    const aside =
    user.resident_type === 'local' ?
    <aside id='feedSubhead'>
        <h2>Add Your Favs</h2>
        <p id='fact'>Know where to find the best bookstore? Or poke shop? Add your favorites to our database.</p>
    </aside>
    :
    <aside id='feedSubhead'>
        <h2>Did You Know?</h2>
        <p>|Pike Place Market is the oldest continuously operating farmer’s market in the country.|</p>
    </aside>

    const feed =
    user.resident_type === 'local' ?
    <section id='blurbFeed'>
        <h2>Show a transplant around town:</h2>
        {blurbs.map(item => <Blurb userProfile={item.user_profile} />)}
    </section>
    :
    <section id='blurbFeed'>
        <h2>Get to know the locals:</h2>
        {blurbs.map(item => <Blurb userProfile={item.user_profile} />)}
    </section>

    return (
        <section id='mainFeed'>
            <section id="loggedInAs">
                <section id='picAndName'>
                    <img src='' alt='profilePic'></img>
                    <p>Logged in as <br /><span id="user">
                        {user['user_profile']['first_name']}
                    </span></p>
                </section>
                <p id='currentUserBlurb'>{user['user_profile']['blurb']}</p>
                <button id='editBlurb'>Edit My Blurb</button>
            </section>
            <main id='main'>
                {aside}
                {feed}
            </main>
        </section>
    )
}

export default MainFeed;