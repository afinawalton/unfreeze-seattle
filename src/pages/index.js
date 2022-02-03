import React from 'react';
import LoginForm from '../components/LoginForm.js';
import '../components/Login.css';

const Login = () => {

    return (
        <main>
            <header id='titleCard'>
                <h1><span className="green">Unfreeze</span> <span className="blue">Seattle</span></h1>
                <div>Making friends just got a hell of a lot easier</div>
            </header>
            <LoginForm />
            <footer>
                <p>
                    Unfreeze Seattle © 2022    |    Made with love in Seattle, WA  ❤️
                    </p>
            </footer>
        </main>
    )
}

export default Login;