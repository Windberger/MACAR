import apiClient from './apiClient';
import {AddAppointment, IAppointment, IDBAppointment} from "../interfaces/IAppointment.ts";
import axios from "axios";

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
            user_id: appointment.user_id,
            first_name: appointment.first_name,
            last_name: appointment.last_name,
            email: appointment.email,
            bonus: appointment.bonus,
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


export const addAppointment = async (token: string, appointment: AddAppointment) => {
    try {
        console.log("Adding appointment:", appointment);

        appointment.datetime = appointment.datetime.toISOString();
        const response = await apiClient.post('/addAppointment', appointment, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return await response.data;
    } catch (error) {
        console.error('Error adding appointment:', error);
        throw error;
    }
};


