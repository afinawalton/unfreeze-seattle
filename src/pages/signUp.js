import React, { useEffect } from 'react';
const axios = require('axios');

const SignUp = () => {
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
            <form id='loginForm'>
                <h1 id='createAccountTitle'>Create an Account</h1>
                <p>
                    <label htmlFor='email'>Email address</label>
                    <input type='text' id='email' required></input>
                </p>
                <p>
                    <label htmlFor='password'>Password</label>
                    <input type="password" name="password"></input>
                </p>
                <p>
                    <label htmlFor='firstName'>First name</label>
                    <input type='text' id='firstName' name='email_address' required></input>
                </p>
                <p>
                    <label htmlFor='birthdate'>Birthdate</label>
                    <input type='date' id='birthdate' required></input>
                </p>
                <p>
                    <label htmlFor='pronouns'>Pronouns</label>
                    <input type='text' id='pronouns'></input>
                </p>
                <p>
                    <label htmlFor='city'>City</label>
                    <input type='text' id='city' placeholder='Seattle' required></input>
                </p>
                <p>
                    <label htmlFor='neighborhood'>Neighborhood</label>
                    <select id='neighborhoodList'>
                        <option value=''>Choose the neighborhood closest to you</option>
                    </select>
                </p>
                <p>
                    <label htmlFor='yearsInWa'>Years in Seattle</label>
                    <input type='number' min='0' max='70' id='yearsInWa' required></input>
                </p>
                <p id="residentType">You're a ! <span></span></p>
                <p>
                    <label htmlFor='interests'>Choose interests</label>
                    <select type='text' id='interests' multiple required></select>
                </p>
                <p>
                    <label htmlFor='jobHobby'>Job or Hobby</label>
                    <input type='text' id='jobHobby'></input>
                </p>
                <p>
                    <button type='submit' id='createAccountButton'>Create Account</button>
                </p>
            </form>
            <p id='noAccount'>Don't have an account?</p>
            {/* Add onClick handler to make POST request to /users */}
            <a id='createAccount' href='/sign-up'>Create an Account</a>
            <footer>
                <p>Made with love in Seattle, WA</p>
            </footer>
        </main>
    )
}

export default SignUp;