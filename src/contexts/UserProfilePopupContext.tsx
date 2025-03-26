import React, { createContext, useContext, useState } from 'react';
import User from '@/types/objects/User/dto';

interface UserProfilePopupContextProps {
    user: User | null;
    show: boolean;
    openPopup: (user: User) => void;
    closePopup: () => void;
}

const UserProfilePopupContext = createContext<UserProfilePopupContextProps | undefined>(undefined);

export const UserProfilePopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [show, setShow] = useState(false);

    const openPopup = (user: User) => {
        setUser(user);
        setShow(true);
    };

    const closePopup = () => {
        setUser(null);
        setShow(false);
    };

    return (
        <UserProfilePopupContext.Provider value={{ user, show, openPopup, closePopup }}>
            {children}
        </UserProfilePopupContext.Provider>
    );
};

export const useUserProfilePopup = () => {
    const context = useContext(UserProfilePopupContext);
    if (!context) {
        throw new Error('useUserProfilePopup must be used within a UserProfilePopupProvider');
    }
    return context;
};
