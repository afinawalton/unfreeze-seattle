import React, { useContext } from 'react';
import { UserContext } from '../hooks/UserContext';

const MyProfile = () => {
    const { user } = useContext(UserContext);
    const type = 'local';

    const checklist = type === 'local' ?
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

    const prompts = type === 'local' ?
    <section id='profilePrompts'>
        <div>
            <h2>What’s your favorite thing about Seattle?</h2>
            <p>|answer1|</p>
        </div>
        <div>
            <h2>What makes you stay here?</h2>
            <p>|answer2|</p>
        </div>
    </section> : type === 'transplant' ?
    <section id='profilePrompts'>
        <div>
            <h2>Why did you move to Seattle?</h2>
            <p>|answer1|</p>
        </div>
        <div>
            <h2>What do you most want to explore in WA?</h2>
            <p>|answer2|</p>
        </div>
    </section> : null

    return (
        <main>
            <button>Edit Profile</button>
            <section id='profileHeader'>
                <img src='' alt='Portrait of {type}' />
                <p>|name|, |age|, |pronouns|</p>
                <p>|city|, |neighborhood|</p>
                <div>
                    <section id="topInterest">
                        <p>|topInterest|</p>
                        <p>|profile.blurb|</p>
                    </section>
                    <section id='otherInterests'>
                        <p>Foodie</p>
                        <p>Breweries</p>
                        <p>Techie</p>
                    </section>
                </div>
                    {/* section means grouped under single theme */}
            </section>
            <section id="profileBio">
                <p>|bio|</p>
            </section>
            {checklist}
            {prompts}
        </main>
    )
}

export default MyProfile;