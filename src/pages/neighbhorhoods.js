import React, { useState, useEffect, useContext } from 'react';
import Neighborhood from '../components/Neighborhood';
import { UserContext } from '../hooks/UserContext';
const axios = require('axios');

const Neighborhoods = () => {
    // const { user } = useContext(UserContext);
    const [neighbhorhoods, setNeighborhoods] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/neighborhoods')
        .then(res => {
            let list = [];
            const neighborhoodData = res.data;
            for (let item of neighborhoodData) {
                list.push(item);
            };
            setNeighborhoods(list);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
    // Create IndividualNeighborhodood component to redirect to
    // Import browser router to route to different pages
    // Use structure in App.js
    // Back-end needs to use Yelp API
    // Or I need to add the best data myself

    // When you click on a neighborhood
    // It stores that context in state
    // Passes props to neighborhood component
    // const selectNeighborhood = () => {
    //     // Redirect to selected neighborhood
    //     // Render single Neighborhood component
    // }
    // Props: list of must eat, list of must do, list of must see
    // Renders a page with that neighborhood component
    const normalizeName = (name) => {
        name = name.replace(/\s/g, '-').toLowerCase();
        return name
    }
    
    return (
        <main>
            <h1>Neighborhoods</h1>
            <section id="neighborhoodContainer">
                <ul id='neighborhoodList'>
                    {neighbhorhoods.map(info => <li key={info.name}><a href={normalizeName(info.name)}>{info.name}</a></li>)}
                </ul>
            </section>
            <Neighborhood />
        </main>
    )
}

export default Neighborhoods;