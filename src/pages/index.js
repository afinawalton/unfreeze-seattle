import React from 'react';

const Home = () => {
    return (
        <main>
            <h1>Unfreeze Seattle</h1>
            <div>Making friends just got a hell of a lot easier</div>
            <form>
                <p>
                    <label for='email'>Email address</label>
                    <input type='text' id='email' name='email_address' placeholder='Email' required></input>
                </p>
                <p>
                    <label>Password</label>
                    <input type='text' id='password' name='password_entry' placeholder='Password' required></input>
                </p>
                <p>
                    <button type='submit'>Log In</button>
                </p>
            </form>
            <p>Don't have an account?</p>
            <button>Create an Account</button>
            <footer>
                <p>Made with love in Seattle, WA</p>
            </footer>
        </main>
    )
}

export default Home;