import React, { useState, useEffect } from 'react';
const axios = require('axios');

const SignUp = ({ addUserCallback, userCreated }) => {
    useEffect(() => {
        axios.get('http://localhost:8080/interests')
            .then(res => {
                const interestList = res.data;
                let selectInterests = document.getElementById('interests');
                for (let item of interestList) {
                    let newInterest = document.createElement('option');
                    newInterest.value = item.name;
                    newInterest.textContent = item.name;
                    selectInterests.appendChild(newInterest);
                }
            })
    }, [])

    const emptyForm = {
        first_name: '',
        email: '',
        password: '',
        birthdate: '2004-01-27',
        work: '',
        interests: [],
        pronouns: '',
        city: '',
        neighborhood: '',
        resident_type: 'transplant',
        years_in_wa: 0,
        user_profile: {
            bio: '',
            top_interest: '',
            blurb: '',
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
            document.getElementById('residency').textContent = resident;
        } else if (name === 'interests') {
            const options = e.target.options;
            let selectedInterests = [];
            for (let option of options) {
                if (option.selected) {
                    selectedInterests.push(option.value);
                }
            }
            setFormFields({
                ...formFields,
                interests: selectedInterests
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

        addUserCallback(formFields);
        
        setFormFields(emptyForm);
    }

    return (
        <main>
            <header id='logo'>
                <img src='' alt='Unfreeze Seattle logo' />
            </header>
            <form id='loginForm' onSubmit={onFormSubmit}>
                <h1 id='createAccountTitle'>Create an Account</h1>
                <p>
                    <label htmlFor='email'>Email address</label>
                    <input type='text' id='email' name='email' onChange={handleInputChange} value={formFields.email} required></input>
                </p>
                <p>
                    <label htmlFor='password'>Password</label>
                    <input type="password" name="password" onChange={handleInputChange} value={formFields.password}></input>
                </p>
                <p>
                    <label htmlFor='first_name'>First name</label>
                    <input type='text' id='firstName' name='first_name' onChange={handleInputChange} value={formFields.first_name} required></input>
                </p>
                <p>
                    <label htmlFor='birthdate'>Birthdate</label>
                    <input type='date' id='birthdate' name='birthdate' onChange={handleInputChange} value={formFields.birthdate} required></input>
                </p>
                <p>
                    <label htmlFor='pronouns'>Pronouns</label>
                    <input type='text' id='pronouns' name='pronouns' onChange={handleInputChange} value={formFields.pronouns}></input>
                </p>
                <p>
                    <label htmlFor='city'>City</label>
                    <input type='text' id='city' placeholder='Seattle' name='city' onChange={handleInputChange} value={formFields.city} required></input>
                </p>
                <p>
                    <label htmlFor='neighborhood'>Neighborhood</label>
                    <select id='neighborhoodList' name='neighborhood' onChange={handleInputChange} value={formFields.neighborhood}>
                        <option value=''>Choose the neighborhood closest to you</option>
                    </select>
                </p>
                <p>
                    <label htmlFor='years_in_wa'>Years in Seattle</label>
                    <input type='number' min='0' max='70' id='yearsInWa' name='years_in_wa' onChange={handleInputChange} value={formFields.years_in_wa} required></input>
                </p>
                <p id="residentType">You're a <span id='residency'>transplant</span>!</p>
                <p>
                    <label htmlFor='interests'>Choose interests</label>
                    <select type='text' id='interests' name='interests' onChange={handleInputChange} multiple required>
                    </select>
                </p>
                <p>
                    <label htmlFor='work'>Job or Hobby</label>
                    <input type='text' id='work' name='work' onChange={handleInputChange} value={formFields.work}></input>
                </p>
                <p>
                    <button type='submit' id='createAccountButton'>Create Account</button>
                </p>
            </form>
        </main>
    )
}

export default SignUp;