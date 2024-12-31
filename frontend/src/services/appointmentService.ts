import apiClient from './apiClient';
import {DatabaseAppointment} from "../types/AppointmentData.ts";

export const getAppointmentsByUser = async (token: string) => {
    try {
        const response = await apiClient.get('/getAppointmentsByUser', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const dbAppointments: DatabaseAppointment[] = response.data;

        if(!dbAppointments || dbAppointments.length === 0) {
            return [];
        }

        return dbAppointments.map((dbAppointment) => ({
            id: dbAppointment.appointment_id,
            datetime: new Date(dbAppointment.appointment_datetime),
            type: dbAppointment.appointment_type,
            description: dbAppointment.description,
        }));
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
};
