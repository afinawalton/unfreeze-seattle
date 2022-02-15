import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';

const LoginForm = () => {
    const { loginUser, error } = useAuth();

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

        loginUser(formFields);
    }

    return (
        <section id="login">
            {
                error ? <div>{error}</div> : null
            }
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
                <a className='createAccountButton' href='/create-account'>Create an Account</a>
            </section>
        </section>
    )
}

export default LoginForm;