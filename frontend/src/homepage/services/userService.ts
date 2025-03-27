import apiClient from './apiClient';

export const fetchUserData = async (token: string) => {
    try {
        const response = await apiClient.get('/getUser', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};
