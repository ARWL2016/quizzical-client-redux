import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001'
});

api.interceptors.request.use((req) => {
    return new Promise(resolve => setTimeout(() => resolve(req), 500))
})

api.interceptors.response.use(response => response.data.data);

export default api;