export interface IAppointment {
    id: number,
    datetime: Date,
    datetimeString: string,
    type: string,
    description: string,
}

export interface IDBAppointment {
    appointment_id: number,
    appointment_datetime: Date,
    appointment_type: string,
    description: string,
}