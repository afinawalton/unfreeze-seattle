import { useNavigate } from "react-router-dom";
const axios = require('axios');

export default function useLogout() {
    let navigate = useNavigate();

    const logoutUser = async () => {
        axios.get('http://localhost:8080/auth/logout')
        .then(res => {
            console.log(res);
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