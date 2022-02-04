import React, { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import useAuth from '../hooks/useAuth';

const calculateAge = (birthdate) => {
    let bdayObj = new Date(birthdate);
    let diff_ms = Date.now() - bdayObj.getTime();
    let age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970)
}

const MyProfile = () => {
    const { user } = useContext(UserContext);
    const { editProfile } = useAuth();
    const profile = user['user_profile'];

    const checklist = user['resident_type'] === 'local' ?
    <section id='mustHaves'>
        <div id='mustEat'>
            <h2>Must Eat</h2>
            <ul>
                <li>|rec1|</li>
                <li>|rec2|</li>
                <li>|rec3|</li>
            </ul>
        </div>
        <div id='mustDo'>
            <h2>Must Do</h2>
            <ul>
                <li>|rec1|</li>
                <li>|rec2|</li>
                <li>|rec3|</li>
            </ul>
        </div>
        <div id='mustSee'>
            <h2>Must See</h2>
            <ul>
                <li>|rec1|</li>
                <li>|rec2|</li>
                <li>|rec3|</li>
            </ul>
        </div>
    </section> :
    null

    const prompts = user['resident_type'] === 'local' ?
    <section id='profilePrompts'>
        <div>
            <h2>What’s your favorite thing about Seattle?</h2>
            <p>{profile['prompt_answers']['prompt 1']}</p>
        </div>
        <div>
            <h2>What makes you stay here?</h2>
            <p>{profile['prompt_answers']['prompt 2']}</p>
        </div>
    </section> : user.resident_type === 'transplant' ?
    <section id='profilePrompts'>
        <div>
            <h2>Why did you move to Seattle?</h2>
            <p>{profile['prompt_answers']['prompt 1']}</p>
        </div>
        <div>
            <h2>What do you most want to explore in WA?</h2>
            <p>{profile['prompt_answers']['prompt 2']}</p>
        </div>
    </section> : null

    return (
        <main>
            <a href='/edit-profile'>Edit Profile</a>
            <section id='profileHeader'>
                <img src='' alt='Portrait of {type}' />
                <p>{profile['first_name']} {calculateAge(user['birthdate'])} {profile['pronouns']}</p>
                <p>{profile['city']} - {profile['neighborhood']}</p>
                <div>
                    <section id="topInterest">
                        <p>{profile['top_interest']}</p>
                        <p>{profile['blurb']}</p>
                    </section>
                    <section id='otherInterests'>
                        {/* {profile['other_interests'].map(item => <p className='interest'>{item}</p>)} */}
                    </section>
                </div>
            </section>
            <section id="profileBio">
                <p>{profile['bio']}</p>
            </section>
            {checklist}
            {prompts}
        </main>
    )
}

export default MyProfile;