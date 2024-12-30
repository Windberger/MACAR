import {createContext, useState, ReactNode} from 'react';
import {nullUser, User} from "../types/UserData.ts";

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

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<User>(nullUser);

    return (
        <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, token, setToken, user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
