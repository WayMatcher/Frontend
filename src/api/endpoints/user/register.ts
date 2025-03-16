import API from '../../api';
import APIResponse from '../../../types/API';

import { UserRegister } from '../../../types/dto/User';
import Address from '../../../types/dto/Address';
import Vehicle from '../../../types/dto/Vehicle';

import bcrypt from 'bcryptjs';

const api = new API();

// * How the registration flow works:
// 1. User enters registration details in frontend
// 2. Frontend sends registration details to the backend
// 3. Backend checks if the registration details are correct
// 4. If correct, the backend sends a JWT to the frontend
// 5. Frontend stores the JWT in the local storage

/**
 * Registers a new user with the provided details.
 *
 * @param user - The user object containing user details.
 * @param address - The address object containing address details.
 * @param vehicle - The vehicle object containing vehicle details.
 * @returns A promise that resolves to an APIResponse object.
 * @throws Will throw an error if the API request fails.
 */
export const registerAPI = async (user: UserRegister, address: Address, vehicle: Vehicle): Promise<APIResponse> => {
    const hashedUser = { ...user, password: bcrypt.hashSync(user.password, 10) };
    try {
        const response = await api.axios.post('/register', { hashedUser, address, vehicle });
        return response.data as APIResponse;
    } catch (error) {
        api.handleApiError(error);
        throw error;
    }
}

export default registerAPI;
