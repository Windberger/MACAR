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

export const getAppointmentById = async (token: string, appointmentId: number) => {
    try {
        const response = await fetch('/getAppointmentById', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                appointment_id: appointmentId,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching appointment by ID:', error);
        throw error;
    }
};


export const addAppointment = async (token: string, appointment: { user: number, datetime: string, type: string, description?: string }) => {
    try {
        const response = await fetch('/addAppointment', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(appointment),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error adding appointment:', error);
        throw error;
    }
};


