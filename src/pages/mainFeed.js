import React, { useContext } from 'react';
import Blurb from '../components/Blurb';
// import { useAuth } from '../hooks/useAuth';
import { UserContext } from '../hooks/UserContext';

const MainFeed = () => {
    // const auth = useAuth();
    const { user } = useContext(UserContext);

    const aside =
    user.resident_type === 'local' ?
    <aside id='addYourFavs'>
        <h2>Add Your Favs</h2>
        <p>|Know where to find the best bookstore? Or poke shop? Add your favorites to our database.|</p>
    </aside>
    :
    <aside id='didYouKnow'>
        <h2>Did You Know?</h2>
        <p>|Pike Place Market is the oldest continuously operating farmer’s market in the country.|</p>
    </aside>

    const feed =
    user.resident_type === 'local' ?
    <section id='blurbFeed'>
        <h2>Show a transplant around town:</h2>
        <Blurb />
    </section>
    :
    <section id='blurbFeed'>
        <h2>Get to know the locals:</h2>
        <Blurb />
    </section>

    return (
        <main>
            <section id="loggedInAs">
                <img src='' alt='profilePic'></img>
                <p>Logged in as <br /><span id="user">
                    {user.first_name}
                </span></p>
                <p>find a hiking trail on weekend mornings</p>
                <button>Edit My Blurb</button>
            </section>
            {aside}
            {feed}
        </main>
    )
}

export default MainFeed;