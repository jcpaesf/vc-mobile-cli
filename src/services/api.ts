import axios from 'axios';

export const baseURL = 'https://api.vestconnect.com.br';

const api = axios.create({
    baseURL: 'https://api.vestconnect.com.br'
});

export default api;