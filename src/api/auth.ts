import bcrypt from 'bcryptjs';

import { User, Username, Email } from '../types';

/**
 * Hashes a password using bcrypt.
 * @param password - The password to hash.
 * @returns The hashed password.
 */
function hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
}

/**
 * Authenticates a user based on a username or email and password.
 *
 * @param userOrEmail - The username or email of the user to authenticate.
 * @param password - The password of the user to authenticate.
 * @returns A promise that resolves to a User object if authentication is successful, or null if authentication fails.
 */
const authenticate = (userOrEmail: Username | Email, password: string): Promise<User> | null => {
    //! Placeholder for the return of actual API call
    // When given a username or email, return a user object with the hashed password
    const placeHolderPromise = new Promise<User>((resolve, reject) => {
        if (userOrEmail as Username !== undefined) {
            resolve({
                id: 1,
                username: userOrEmail,
                email: 'test@exmaple.com',
                password: hashPassword(password),
            });
        } else if (userOrEmail as Email !== undefined) {
            resolve({
                id: 1,
                username: 'test',
                email: userOrEmail,
                password: hashPassword(password),
            });
        }
        else {
            reject(
                {
                    id: 1,
                    username: 'test',
                    email: 'test@example.com',
                    password: hashPassword(password),
                }
            );
        }
    });
    return placeHolderPromise;
}
export default authenticate;