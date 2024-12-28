import {createContext, useState, ReactNode} from 'react';
import {User} from "../types/UserData.ts";

interface UserContextType {
    isLoggedIn: boolean;
    setIsLoggedIn: (isLogged: boolean) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    user: User;
    setUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({children}: {children: ReactNode}) => {

    const nullUser: User = {
        user_id: 0,
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        is_admin: false,
        bonus: 0,
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User>(nullUser);

    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken, user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
