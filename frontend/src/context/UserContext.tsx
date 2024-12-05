import React, {createContext, useState, useContext, ReactNode} from 'react';
import {User} from "../types/UserData.ts";

const UserContext = createContext();

interface UserContextType {
    user: User;
    setUser: (user: User) => void;
}

export const UserProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
