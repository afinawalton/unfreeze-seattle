import React from 'react';

const Home = () => {
    return (
        <main>
            <header id='titleCard'>
                <h1><span class="green">Unfreeze</span> <span class="blue">Seattle</span></h1>
                <div>Making friends just got a hell of a lot easier</div>
            </header>
            <form id='loginForm'>
                <p>
                    <label for='email'>Email address</label>
                    <input type='text' id='email' name='email_address' placeholder='Email' required></input>
                </p>
                <p>
                    <label>Password</label>
                    <input type='text' id='password' name='password_entry' placeholder='Password' required></input>
                </p>
                <p>
                    <button type='submit' id='loginButton'>Log In</button>
                </p>
            </form>
            <p id='noAccount'>Don't have an account?</p>
            <button id='createAccount'>Create an Account</button>
            <footer>
                <p>Made with love in Seattle, WA</p>
            </footer>
        </main>
    )
}

export default Home;