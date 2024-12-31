export interface DatabaseAppointment {
    appointment_id: number;
    appointment_datetime: string;
    appointment_type: string;
    description: string;
}

export interface Appointment {
    id: number;
    datetime: Date;
    type: string;
    description: string;
}