import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
const axios = require('axios');

export default function useLogout() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logoutUser = async () => {
        return axios.get('/auth/logout')
        .then(res => {
            console.log(res);
            navigate('/login');
        })
        .then(() => {
            setUser(null);
            localStorage.removeItem('user');
        })
        .catch(err => {
            console.log(err);
        })
    }

    return {
        logoutUser
    }
}