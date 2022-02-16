import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import '../components/CreateAccount.css';

const CreateAccount = () => {

    const { registerUser } = useAuth();

    const emptyForm = {
        
        email: '',
        password: '',
        birthdate: '',
        resident_type: 'transplant',
        years_in_wa: 0,
        user_profile: {
            first_name: '',
            pronouns: '',
            work: '',
            city: '',
            neighborhood: '',
            top_interest: '',
            blurb: '',
            other_interests: [],
            bio: '',
            prompt_answers: {
                'prompt 1': '',
                'prompt 2': ''
            }
        }
    }

    const [formFields, setFormFields] = useState(emptyForm);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'years_in_wa') {
            const resident = value >= 5 ? 'local' : 'transplant';
            setFormFields({
                ...formFields,
                [name]: parseInt(value),
                resident_type: resident
            });
        } else {
            setFormFields({
                ...formFields,
                [name]: value,
            });
        }
    };

    const onFormSubmit = (e) => {
        e.preventDefault();

        registerUser(formFields);

        setFormFields(emptyForm);
    }

    return (
        <main id='createAccountPage'>
            <header className='createAccountHeader'>
                <h1 className='logo'><span className="green">Unfreeze</span> <span className="blue">Seattle</span></h1>
            </header>
            <form id='loginForm' onSubmit={onFormSubmit}>
                <h2 id='createAccountTitle'>Create an Account</h2>
                <p>
                    <label htmlFor='email'>Email address</label>
                    <input type='text' id='email' name='email' onChange={handleInputChange} value={formFields.email} required></input>
                </p>
                <p>
                    <label htmlFor='password'>Password</label>
                    <input type="password" name="password" onChange={handleInputChange} value={formFields.password}></input>
                </p>
                <p>
                    <label htmlFor='birthdate'>Birthdate</label>
                    <input type='date' id='birthdate' name='birthdate' onChange={handleInputChange} value={formFields.birthdate} required></input>
                </p>
                <p>
                    <label htmlFor='years_in_wa'>Years in Seattle</label>
                    <input type='number' min='0' max='70' id='yearsInWa' name='years_in_wa' onChange={handleInputChange} value={formFields.years_in_wa} required></input>
                </p>
                <span id="residentType">
                    You're a <span>{formFields.resident_type}</span>!
                </span>
                <p>
                    <button type='submit' className='createAccountButton'>Create Account</button>
                </p>
            </form>
        </main>
    )
}

export default CreateAccount;