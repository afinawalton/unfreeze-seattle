import React, { useState } from 'react';
import Blurb from '../components/Blurb';

const MainFeed = () => {
    const [currentUser, setCurrentUser] = useState('local');
    // setLoggedInUser('local');

    const aside = currentUser === 'local' ?
    <aside id='addYourFavs'>
        <h2>Add Your Favs</h2>
        <p>|Know where to find the best bookstore? Or poke shop? Add your favorites to our database.|</p>
    </aside> :
    <aside id='didYouKnow'>
        <h2>Did You Know?</h2>
        <p>|Pike Place Market is the oldest continuously operating farmer’s market in the country.|</p>
    </aside>

    const feed = currentUser === 'local' ?
    <section id='blurbFeed'>
        <h2>Show a transplant around town:</h2>
        <Blurb />
    </section> :
    <section id='blurbFeed'>
        <h2>Get to know the locals:</h2>
        <Blurb />
    </section>

    return (
        <main>
            <section id="loggedInAs">
                <img src='' alt='profilePic'></img>
                <p>Logged in as <br /><span id="user">Afina Walton</span></p>
                <p>find a hiking trail on weekend mornings</p>
                <button>Edit My Blurb</button>
            </section>
            {aside}
            {feed}
        </main>
    )
}

export default MainFeed;