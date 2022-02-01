import axios from 'axios';
import React, { useState, useContext, createContext } from 'react';
// import { useNavigate } from 'react-router-dom';

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
// export const useAuth = () => {
//     return useContext(authContext);
// };
export const useAuth = () => {
  // let history = useHistory();
  // const { setUser } = useContext(authContext);

  // const setUserContext = async () => {
  //   return await axios.get('/user')
  //   .then(res => {
  //     setUser(res.data.currentUser);
  //     history.push('/home');
  //   })
  //   .catch(err => {
  //     setError(err.response.data);
  //   })
  // }
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // let navigate = useNavigate();

  // const setUserContext = async () => {
  //   return await axios.get('http://localhost:8080/user')
  //   .then(res => {
  //     setUser(res.data.currentUser);
  //     navigate('/');
  //   })
  //   .catch(err => {
  //     setErrors(err.response.data);
  //   })
  // }

  function login(loginData) {
    setIsLoading(true);
    axios.post('http://localhost:8080/auth/login', loginData)
        .then(res => {
            setIsLoading(false);
            console.log('User successfully logged in!');
            // set user in context and push them home
            setUser(res.data);
            // navigate('/home');
            })
        .catch(err => {
          console.log(err);
          setErrors(err.response.data);
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

  function editProfile(profileData) {
    setErrors([]);
    setIsLoading(true);
    axios.put('http://localhost:8080/user', profileData)
        .then(res => {
            setIsLoading(false);
            console.log('User successfully updated!');
            // Need to send back ALL user data + user_profile column
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
    editProfile,
    logout,
    autoLogIn,
    errors,
    isLoading
  };
}