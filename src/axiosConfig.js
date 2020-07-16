import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001'
});

api.interceptors.request.use((req) => {
    return new Promise(resolve => setTimeout(() => resolve(req), 1500))
})

export default api;