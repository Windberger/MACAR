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
        throw error;
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
        throw error;
    }
}
