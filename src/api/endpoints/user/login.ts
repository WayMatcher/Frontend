import API from '../../api';
import bcrypt from 'bcryptjs';

import { LoginResponse, MFAResponse } from '../../../types/API';
import User, { UserLogin } from '../../../types/dto/User';

const api = new API();

// * How the authentication flow works:
// 1. User enters username and password in frontend
// 2. Frontend sends username and password to the backend
// 3. Backend checks if the username and password are correct
// 4. If correct, the backend sends a MFA Token to the users email
// 5. User enters the MFA Token in the frontend
// 6. Frontend sends the MFA Token to the backend
// 7. Backend checks if the MFA Token is correct
// 8. If correct, the backend sends a JWT to the frontend
// 9. Frontend stores the JWT in the local storage

/**
 * Authenticates a user using multi-factor authentication (MFA).
 *
 * @param user - The user object containing user details.
 * @param mfaToken - The MFA token provided by the user.
 * @returns A promise that resolves to an MFAResponse object.
 * @throws Will throw an error if the API request fails.
 */
export const mfaAuthUser = async (user: User, mfaToken: string): Promise<MFAResponse> => {
    // Mock response for frontend testing
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                succeeded: true,
                message: 'MFA authentication successful',
                user: {
                    ...user,
                    username: user.username,
                    email: user.email,
                    jwt: 'mock-jwt-token'
                }
            });
        }, 1000);
    });

    // Original code
    // try {
    //     const response = await api.axios.post('/auth/mfa', { user: user, mfaToken: bcrypt.hash(mfaToken, 10) });
    //     return response.data as MFAResponse;
    // } catch (error) {
    //     api.handleApiError(error);
    //     throw error;
    // }
};

/**
 * Authenticates a user with the provided credentials.
 *
 * @param credentials - The login credentials containing either a username or email and a password.
 * @returns A promise that resolves to a `LoginResponse` object containing authentication details.
 * @throws Will throw an error if the authentication request fails.
 */
const authUser = async (credentials: UserLogin): Promise<LoginResponse> => {
    // Mock response for frontend testing
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                succeeded: true,
                message: 'Login successful',
                user: {
                    id: 1,
                    username: 'Günther',
                    email: credentials.email,
                }
            });
        }, 1000);
    });

    // Original code
    // try {
    //     const response = await api.axios.post('/auth/login', { user: credentials.username, password: bcrypt.hashSync(credentials.password, 10) });
    //     return response.data as APIResponse;
    // } catch (error) {
    //     api.handleApiError(error);
    //     throw error;
    // }
};

export default authUser;