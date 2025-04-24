import apiClient from './apiClient';
import {IAppointment, IDBAppointment} from "../interfaces/IAppointment.ts";

export const getAppointmentsByWeek = async (token: string, date: Date) => {
    try {
        const response = await apiClient.get('/getAppointmentsByWeek', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                date: date.toISOString(),
            },
        });

        const appointments: IAppointment[] = response.data.map((appointment: IDBAppointment) => ({
            id: appointment.appointment_id,
            datetime: new Date(appointment.appointment_datetime),
            datetimeString: new Date(appointment.appointment_datetime).toISOString(),
            type: appointment.appointment_type,
            description: appointment.description,
        }));

        return appointments;

    } catch (error) {
        console.error('Error fetching appointments:', error);
        throw error;
    }
};
