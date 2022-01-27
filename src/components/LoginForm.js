import React, { useState } from 'react';

const LoginForm = () => {

    const [formFields, setFormFields] = useState({ email: '', password: '' });

    const onEmailChange = (e) => {
        setFormFields({
            ...formFields,
            email: e.target.value
        })
    }

    const onPasswordChange = (e) => {
        setFormFields({
            ...formFields,
            password: e.target.value
        })
    }

    return (
        <form>
            <p>
                <label htmlFor=''>Email address</label>
                <input id='email' placeholder='Email' value={formFields.email} onChange={onEmailChange}></input>
            </p>
            <p>
                <label htmlFor='password'>Password</label>
                <input id='password' type='password' value={formFields.password} onChange={onPasswordChange}></input>
            </p>
            <button type='submit'>Log In</button>
        </form>
    )
}

export default LoginForm;