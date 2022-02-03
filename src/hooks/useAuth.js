import { useState, useContext } from "react";
import { UserContext } from './UserContext';
const axios = require('axios');

export default function useAuth() {
    // Creates var setUser and sets it to key within UserContext that says {, setUser: ...}
    // However, UserContext starts out as null
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);

    // Set user in context and push them home
    const setUserContext = async () => {
        // Requests the checkUser function from the database, which returns a currentUser if the request has jwt in its cookies

        // Only called when we register, login, and edit profile
        return await axios.get('http://localhost:8080/user', { withCredentials: true })
        .then(res => {
            // setUser(res.data.currentUser);
            setUser(res.data.currentUser);
        })
        .catch(err => {
            setError(err);
        })
    }

    // Register user
    const registerUser = (signUpData) => {
        axios.post('http://localhost:8080/auth/signup', signUpData, { withCredentials: true })
        .then(res => {
            // setIsLoading(false);
            console.log('New user successfully created!');
            setUserContext();
            })
        .catch(err => {
            console.log(err);
            setError(err.response.data);
        })
    };

    const loginUser = async (loginData) => {
        axios.post('http://localhost:8080/auth/login', loginData, { withCredentials: true })
        .then(res => {
            console.log('User successfully logged in!');
            setUserContext();
            })
        .catch(err => {
          console.log(err);
          setError(err.response.data);
        });
    }

    function editProfile(profileData) {
        axios.put('http://localhost:8080/user', profileData, { withCredentials: true })
            .then(res => {
                console.log('User successfully updated!');
                // Need to send back ALL user data + user_profile column
                setUserContext();
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