import React from 'react';
import spaceNeedle from '../spaceNeedle.jpeg';
import './Blurb.css';

const Blurb = ({ id, userProfile }) => {
    return (
        <article id="blurb">
            <img src={spaceNeedle} alt={`Portrait of ${userProfile['first_name']}`} />
            <section>
                <h3>{userProfile['first_name']}</h3>
                <p>{userProfile['blurb']}</p>
            </section>
        </article>
    )
}

export default Blurb;