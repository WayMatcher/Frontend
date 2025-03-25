import React, { useEffect, useState } from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import CollapseWrapper from '@/components/CollapseWrapper';
import Vehicle from '@/types/objects/Vehicle/dto';
import VehicleEntry from './RegisterVehicle';
import RegisterNavButtons from './RegisterButtons';

export default function RegisterVehicleList({
    setVehicleState,
    onComplete,
}: {
    setVehicleState: [Vehicle[], React.Dispatch<React.SetStateAction<Vehicle[]>>];
    onComplete: (isDone: boolean) => void;
}): React.ReactElement {
    useEffect(() => {
        if (setVehicleState[0].length > 0) {
            onComplete(true);
        }
    }, [setVehicleState, onComplete]);

    return (
        <>
            <h2>Vehicles</h2>
            <CollapseWrapper>
                <Container>
                    <ListGroup>
                        {setVehicleState[0].map((vehicle: Vehicle) => (
                            <ListGroup.Item key={`vehicle-${vehicle.id}`}>
                                <VehicleEntry vehicle={vehicle} vehicleListState={setVehicleState} />
                            </ListGroup.Item>
                        ))}
                        <ListGroup.Item>
                            <Button>Add Vehicle</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Container>
            </CollapseWrapper>
        </>
    );
}
