export interface DatabaseAppointment {
    appointment_id: number;
    appointment_datetime: string;
    appointment_type: string;
    description: string;
}

export interface Appointment {
    id: number;
    datetime: Date;
    datetimeString: string;
    type: string;
    description: string;
}