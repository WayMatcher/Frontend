import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import Vehicle from '@/types/objects/Vehicle/dto';
import VehicleEntry from '@/components/vehicle/Vehicle';
import { apiGetVehicleList, apiSetVehicleList } from '@/api/endpoints/vehicle';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from '@/types/objects/User/dto';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import LoadingOverlay from '../LoadingOverlay';

/**
 * Component to display and manage a list of vehicles for a user.
 * Allows adding and deleting vehicles, and displays a loading overlay during data fetching.
 */
export default function RegisterVehicleList(): React.ReactElement {
    const authUser = useAuthUser<User>(); // Hook to get the authenticated user.
    const [loading, setLoading] = useState<boolean>(true); // State to manage loading status.
    const vehicleListState = useState<Vehicle[]>([]); // State to manage the list of vehicles.
    const { showErrorModal } = useContext(ErrorModalContext); // Context to show error modals.

    useEffect(() => {
        /**
         * Fetches the list of vehicles for the authenticated user from the API.
         * Displays an error modal if the fetch fails.
         */
        const fetchVehicleList = async () => {
            try {
                setLoading(true); // Show loading overlay.
                const response = await apiGetVehicleList({ userId: authUser?.userId });
                vehicleListState[1](response.data); // Update vehicle list state with fetched data.
            } catch (error: unknown) {
                if (error instanceof Error) showErrorModal(error.message); // Show error modal.
                throw new Error('Failed to fetch vehicle list'); // Throw error for debugging.
            } finally {
                setLoading(false); // Hide loading overlay.
            }
        };
        fetchVehicleList();
    }, []); // Empty dependency array ensures this runs only once on component mount.

    /**
     * Adds a new vehicle to the list with a unique ID.
     */
    const handleAddVehicle = () => {
        const lastVehicleId =
            vehicleListState[0].length > 0 ? vehicleListState[0][vehicleListState[0].length - 1].vehicleId : 0;
        const newVehicle: Vehicle = {
            vehicleId: (lastVehicleId ?? 0) + 1, // Generate a new unique ID.
        };
        vehicleListState[1]((prevVehicles) => [...prevVehicles, newVehicle]); // Add new vehicle to the list.
    };

    /**
     * Deletes a vehicle from the list and updates the API.
     * @param vehicleId - The ID of the vehicle to delete.
     */
    const handleDeleteVehicle = async (vehicleId: number) => {
        try {
            await apiSetVehicleList({ vehicleList: vehicleListState[0] }); // Update the API with the current list.
            vehicleListState[1]((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.vehicleId !== vehicleId)); // Remove the vehicle from the list.
        } catch (error: unknown) {
            if (error instanceof Error) showErrorModal(error.message); // Show error modal if API call fails.
        }
    };

    return (
        <>
            <h2>Vehicles</h2>
            <LoadingOverlay isLoading={loading}>
                <Container>
                    <ListGroup>
                        {/* Render each vehicle in the list */}
                        {vehicleListState[0].map((vehicle: Vehicle) => (
                            <ListGroup.Item key={`vehicle-${vehicle.vehicleId}`}>
                                <VehicleEntry
                                    vehicle={vehicle}
                                    vehicleListState={vehicleListState}
                                    onDelete={handleDeleteVehicle}
                                />
                            </ListGroup.Item>
                        ))}
                        {/* Button to add a new vehicle */}
                        <ListGroup.Item>
                            <Button onClick={handleAddVehicle}>Add Vehicle</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Container>
            </LoadingOverlay>
        </>
    );
}
