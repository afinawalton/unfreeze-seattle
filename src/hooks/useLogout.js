import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
const axios = require('axios');

export default function useLogout() {
    const { setUser } = useContext(UserContext);

    let navigate = useNavigate();

    const logoutUser = async () => {
        axios.get('http://localhost:8080/auth/logout', { withCredentials: true })
        .then(res => {
            console.log(res);
            setUser(null);
        })
        .then(() => {
            navigate('/');
        })
        .catch(err => {
            console.log(err);
        })
    }

    return {
        logoutUser
    }
}