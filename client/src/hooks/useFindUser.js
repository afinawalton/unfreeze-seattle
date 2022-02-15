import { useState, useEffect } from "react";
import useLocalStorage from './useLocalStorage';
const axios = require('axios');

export default function useFindUser() {
    const { getLocalStorage, setLocalStorage } = useLocalStorage();
 
    const [user, setUser] = useState(() => getLocalStorage('user', null));
    const [isLoading, setLoading] = useState(true);
    const [isFetched, setIsFetched] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        const findUser = async () => {
            return await axios.get('/user', { withCredentials: true, signal: controller.signal })
            .then(res => {
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