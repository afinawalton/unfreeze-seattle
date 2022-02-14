import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';

const LoginForm = () => {
    // On this, we need to set up some form validation:
    // Bad email means it doesn't exist in the database => formSubmit works improperly
    // On form submit, generate code on App.js?
    const { loginUser } = useAuth();

    const [formFields, setFormFields] = useState({ email: '', password: '' });

    const onEmailChange = (e) => {
        setFormFields({
            ...formFields,
            email: e.target.value
        });
    }

    const onPasswordChange = (e) => {
        setFormFields({
            ...formFields,
            password: e.target.value
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();

        // Have some sort of form validation here
        // Call log in user? Once we get a bad response, send it back to this component and render a message with info to the user

        loginUser(formFields);
    }

    return (
        <section id="login">
            <form onSubmit={onFormSubmit} id='loginForm'>
                <p id='emailContainer' className='required'>
                    <label htmlFor='email'>Email address</label>
                    <input id='email' aria-label='email' aria-required='true' required value={formFields.email} onChange={onEmailChange}></input>
                </p>
                <p id='passwordContainer' className='required'>
                    <label htmlFor='password'>Password</label>
                    <input id='password' type='password' aria-label='password' aria-required='true' required value={formFields.password} onChange={onPasswordChange}></input>
                </p>
                <p>
                    <button className='userFormButton' type='submit'>Log In</button>
                </p>
            </form>
            <section id="createAccountSection">
                <p id='noAccount'>Don't have an account?</p>
                <a id='createAccount' href='/create-account'>Create an Account</a>
            </section>
        </section>
    )
}

export default LoginForm;