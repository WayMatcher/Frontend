import React, { useEffect } from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import CollapseWrapper from '@/components/CollapseWrapper';
import Vehicle from '@/types/objects/Vehicle/dto';
import VehicleEntry from '@/components/vehicle/Vehicle';
import { useNavigate } from 'react-router-dom';

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
    if (done.user === false && done.address === false) {
        navigate('/register/user');
    } else if (done.user === true && done.address === false) {
        navigate('/register/address');
    }

    useEffect(() => {
        if (vehicleListState[0].length > 0) {
            done.onComplete(true);
        }
    }, [vehicleListState, done.onComplete]);

    const handleAddVehicle = () => {
        const lastVehicleId =
            vehicleListState[0].length > 0 ? vehicleListState[0][vehicleListState[0].length - 1].vehicleId : 0;
        const newVehicle: Vehicle = {
            vehicleId: (lastVehicleId ?? 0) + 1, // Increment the last vehicle's ID
            // Add other default properties for a new vehicle here
        };
        vehicleListState[1]((prevVehicles) => [...prevVehicles, newVehicle]);
    };

    const onDelete = async (vehicleId: number) => {
        console.log('Deleting vehicle with ID:', vehicleId);
        // Call your API to delete the vehicle here
        // await apiDeleteVehicle(vehicleId);
    };

    return (
        <>
            <h2>Vehicles</h2>
            <CollapseWrapper>
                <Container>
                    <ListGroup>
                        {vehicleListState[0].map((vehicle: Vehicle) => (
                            <ListGroup.Item key={`vehicle-${vehicle.vehicleId}`}>
                                <VehicleEntry
                                    vehicle={vehicle}
                                    vehicleListState={vehicleListState}
                                    onDelete={onDelete}
                                />
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <Button onClick={handleAddVehicle}>Add Vehicle</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Container>
            </CollapseWrapper>
        </>
    );
}
