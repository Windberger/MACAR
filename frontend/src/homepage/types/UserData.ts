export interface RegisterUser {
    first_name: string,
    last_name: string,
    email: string | null,
    phone_number: string | null,
    password: string,
}

export interface LoginUser {
    email: string | null,
    phoneNumber: string | null,
    password: string,
}

export interface User {
    user_id: number;
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    is_admin: boolean,
    bonus: number,
}

export const nullUser: User = {
    user_id: 0,
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    is_admin: false,
    bonus: 0,
}