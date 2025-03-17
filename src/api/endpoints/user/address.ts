import APIResponse, { AddressResponse } from '../../../types/API';
import Address from '../../../types/dto/Address';

export const apiGetAddress = async (): Promise<AddressResponse> => {
    // Mock response for frontend testing
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                succeeded: true,
                message: 'Address found',
                address: {
                    id: 1,
                    street: '1234 Elm St',
                    city: 'Springfield',
                    state: 'IL',
                    postal_code: '62701',
                    country: 'USA',
                    longitude: -89.650148,
                    latitude: 39.781721
                },
            });
        }, 1000);
    });
};

export const apiSetAddress = async (address: Address): Promise<APIResponse> => {
    // Mock response for frontend testing
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                succeeded: true,
                message: 'Address set successfully',
            });
        });
    });
}