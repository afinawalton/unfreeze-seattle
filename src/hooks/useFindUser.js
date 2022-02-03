import { useState, useEffect } from "react";
const axios = require('axios');

export default function useFindUser() {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        async function findUser() {
            await axios.get('http://localhost:8080/user', { withCredentials: true })
            .then(res => {
                setUser(res.data.currentUser);
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
        isLoading
    }
}