import React from 'react';

const UserProfile = () => {
    const user = 'local';

    const checklist = user === 'local' ?
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

    const prompts = user === 'local' ?
    <section id='profilePrompts'>
        <div>
            <h2>What’s your favorite thing about Seattle?</h2>
            <p>|answer1|</p>
        </div>
        <div>
            <h2>What makes you stay here?</h2>
            <p>|answer2|</p>
        </div>
    </section> : user === 'transplant' ?
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
            <button id='backButton'>Back to Feed</button>
            <section id='profileHeader'>
                <img src='' alt='Profile picture of {user}' />
                <p>|name|, |age|, |pronouns|</p>
                <p>|city|, |neighborhood|</p>
                <div>
                    <p>|topInterest|</p>
                    <p>|profile.blurb|</p>
                </div>
                    {/* section means grouped under single theme */}
                <button>Send an Email</button>
            </section>
            <section id="profileBio">
                <p>|bio|</p>
            </section>
            {checklist}
            {prompts}
        </main>
    )
}

export default UserProfile;