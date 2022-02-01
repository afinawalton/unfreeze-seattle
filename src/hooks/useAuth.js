import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from './UserContext';
const axios = require('axios');

export default function useAuth() {
    let navigate = useNavigate;
    const { setUser } = useContext(UserContext);
    const [error, setError] = useState(null);

    // Set user in context and push them home
    const setUserContext = async () => {
        return await axios.get('http://localhost:8080/user')
        .then(res => {
            setUser(res.data.currentUser);
            navigate('http://localhost:8080/');
        })
        .catch(err => {
            setError(err);
        })
    }

    // Register user
    const registerUser = (signUpData) => {
        axios.post('http://localhost:8080/auth/signup', signUpData)
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
        axios.post('http://localhost:8080/auth/login', loginData)
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
        axios.put('http://localhost:8080/user', profileData)
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
        registerUser,
        loginUser,
        editProfile,
        error
    }
}