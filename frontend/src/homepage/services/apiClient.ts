import axios from 'axios';
//import { updateToken } from '../context/TokenUpdater';

const apiClient = axios.create({
    baseURL: 'https://macar.onrender.com:3001',
    headers: {
        'Content-Type': 'application/json',
    },
});

// apiClient.interceptors.response.use(
//     response => response,
//     async error => {
//         console.log('Interceptor error: ', error);
//
//         if (error.response?.status === 401) {
//             try {
//                 const response = await apiClient.post('/token');
//                 const newAccessToken = response.data.accessToken;
//                 updateToken(newAccessToken);
//
//                 error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                 return axios(error.config);
//             } catch (refreshError) {
//                 console.error('Erneuerung des Tokens fehlgeschlagen:', refreshError);
//             }
//         }
//         return Promise.reject(error);
//     }
// );

export default apiClient;
