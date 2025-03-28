import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import Vehicle from '@/types/objects/Vehicle/dto';
import VehicleEntry from '@/components/vehicle/Vehicle';
import { apiGetVehicleList, apiSetVehicleList } from '@/api/endpoints/vehicle';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from '@/types/objects/User/dto';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import LoadingOverlay from '../LoadingOverlay';

export default function RegisterVehicleList(): React.ReactElement {
    const authUser = useAuthUser<User>();
    const [loading, setLoading] = useState<boolean>(true);
    const vehicleListState = useState<Vehicle[]>([]);
    const { showErrorModal } = useContext(ErrorModalContext);

    useEffect(() => {
        const fetchVehicleList = async () => {
            try {
                setLoading(true);
                const response = await apiGetVehicleList({ userId: authUser?.userId });
                vehicleListState[1](response.data);
            } catch (error: unknown) {
                if (error instanceof Error) showErrorModal(error.message);
                throw new Error('Failed to fetch vehicle list');
            } finally {
                setLoading(false);
            }
        };
        fetchVehicleList();
    }, []);

    const handleAddVehicle = () => {
        const lastVehicleId =
            vehicleListState[0].length > 0 ? vehicleListState[0][vehicleListState[0].length - 1].vehicleId : 0;
        const newVehicle: Vehicle = {
            vehicleId: (lastVehicleId ?? 0) + 1,
        };
        vehicleListState[1]((prevVehicles) => [...prevVehicles, newVehicle]);
    };

    const handleDeleteVehicle = async (vehicleId: number) => {
        try {
            await apiSetVehicleList({ vehicleList: vehicleListState[0] });
            vehicleListState[1]((prevVehicles) => prevVehicles.filter((vehicle) => vehicle.vehicleId !== vehicleId));
        } catch (error: unknown) {
            if (error instanceof Error) showErrorModal(error.message);
        }
    };

    return (
        <>
            <h2>Vehicles</h2>
            <LoadingOverlay isLoading={loading}>
                <Container>
                    <ListGroup>
                        {vehicleListState[0].map((vehicle: Vehicle) => (
                            <ListGroup.Item key={`vehicle-${vehicle.vehicleId}`}>
                                <VehicleEntry
                                    vehicle={vehicle}
                                    vehicleListState={vehicleListState}
                                    onDelete={handleDeleteVehicle}
                                />
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <Button onClick={handleAddVehicle}>Add Vehicle</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Container>
            </LoadingOverlay>
        </>
    );
}
