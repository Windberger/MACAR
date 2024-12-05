import axios from 'axios';

const apiClient = axios.create({
    baseURL: '93.82.134.47',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiClient;
