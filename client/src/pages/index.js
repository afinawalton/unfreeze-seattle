import React from 'react';
import LoginForm from '../components/LoginForm.js';
import '../components/Login.css';

const Login = () => {

    return (
        <main id='loginMain'>
            <header id='titleCard'>
                <h1><span className="green">Unfreeze</span> <span className="blue">Seattle</span></h1>
                <div>Making friends just got <span className="newLine">a lot easier</span></div>
            </header>
            <LoginForm />
        </main>
    )
}

export default Login;