export interface RegisterUser {
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    password: string,
}

export interface LoginUser {
    email: string,
    phoneNumber: string,
    password: string,
}

export interface User {
    user_id: number;
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    bonus: number
}