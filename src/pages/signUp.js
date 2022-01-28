import React, { useState } from 'react';

const SignUp = ({ addUserCallback }) => {
    const emptyForm = {
        first_name: '',
        email: '',
        password: '',
        birthdate: '2004-01-27',
        work: '',
        interests: [''],
        pronouns: '',
        city: 'Seattle',
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
                [name]: value,
                resident_type: resident
            });
            document.getElementById('residency').textContent = resident;
        } else {
            setFormFields({
                ...formFields,
                [name]: value,
            });
        }
    };

    // const onFirstNameChange = (e) => {
    //     setFormFields({
    //         ...formFields,
    //         first_name: e.target.value
    //     })
    // }

    // const onEmailChange = (e) => {
    //     setFormFields({
    //         ...formFields,
    //         email: e.target.value
    //     })
    // }

    // const onPasswordChange = (e) => {
    //     setFormFields({
    //         ...formFields,
    //         password: e.target.value
    //     })
    // }

    // const onBirthdateChange = (e) => {
    //     setFormFields({
    //         ...formFields,
    //         birthdate: e.target.value.toString()
    //     })
    // }

    // const onWorkChange = (e) => {
    //     setFormFields({
    //         ...formFields,
    //         work: e.target.value
    //     })
    // }

    // const onInterestsSelect = (e) => {
    //     const interests = [];

    //     if (!interests.includes(e.target.value)) {
    //         interests.push(e.target.value)
    //     }

    //     setFormFields({
    //         ...formFields,
    //         interests: interests
    //     })
    // }

    // const onPronounsChange = (e) => {
    //     setFormFields({
    //         ...formFields,
    //         pronouns: e.target.value
    //     })
    // }

    // const onCityChange = (e) => {
    //     setFormFields({
    //         ...formFields,
    //         city: e.target.value
    //     })
    // }

    // const onNeighborhoodChange = (e) => {
    //     setFormFields({
    //         ...formFields,
    //         neighborhood: e.target.value
    //     })
    // }

    // const onYearsInWaChange = (e) => {
    //     setFormFields({
    //         ...formFields,
    //         years_in_wa: parseInt(e.target.value),
    //         resident_type: e.target.value >= 5 ? 'local' : 'transplant'
    //     })
    // }

    const onFormSubmit = (e) => {
        e.preventDefault();

        addUserCallback(formFields);
    }

    // let interests = [];
    // useEffect(() => {
    //     axios.get('http://localhost:8080/interests')
    //     .then(res => {
    //         const res_list = res;
    //         for (let item of res_list) {
    //             interests.push(item["name"])
    //         }
    //         console.log(`List of interests=\n${interests}`)
    //         console.log(res);
    //     })
    //     .catch(err => {
    //         console.log('This is my error:', err);
    //     })
    // })

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
                    <label htmlFor='firstName'>First name</label>
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
                    <label htmlFor='yearsInWa'>Years in Seattle</label>
                    <input type='number' min='0' max='70' id='yearsInWa' name='years_in_wa' onChange={handleInputChange} value={formFields.years_in_wa} required></input>
                </p>
                <p id="residentType">You're a <span id='residency'></span>!</p>
                <p>
                    <label htmlFor='interests'>Choose interests</label>
                    <select type='text' id='interests' name='interests' multiple required>
                        <option value='Foodie'>Foodie</option>
                    </select>
                </p>
                <p>
                    <label htmlFor='jobHobby'>Job or Hobby</label>
                    <input type='text' id='jobHobby' name='work' onChange={handleInputChange} value={formFields.work}></input>
                </p>
                <p>
                    <button type='submit' id='createAccountButton'>Create Account</button>
                </p>
            </form>
        </main>
    )
}

export default SignUp;