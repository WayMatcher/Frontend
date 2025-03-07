/**
 * Represents the context type for a user.
 */
export interface UserContextType {

    /**
     * The current user or null if no user is logged in.
     */
    user: User | null;

    /**
     * Logs in a user and returns the updated UserContextType.
     * @param user - The user to log in.
     * @returns Returns the context based on the user given.
     */
    login: (user: User) => UserContextType;

    /**
     * Logs out the current user.
     */
    logout: () => void;
}

/**
 * A branded type to represent a username.
 * 
 * This interface is used to create a unique type for usernames,
 * ensuring that they are not confused with other string values.
 */
interface UsernameBrand {
    __brand: 'Username';
}

/**
 * Represents a branded type for an email address.
 * The `__brand` property is used to distinguish this type from a regular string.
 */
interface EmailBrand {
    __brand: 'Email';
}

/**
 * Represents a branded type for a username.
 * This type ensures that a string is treated as a `Username` by combining it with a unique brand.
 */
export type Username = string & UsernameBrand;

/**
 * Represents a branded type for a email.
 * This type ensures that a string is treated as a `E-Mail` by combining it with a unique brand.
 */
export type Email = string & EmailBrand;


/**
 * Props for the UserProvider component.
 * 
 * @property {React.ReactNode} children - The child components to be rendered within the UserProvider.
 */
export interface UserProviderProps {
    children: React.ReactNode;
}

/**
 * Represents a user in the system.
 */
export interface User {
    id?: number;
    username: Username;
    email: Email;
    password: string;
}