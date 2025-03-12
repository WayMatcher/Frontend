import React, { createContext, useState, ReactNode } from 'react';
import User from '../types/dto/User';
import { UserContextProps } from '../types/Contexts';


/**
 * Context for managing user state within the application.
 * 
 * @constant
 * @type {React.Context<UserContextProps>}
 * 
 * @property {UserContextProps} defaultValue - The default value for the context.
 * @property {User | null} defaultValue.user - The current user object or null if no user is logged in.
 * @property {function} defaultValue.setUser - Function to update the user state.
 */
const UserContext: React.Context<UserContextProps> = createContext<UserContextProps>({
    user: null,
    setUser: () => { },
});

/**
 * UserProvider component that provides user context to its children.
 *
 * @param {ReactNode} children - The child components that will have access to the user context.
 * @returns {JSX.Element} The UserContext provider with the user state and setter.
 */
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

/**
 * The UserContext provides a way to pass user-related data through the component tree
 * without having to pass props down manually at every level.
 *
 * @context
 * @example
 * ```tsx
 * import React, { useContext } from 'react';
 * import UserContext from './contexts/UserContext';
 *
 * const MyComponent = () => {
 *   const user = useContext(UserContext);
 *   return <div>{user.name}</div>;
 * };
 * ```
 */
export default UserContext;