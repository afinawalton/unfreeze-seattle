import { useState, useEffect } from "react";
import useLocalStorage from './useLocalStorage';
const axios = require('axios');

export default function useFindUser() {
    const { getLocalStorage, setLocalStorage } = useLocalStorage();
    // const [user, setUser] = useState(null);
    // Sets initial state based on value retrieved from getLocalStorage
    // Expect to be null on first rendering
    const [user, setUser] = useState(() => getLocalStorage('user', null));
    const [isLoading, setLoading] = useState(true);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const findUser = async () => {
            return await axios.get('http://localhost:8080/user', { withCredentials: true, signal: controller.signal })
            .then(res => {
                // console.log('This is the data we got back from findUser() ', res);
                // Sets user state to appropriate value
                // Ultimately gets passed down to App.js on first rendering of the app
                // If we didn't get a truthy value from local storage, then set user
                setUser(res.data);
                setLocalStorage('user', res.data);
                setLoading(false);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Successfully aborted');
                }
                setLoading(false);
                console.log(err);
            });
        }

        if (isFetched === false) {
            findUser();
            setIsFetched(true);
        }

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