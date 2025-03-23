import apiClient from "./apiClient.ts";
import {LoginUser, RegisterUser} from "../types/UserData.ts";
import {updateToken} from "../context/TokenUpdater.ts";

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
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getAccessToken = async () => {
    const response = await apiClient.post('/token', {}, {
        withCredentials: true,
    });

    updateToken(response.data.accessToken);
    return response.data.accessToken;
}

export const logoutUser = async () => {
    await apiClient.post('/logout', {}, {
        withCredentials: true,
    });
}