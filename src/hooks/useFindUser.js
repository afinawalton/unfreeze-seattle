import { useState, useEffect } from "react";
const axios = require('axios');

export default function useFindUser() {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    // Now this hook is messing up our cookie
    useEffect(() => {
        const controller = new AbortController();
        // const signal = controller.signal;
        // async function findUser() {
        axios.get('http://localhost:8080/user', { withCredentials: true })
        .then(res => {
            console.log('This is the data we got back from findUser() ', res);
            setUser(res.data);
            setLoading(false);
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log('Successfully aborted');
            }
            setLoading(false);
            console.log(err);
        });
        return () => {
            controller.abort();
        };
    }, []);

    return {
        user,
        setUser,
        isLoading
    }
}