import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Blurb from '../components/Blurb';
import { UserContext } from '../hooks/UserContext';
import '../components/MainFeed.css'
const axios = require('axios');

const MainFeed = () => {
    const { user } = useContext(UserContext);
    const [allUsers, setAllUsers] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    // Add cleanup function
    useEffect(() => {
        const controller = new AbortController();

        const getUsers = async () => {
            if (user.resident_type === 'local') {
                await axios.get('http://localhost:8080/users?residentType=transplant', {
                signal: controller.signal
                })
                .then((res) => {
                    setAllUsers(res.data);
                    setIsFetched(true);
                })
                .catch(err => {
                    console.log(err);
                })
            } else if (user.resident_type === 'transplant') {
                await axios.get('http://localhost:8080/users/?residentType=local', {
                signal: controller.signal
                })
                .then((res) => {
                    setAllUsers(res.data);
                    setIsFetched(true);
                })
                .catch(err => {
                    console.log(err);
                })
            }
        }

        if (isFetched === false) {
            getUsers();
        }

        return () => {
            controller.abort();
        }
        
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
        {allUsers.map(item =>
            <Link to={`/users/${item.id}`} key={item.id}>
                <Blurb id={item.id} userProfile={item.user_profile} />
            </Link>)
        }
    </section>
    :
    <section id='blurbFeed'>
        <h2>Get to know the locals:</h2>
        {allUsers.map(item =>
            <Link to={`/users/${item.id}`} key={item.id}>
                <Blurb id={item.id} userProfile={item.user_profile} />
            </Link>)
        }
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
            </section>
            <main id='main'>
                {aside}
                {feed}
            </main>
        </section>
    )
}

export default MainFeed;