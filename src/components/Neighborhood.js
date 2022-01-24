import React, { useState } from 'react';

const Neighborhood = () => {
    const [selectedNeighborhood, setSelectedNeighborhood] = useState(null)

    return (
        <main>
            <div>Neighborhood:</div>
            <h1>Ballard</h1>
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