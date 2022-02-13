import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
const axios = require('axios');

export default function useLogout() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const logoutUser = async () => {
        return axios.get('/auth/logout', { withCredentials: true })
        .then(res => {
            console.log(res);
            setUser(null);
            localStorage.removeItem('user');
            navigate('/login');
        })
        .catch(err => {
            console.log(err);
        })
    }

    return {
        logoutUser
    }
}