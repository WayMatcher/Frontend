import APIResponse, { UserResponse } from '../../../types/API';
import User from '../../../types/dto/User';

export const apiGetUser = async (): Promise<UserResponse> => {
    // Mock response for frontend testing
    return new Promise<UserResponse>((resolve) => {
        setTimeout(() => {
            resolve({
                succeeded: true,
                message: 'User found',
                user: {
                    id: 1,
                    username: 'test-user',
                    email: 'test-user@email.com',
                }
            });
        }, 1000);
    });
};

export const apiSetUser = async (user: User): Promise<APIResponse> => {
    // Mock response for frontend testing
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                succeeded: true,
                message: 'User set successfully',
            });
        });
    });
}