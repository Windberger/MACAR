import apiClient from './apiClient';

const fetchUserData = async (token) => {
    try {
        const response = await apiClient.get('/getUser', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error.response ? error.response.data : error;
    }
};
