import React, { useState } from 'react';
import LoginForm from '../components/LoginForm.js';
const axios = require('axios');

const Home = () => {
    // Might need user in useState
    const [currentUser, setCurrentUser] = useState(null);

    const logInUser = (user) => {
        console.log(`User details: ${user}`);
    
        axios.post('http://localhost:8080/session', user)
            .then(res => {
                console.log('Server response', res);
                setCurrentUser(user);
                console.log(`Logged in user is ${user.email}`);
            })
            .catch(err => {
                console.log(err);
            })
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