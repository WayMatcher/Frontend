import APIResponse, { VehicleResponse } from '../../../types/API';
import Vehicle from '../../../types/dto/Vehicle';

export const apiGetVehicle = async (): Promise<VehicleResponse> => {
    // Mock response for frontend testing
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                succeeded: true,
                message: 'Vehicle found',
                vehicle: {
                    id: 1,
                    make: 'Toyota',
                    model: 'Corolla',
                    year: 2005,
                    license_plate: 'ABC123',
                    seats: 4,
                },
            });
        }, 1000);
    });
};

export const apiSetVehicle = async (vehicle: Vehicle): Promise<APIResponse> => {
    // Mock response for frontend testing
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                succeeded: true,
                message: 'Vehicle set successfully',
            });
        });
    });
}