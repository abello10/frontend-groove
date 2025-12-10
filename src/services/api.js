import axios from 'axios';

const BASE_URL = 'https://groove-api-saw4.onrender.com/api/v1'; 

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;