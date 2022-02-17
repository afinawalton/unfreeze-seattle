import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../components/Neighborhoods.css';
const axios = require('axios');

const Neighborhoods = () => {
    const [neighborhoods, setNeighborhoods] = useState([]);

    useEffect(() => {
        axios.get('/api/neighborhoods', { withCredentials: true })
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
    
    return (
        <main id='neighborhoodsPage'>
            <h1>Neighborhoods</h1>
            <h2>Seattle</h2>
            <section id="neighborhoodContainer">
                <ul id='neighborhoodList'>
                    {neighborhoods.map(info => <li className='neighborhood' key={info.id}><Link to={`/neighborhoods/${info.id}`}>{info.name}</Link></li>)}
                </ul>
            </section>
        </main>
    )
}

export default Neighborhoods;