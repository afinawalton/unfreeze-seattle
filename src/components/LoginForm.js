import React, { useState } from 'react';

const LoginForm = ({ logInUserCallback }) => {

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

        logInUserCallback(formFields);
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