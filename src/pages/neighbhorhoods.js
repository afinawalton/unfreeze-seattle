import React from 'react';
import Neighborhood from '../components/Neighborhood';

const Neighborhoods = () => {
    return (
        <main>
            <h1>Neighborhoods</h1>
            <h2>Seattle</h2>
            <section id="neighborhoodsList">
                <ul> list of neighbhorhoods
                    <li>Ballard</li>
                    <li>Beacon Hill</li>
                    <li>Belltown</li>
                    <li>Capitol Hill</li>
                    <li>Central District</li>
                    <li>Columbia City</li>
                    <li>Crown Hill</li>
                    <li>Downtown Seattle</li>
                </ul>
            </section>
            <Neighborhood />
        </main>
    )
}

export default Neighborhoods;