import { useState, useEffect } from "react";
const axios = require('axios');

export default function useFindUser() {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [isFetched, setIsFetched] = useState(false);

    // Now this hook is messing up our cookie
    useEffect(() => {
        const controller = new AbortController();

        const findUser = async () => {
            return await axios.get('http://localhost:8080/user', { withCredentials: true, signal: controller.signal })
            .then(res => {
                // console.log('This is the data we got back from findUser() ', res);
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