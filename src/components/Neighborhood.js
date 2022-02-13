import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Neighborhood.css';
import axios from 'axios';

const Neighborhood = () => {
    const { townId } = useParams();
    const [thisTown, setThisTown] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/neighborhoods/${parseInt(townId)}`, { withCredentials: true })
        .then(res => {
            console.log(res.data);
            setThisTown(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <main id='neighborhoodPage'>
            <button className='userButton backToButton' onClick={() => navigate(-1)}>← Back to Feed</button>
            <h1>Neighborhood: <span className="townName">{thisTown.name}</span></h1>
            <section id='mustEat'>
                <h2>Must Eat</h2>
                <img src='' alt='rec1'></img>
                <img src='' alt='rec2'></img>
                <img src='' alt='rec3'></img>
            </section>
            <section id='mustDo'>
                <h2>Must Do</h2>
                <img src='' alt='rec1'></img>
                <img src='' alt='rec2'></img>
                <img src='' alt='rec3'></img>
            </section>
            <section id='mustSee'>
                <h2>Must See</h2>
                <img src='' alt='rec1'></img>
                <img src='' alt='rec2'></img>
                <img src='' alt='rec3'></img>
            </section>
        </main>
    )
}

export default Neighborhood;