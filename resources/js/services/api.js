import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://martina-gecikova.herokuapp.com',
    withCredentials: true,
});

export default apiClient;