const axios = require('axios');

const API_URL = 'http://localhost:8080/auth/';

class AuthService {
    
    register(user) {
        return axios.post(API_URL + 'signup', user);
    }

    login(username, password) {
        return axios.post(API_URL + 'login', {
            username,
            password
        })
        .then(res => {
            if (res.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(res.data));
            }

            return res.data;
        });
    }

    logout() {
        localStorage.removeItem('user');
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default {
    register,
    login,
    logout,
    getCurrentUser
}