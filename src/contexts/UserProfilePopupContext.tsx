import React, { createContext, useContext, useState } from 'react';
import User from '@/types/objects/User/dto';

/**
 * Interface defining the shape of the UserProfilePopupContext.
 */
interface UserProfilePopupContextProps {
    /** The user object to display in the popup, or null if no user is selected. */
    user: User | null;
    /** Boolean indicating whether the popup is currently visible. */
    show: boolean;
    /** Function to open the popup with a specific user. */
    openPopup: (user: User) => void;
    /** Function to close the popup. */
    closePopup: () => void;
}

/**
 * Context for managing the state of the user profile popup.
 */
const UserProfilePopupContext = createContext<UserProfilePopupContextProps | undefined>(undefined);

/**
 * Provider component for the UserProfilePopupContext.
 * Wraps its children and provides context values for managing the popup state.
 */
export const UserProfilePopupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // State to store the currently selected user.
    const [user, setUser] = useState<User | null>(null);
    // State to track whether the popup is visible.
    const [show, setShow] = useState(false);

    /**
     * Opens the popup and sets the selected user.
     * @param user - The user object to display in the popup.
     */
    const openPopup = (user: User) => {
        setUser(user);
        setShow(true);
    };

    /**
     * Closes the popup and clears the selected user.
     */
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

/**
 * Custom hook to access the UserProfilePopupContext.
 * Throws an error if used outside of a UserProfilePopupProvider.
 * @returns The context value for managing the user profile popup.
 */
export const useUserProfilePopup = () => {
    const context = useContext(UserProfilePopupContext);
    if (!context) {
        throw new Error('useUserProfilePopup must be used within a UserProfilePopupProvider');
    }
    return context;
};
