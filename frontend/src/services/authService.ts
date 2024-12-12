import apiClient from "./apiClient.ts";
import {LoginUser, RegisterUser} from "../types/UserData.ts";

export const registerUser = async (userData: RegisterUser) => {
    try {
        const response = await apiClient.post('/register', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error.response ? error.response.data : error;
    }
};

export const loginUser = async (userData: LoginUser) => {
    try {
        const response = await apiClient.post('/login', userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error.response ? error.response.data : error;
    }
}
