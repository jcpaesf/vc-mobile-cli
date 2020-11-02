import axios from 'axios';

export const baseURL = 'https://nodevc.jcpaesf.com';

const api = axios.create({
    baseURL: 'https://nodevc.jcpaesf.com'
});

export default api;