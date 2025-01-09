import React, { createContext, useState, ReactNode } from 'react';
import { nullUser, User } from '../types/UserData.ts';
import { Appointment } from '../types/AppointmentData.ts';
import { setTokenUpdater } from './TokenUpdater';

interface UserContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLogged: boolean) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    user: User;
    setUser: (user: User) => void;
    appointments: Appointment[];
    setAppointments: (appointments: Appointment[]) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User>(nullUser);
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    React.useEffect(() => {
        setTokenUpdater(setToken);
    }, []);

    return (
        <UserContext.Provider
            value={{ isLoggedIn, setIsLoggedIn, token, setToken, user, setUser, appointments, setAppointments }}
        >
            {children}
        </UserContext.Provider>
    );
};
