import axios from 'axios';
import { localStorageConfig } from '../config/localStorageConfig';

class AuthService {

    static register(user) {
        return axios.post('/api/user/register', user);
    }

    static login(user) {
        return axios.post('/api/user/login', user);
    }

    static completeRegistration(id) {
        return axios.post('/api/user/complete-registration', id);
    }

    static isUserLoggedIn() {
        return localStorage.getItem(localStorageConfig.USER);
    }

    static updateUser(user) {
        return axios.put('/api/user/update-user', user);
    }

    static deleteUser(userID) {
        return axios.delete(`/api/user/delete-user/${userID}`);
    }

    static setVoting(body){
        return axios.put('/api/user/vote', body);
    }

    static getVoting(id){
        return axios.get(`/api/user/get-vote/${id}`)
    }
}

export default AuthService;