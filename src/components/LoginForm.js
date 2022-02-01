import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
    const auth = useAuth();
    // On this, we need to set up some form validation:
    // Bad email means it doesn't exist in the database => formSubmit works improperly
    // On form submit, generate code on App.js?

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

        auth.login(formFields);
    }

    return (
        <form onSubmit={onFormSubmit}>
            <p id='emailContainer'>
                <label htmlFor='email'>Email address</label>
                <input id='email' value={formFields.email} onChange={onEmailChange}></input>
            </p>
            <p id='passwordContainer'>
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' value={formFields.password} onChange={onPasswordChange}></input>
            </p>
            <button type='submit'>Log In</button>
        </form>
    )
}

export default LoginForm;