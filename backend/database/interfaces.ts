export interface DB_User {
    user_id: number;
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    password: string,
    is_admin: boolean,
    bonus: number
}