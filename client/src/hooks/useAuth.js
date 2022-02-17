import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext';
import useLocalStorage from './useLocalStorage';
const axios = require('axios');

export default function useAuth() {
    const { setLocalStorage } = useLocalStorage();

    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const setUserContext = async () => {
        return await axios.get('/user', { withCredentials: true })
        .then(res => {
            setUser(res.data);
            setLocalStorage('user', res.data);
        })
        .catch(err => {
            setError(err.response.data);
        })
    }

    const registerUser = async (signUpData) => {
        return await axios.post('/auth/signup', signUpData, { withCredentials: true })
        .then(res => {
            console.log('New user successfully created!');
            setUserContext();
            })
        .then(() => {
            navigate('/edit-profile');
        })
        .catch(err => {
            console.log(err);
            setError(err.response.data.message);
        })
    };

    const loginUser = async (loginData) => {
        return await axios.post('/auth/login', loginData, { withCredentials: true })
        .then(res => {
            console.log('User successfully logged in!');
            setUserContext();
        })
        .then(() => {
            navigate('/');
        })
        .catch(err => {
          console.log(err);
          setError(err.response.data.message);
        });
    }

    const editProfile = async (profileData) => {
        return await axios.post(`/api/users/${user.id}/profile`, profileData, { withCredentials: true })
        .then(res => {
            console.log('User successfully updated!');
            setUserContext();
            })
        .then(() => {
            navigate('/my-profile');
        })
        .catch(err => {
            console.log(err);
            setError(err.response.data);
        });
    }

    const deleteUser = async () => {
        return await axios.delete(`/api/users/${user.id}`, { withCredentials: true })
        .then(res => {
            console.log('User successfully deleted!');
            setUser(null);
            localStorage.clear();
        })
        .then(() => {
            navigate('/login');
        })
        .catch(err => {
            console.log(err);
            setError(err.response.data);
        })
    }

    return {
        setUserContext,
        registerUser,
        loginUser,
        editProfile,
        deleteUser,
        error
    }
}