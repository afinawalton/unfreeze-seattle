import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import spaceNeedle from '../spaceNeedle.jpeg';
const axios = require('axios');

const calculateAge = (birthdate) => {
    let bdayObj = new Date(birthdate);
    let diff_ms = Date.now() - bdayObj.getTime();
    let age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970)
}

const UserProfile = () => {
    const { userId } = useParams();
    const [thisUser, setThisUser] = useState({});
    const [profile, setProfile] = useState({});
    const [isFetched, setIsFetched] = useState(false);
    const navigate = useNavigate();

    // Do a GET request to request data from server and when this component first renders, it will store the data in state using matched params
    
    useEffect(() => {
        if (isFetched === false) {
            axios.get(`/api/users/${parseInt(userId)}`, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setThisUser(res.data);
                setProfile(res.data.user_profile);
                setIsFetched(true);
            })
            .then(() => {
                console.log(thisUser);
                console.log(profile);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, [])

    let prompts;

    if (profile['prompt_answers']) {
        prompts = thisUser['resident_type'] === 'local' ?
        <section className='profilePrompts'>
            <div>
                <h2 className='promptQuestion'>What’s your favorite thing about Seattle?</h2>
                <p className='promptAnswer'>{profile['prompt_answers']['prompt 1']}</p>
            </div>
            <div>
                <h2 className='promptQuestion'>What makes you stay here?</h2>
                <p className='promptAnswer'>{profile['prompt_answers']['prompt 2']}</p>
            </div>
        </section> :
        <section className='profilePrompts'>
            <div>
                <h2 className='promptQuestion'>Why did you move to Seattle?</h2>
                <p className='promptAnswer'>{profile['prompt_answers']['prompt 1']}</p>
            </div>
            <div>
                <h2 className='promptQuestion'>What do you most want to explore in WA?</h2>
                <p className='promptAnswer'>{profile['prompt_answers']['prompt 2']}</p>
            </div>
        </section>
    }

    return (
        <main id='userProfilePage'>
            <button className='userButton backToButton' onClick={() => navigate(-1)}>← Back to Feed</button>
            <header id='profileHeader'>
                <img src={spaceNeedle} alt={`Portrait of ${profile['first_name']}`} className='profilePic' />
                <section className="userDetails">
                    <p>{profile['first_name']}, {calculateAge(thisUser['birthdate'])}, {profile['pronouns']}</p>
                    <p>{profile['work']}</p>
                    <p>Seattle ‣ {profile['neighborhood']}</p>
                </section>
                <p className='topInterest'>{profile['top_interest']}</p>
                <p className='blurbInterest'>{profile['blurb']}</p>
                <section className='otherInterests'>
                    {profile['other_interests'] ? profile['other_interests'].map(item => <p className='interest'>{item}</p>) : null}
                </section>
                <a className='userButton sendEmail' href={`mailto:${thisUser.email}`}>Send an Email</a>
            </header>
            <section class="profileContent">
                <section className="profileBio">
                    <p>{profile['bio']}</p>
                </section>
                {prompts}
            </section>
        </main>
    )
}

export default UserProfile;