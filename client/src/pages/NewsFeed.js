import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Blurb from '../components/Blurb';
import { UserContext } from '../hooks/UserContext';
import spaceNeedle from '../spaceNeedle.jpeg';
import '../components/NewsFeed.css'
const axios = require('axios');

const NewsFeed = () => {
    const { user } = useContext(UserContext);
    const [allUsers, setAllUsers] = useState([]);
    const [isFetched, setIsFetched] = useState(false);
    const [displayFact, setDisplayFact] = useState('');

    useEffect(() => {
        const controller = new AbortController();

        const getUsers = async () => {
            if (user.resident_type === 'local') {
                await axios.get('/api/users?residentType=transplant', {
                signal: controller.signal,
                withCredentials: true
                })
                .then((res) => {
                    setAllUsers(res.data);
                    setIsFetched(true);
                })
                .catch(err => {
                    console.log(err);
                })
            } else if (user.resident_type === 'transplant') {
                await axios.get('/api/users/?residentType=local', {
                signal: controller.signal,
                withCredentials: true
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

        axios.get('/api/fact', { withCredentials: true })
        .then(res => {
            setDisplayFact(res.data[0]);
        })
        .catch(err => {
            console.log(err);
        })

        return () => {
            controller.abort();
        }
        
    }, [])

    const feed =
    user.resident_type === 'local' ?
    <section id='blurbFeed'>
        <h2>Show a transplant around town:</h2>
        {allUsers.map(item =>
            <Link to={`/users/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
                <Blurb id={item.id} userProfile={item.user_profile} />
            </Link>)
        }
    </section>
    :
    <section id='blurbFeed'>
        <h2>Get to know the locals:</h2>
        {allUsers.map(item =>
            <Link to={`/users/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
                <Blurb id={item.id} userProfile={item.user_profile} />
            </Link>)
        }
    </section>

    return (
        <section id='newsFeedPage'>
            <section id="loggedInAs">
                <section id='picAndName'>
                    <img src={spaceNeedle} alt={`Portrait of ${user['user_profile']['first_name']}`}></img>
                    <p>Logged in as <br /><span id="user">
                        {user['user_profile']['first_name']}
                    </span></p>
                </section>
            </section>
            <main id='feed'>
                <aside id='feedSubhead'>
                    <h2>Did You Know?</h2>
                    <q className='fact' cite={displayFact.source}>{displayFact.fact}</q>
                </aside>
                {feed}
            </main>
        </section>
    )
}

export default NewsFeed;