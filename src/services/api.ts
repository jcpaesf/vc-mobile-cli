import axios from 'axios';

export const baseURL = 'http://192.168.0.104:3333';

const api = axios.create({
    baseURL: 'http://192.168.0.104:3333'
});

export default api;