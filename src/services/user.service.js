const axios = require('axios');
import authHeader from './authHeader';

const API_URL = 'http://localhost:8080/test/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getLocalBoard() {
        return axios.get(API_URL + 'local', { headers: authHeader() });
    }

    getTransplantBoard() {
        return axios.get(API_URL + 'transplant', { headers: authHeader() });
    }
}

export default {
    getPublicContent,
    getLocalBoard,
    getTransplantBoard
}