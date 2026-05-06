import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080', // Backend rotalarına uyum için sadeleştirildi
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;