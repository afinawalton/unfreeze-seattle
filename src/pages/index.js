import React from 'react';
import LoginForm from '../components/LoginForm.js';

const Home = ({ logInUser }) => {

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