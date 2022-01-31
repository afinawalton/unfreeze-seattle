import axios from 'axios';
import React, { useState, useContext, createContext } from 'react';

const authContext = createContext();
// Provider component which wraps around your app and makes autho object
// available to any child component that calls useAuth()

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>
        {children}
    </authContext.Provider>
}
// Hook for child components to get the auth object and re-render when it changes.
export const useAuth = () => {
    return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function login(loginData) {
    setIsLoading(true);
    axios.post('http://localhost:8080/auth/login', loginData)
        .then(res => {
            setIsLoading(false);
            console.log('User successfully logged in!');
            setUser(res.data);
            })
        .catch(err => {
            console.log(err);
        });
    }

  function signup(signUpData) {
    setErrors([]);
    setIsLoading(true);
    axios.post('http://localhost:8080/auth/signup', signUpData)
        .then(res => {
            setIsLoading(false);
            console.log('New user successfully created!');
            setUser(res.data);
            })
        .catch(err => {
            console.log(err);
        });
  }

  function logout() {
    axios.delete('http://localhost:8080/auth/logout')
      .then(res => {
          setUser(null);
      });
  }

  function autoLogIn() {
    axios.get('http://localhost:8080/my-profile')
      .then(res => {
        setUser(user);
      });
  }

  return {
    user,
    login,
    signup,
    logout,
    autoLogIn,
    errors,
    isLoading
  };
}