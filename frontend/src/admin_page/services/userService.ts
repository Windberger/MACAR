import apiClient from "../../homepage/services/apiClient.ts";
import {User} from "../types/UserData.ts";

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

export const fetchAllUsers = async (token: string) => {
    try {
        console.log("Fetching all users with token:", token);
        const response = await apiClient.get('/getAllUsers', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
}

export const updateCustomer = async (token: string, customer: User) =>{
    try {
        const response = await apiClient.put('/updateUser', customer, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error('Error updating user data:', error);
        throw error;
    }
}

export const deleteCustomer = async (token: string, userId: number) => {
    try {
        const response = await apiClient.delete('/deleteUser/' + userId, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}