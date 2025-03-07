// src/contexts/UserContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types/user';

interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
    //Potentially, you could also include logout here.
}

const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => { },
});

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);