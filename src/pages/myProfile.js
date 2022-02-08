import React, { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';
import '../components/UserProfile.css';

const calculateAge = (birthdate) => {
    let bdayObj = new Date(birthdate);
    let diff_ms = Date.now() - bdayObj.getTime();
    let age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970)
}

const MyProfile = () => {
    const { user } = useContext(UserContext);
    const profile = user['user_profile'];

    // const checklist = user['resident_type'] === 'local' ?
    // <section id='experiences'>
    //     <div id='toEat'>
    //         <h2>Must Eat</h2>
    //         <ul>
    //             <li>|rec1|</li>
    //             <li>|rec2|</li>
    //             <li>|rec3|</li>
    //         </ul>
    //     </div>
    //     <div id='toDo'>
    //         <h2>Must Do</h2>
    //         <ul>
    //             <li>|rec1|</li>
    //             <li>|rec2|</li>
    //             <li>|rec3|</li>
    //         </ul>
    //     </div>
    //     <div id='toSee'>
    //         <h2>Must See</h2>
    //         <ul>
    //             <li>|rec1|</li>
    //             <li>|rec2|</li>
    //             <li>|rec3|</li>
    //         </ul>
    //     </div>
    // </section> :
    // <section id='experiences'>
    //     <div id='toEat'>
    //         <h2>To Eat</h2>
    //         <ul>
    //             <li>|rec1|</li>
    //             <li>|rec2|</li>
    //             <li>|rec3|</li>
    //         </ul>
    //     </div>
    //     <div id='toDo'>
    //         <h2>To Do</h2>
    //         <ul>
    //             <li>|rec1|</li>
    //             <li>|rec2|</li>
    //             <li>|rec3|</li>
    //         </ul>
    //     </div>
    //     <div id='toSee'>
    //         <h2>To See</h2>
    //         <ul>
    //             <li>|rec1|</li>
    //             <li>|rec2|</li>
    //             <li>|rec3|</li>
    //         </ul>
    //     </div>
    // </section>

    const prompts = user['resident_type'] === 'local' ?
    <section id='profilePrompts'>
        <div>
            <h2 className='promptQuestion'>What’s your favorite thing about Seattle?</h2>
            <p className='promptAnswer'>{profile['prompt_answers']['prompt 1']}</p>
        </div>
        <div>
            <h2 className='promptQuestion'>What makes you stay here?</h2>
            <p className='promptAnswer'>{profile['prompt_answers']['prompt 2']}</p>
        </div>
    </section> :
    <section id='profilePrompts'>
        <div>
            <h2 className='promptQuestion'>Why did you move to Seattle?</h2>
            <p className='promptAnswer'>{profile['prompt_answers']['prompt 1']}</p>
        </div>
        <div>
            <h2 className='promptQuestion'>What do you most want to explore in WA?</h2>
            <p className='promptAnswer'>{profile['prompt_answers']['prompt 2']}</p>
        </div>
    </section>

    return (
        <main>
            <a href='/edit-profile' className='userButton'>Edit Profile</a>
            <section id='profileHeader'>
                <img src='' alt={`Portrait of ${profile['first_name']}`} className='profilePic' />
                <section className="userDetails">
                    <p>{profile['first_name']}, {calculateAge(user['birthdate'])}, {profile['pronouns']}</p>
                    <p>Seattle ‣ {profile['neighborhood']}</p>
                </section>
                <p id='topInterest'>{profile['top_interest']}</p>
                <p id='blurbInterest'>{profile['blurb']}</p>
                <section id='otherInterests'>
                    {profile['other_interests'] ? profile['other_interests'].map(item => <p className='interest'>{item}</p>) : null}
                </section>
            </section>
            <section id="profileBio">
                <p>{profile['bio']}</p>
            </section>
            {/* {checklist} */}
            {prompts}
        </main>
    )
}

export default MyProfile;