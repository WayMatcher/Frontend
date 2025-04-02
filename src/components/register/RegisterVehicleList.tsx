import React, { useEffect } from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import CollapseWrapper from '@/components/CollapseWrapper';
import Vehicle from '@/types/objects/Vehicle/dto';
import VehicleEntry from '@/components/vehicle/Vehicle';
import { useNavigate } from 'react-router-dom';

/**
 * Component to display and manage a list of vehicles during the registration process.
 * @param {Object} props - Component props.
 * @param {[Vehicle[], React.Dispatch<React.SetStateAction<Vehicle[]>>]} props.vehicleListState - State for the list of vehicles.
 * @param {Object} props.done - Object tracking the completion status of registration steps.
 * @param {boolean} props.done.user - Whether the user step is completed.
 * @param {boolean} props.done.address - Whether the address step is completed.
 * @param {boolean} props.done.vehicle - Whether the vehicle step is completed.
 * @param {Function} props.done.onComplete - Callback to update the completion status of the vehicle step.
 * @returns {React.ReactElement} The rendered component.
 */
export default function RegisterVehicleList({
    vehicleListState,
    done,
}: {
    vehicleListState: [Vehicle[], React.Dispatch<React.SetStateAction<Vehicle[]>>];
    done: {
        user: boolean;
        address: boolean;
        vehicle: boolean;
        onComplete: (isDone: boolean) => void;
    };
}): React.ReactElement {
    const navigate = useNavigate();

    // Redirect to the appropriate registration step if prerequisites are not completed.
    if (done.user === false && done.address === false) {
        navigate('/register/user');
    } else if (done.user === true && done.address === false) {
        navigate('/register/address');
    }

    useEffect(() => {
        // Mark the vehicle step as complete if there are vehicles in the list.
        if (vehicleListState[0].length > 0) {
            done.onComplete(true);
        }
    }, [vehicleListState, done.onComplete]);

    /**
     * Adds a new vehicle to the list with a unique ID.
     */
    const handleAddVehicle = () => {
        const lastVehicleId =
            vehicleListState[0].length > 0 ? vehicleListState[0][vehicleListState[0].length - 1].vehicleId : 0;
        const newVehicle: Vehicle = {
            vehicleId: (lastVehicleId ?? 0) + 1, // Increment the last vehicle's ID
            // Add other default properties for a new vehicle here
        };
        vehicleListState[1]((prevVehicles) => [...prevVehicles, newVehicle]);
    };

    /**
     * Deletes a vehicle from the list.
     * @param {number} vehicleId - The ID of the vehicle to delete.
     */
    const onDelete = async (vehicleId: number) => {
        console.log('Deleting vehicle with ID:', vehicleId);
        // await apiDeleteVehicle(vehicleId); // Uncomment to integrate with API.
    };

    return (
        <>
            <h2>Vehicles</h2>
            <CollapseWrapper>
                <Container>
                    <ListGroup>
                        {/* Render each vehicle in the list */}
                        {vehicleListState[0].map((vehicle: Vehicle) => (
                            <ListGroup.Item key={`vehicle-${vehicle.vehicleId}`}>
                                <VehicleEntry
                                    vehicle={vehicle}
                                    vehicleListState={vehicleListState}
                                    onDelete={onDelete}
                                />
                            </ListGroup.Item>
                        ))}
                        {/* Button to add a new vehicle */}
                        <ListGroup.Item>
                            <Button onClick={handleAddVehicle}>Add Vehicle</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Container>
            </CollapseWrapper>
        </>
    );
}
