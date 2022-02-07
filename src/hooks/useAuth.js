import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext';
const axios = require('axios');

export default function useAuth() {
    // Creates var setUser and sets it to key within UserContext that says {, setUser: ...}
    // However, UserContext starts out as null
    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Set user in context and push them home
    const setUserContext = async () => {
        // Requests the checkUser function from the database, which returns a currentUser if the request has jwt in its cookies

        // Only called when we register, login, and edit profile
        return await axios.get('http://localhost:8080/user', { withCredentials: true })
        .then(res => {
            // console.log('Response from .get: ', res.data);
            setUser(res.data);
        })
        .catch(err => {
            setError(err);
        })
    }

    // Register user
    const registerUser = async (signUpData) => {
        await axios.post('http://localhost:8080/auth/signup', signUpData, { withCredentials: true })
        .then(res => {
            // setIsLoading(false);
            console.log('New user successfully created!');
            setUserContext();
            })
        .then(() => {
            navigate('/edit-profile');
        })
        .catch(err => {
            console.log(err);
            setError(err.response.data);
        })
    };

    const loginUser = async (loginData) => {
        await axios.post('http://localhost:8080/auth/login', loginData, { withCredentials: true })
        .then(res => {
            console.log('User successfully logged in!');
            setUserContext();
        })
        .then(() => {
            navigate('/');
        })
        .catch(err => {
          console.log(err);
          setError(err.response.data);
        });
    }

    const editProfile = async (profileData) => {
        await axios.put('http://localhost:8080/users/my-profile', profileData, { withCredentials: true })
            .then(res => {
                console.log('User successfully updated!');
                // Need to send back ALL user data + user_profile column
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

    return {
        setUserContext,
        registerUser,
        loginUser,
        editProfile,
        error
    }
}