export interface IAppointment {
    id: number,
    datetime: Date,
    datetimeString: string,
    type: string,
    description: string,
    user_id: number,
    first_name: string,
    last_name: string,
    email: string,
    bonus: number
}

export interface IDBAppointment {
    appointment_id: number,
    appointment_datetime: Date,
    appointment_type: string,
    description: string,
    user_id: number,
    first_name: string,
    last_name: string,
    email: string,
    bonus: number
}

export interface AddAppointment {
    user: number,
    datetime: Date,
    type: string,
    description: string,
}