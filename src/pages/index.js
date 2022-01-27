import React, { useState } from 'react';
import LoginForm from '../components/LoginForm.js';
const axios = require('axios');

const Home = () => {
    // Might need user in useState
    const [currentUser, setCurrentUser] = useState(null);

    const logInUser = ({ email, password }) => {
        console.log(`User details: ${email}`);
        // Validate that user with this password exists
        // setCurrentUser(user);
        // Sets up private route once user is logged in
    }

    return (
        <main>
            <header id='titleCard'>
                <h1><span className="green">Unfreeze</span> <span className="blue">Seattle</span></h1>
                <div>Making friends just got a hell of a lot easier</div>
            </header>
            <LoginForm logInUserCallback={logInUser} />
            <p id='noAccount'>Don't have an account?</p>
            <a id='createAccount' href='/sign-up'>Create an Account</a>
            <footer>
                <p>Made with love in Seattle, WA</p>
            </footer>
        </main>
    )
}

export default Home;