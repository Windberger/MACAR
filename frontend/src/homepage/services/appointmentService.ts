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

        const formatDate = (date: Date) => {
            return date.toLocaleString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).replace(',', '');
        };

        return dbAppointments.map((dbAppointment) => ({
            id: dbAppointment.appointment_id,
            datetime: new Date (Date.parse(dbAppointment.appointment_datetime)),
            datetimeString: formatDate(new Date (Date.parse(dbAppointment.appointment_datetime))),
            type: dbAppointment.appointment_type,
            description: dbAppointment.description,
        }));
    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
};
