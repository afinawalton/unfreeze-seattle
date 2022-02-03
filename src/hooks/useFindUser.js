import { useState, useEffect } from "react";
const axios = require('axios');

export default function useFindUser() {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    // Now this hook is messing up our cookie
    useEffect(() => {
        async function findUser() {
            await axios.get('http://localhost:8080/user', { withCredentials: true })
            .then(res => {
                console.log('This is the data we got back from findUser() ', res);
                setUser(res.data);
                console.log('Found user: ', user);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
        }

        findUser();
    }, []);

    return {
        user,
        setUser,
        isLoading
    }
}