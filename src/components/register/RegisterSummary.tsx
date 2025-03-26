import { Button, Col, Row } from 'react-bootstrap';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CollapseWrapper from '@/components/CollapseWrapper';
import User from '@/types/objects/User/dto';
import Address from '@/types/objects/Address/dto';
import Vehicle from '@/types/objects/Vehicle/dto';
import { apiRegisterUser } from '@/api/endpoints/user';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import LoadingOverlay from '../LoadingOverlay';

export default function RegisterSummary({
    register,
}: {
    register: { user: User & { password: string }; address: Address; vehicleList: Vehicle[] };
}): React.ReactElement {
    const navigate = useNavigate();
    const { showErrorModal, showAlert } = useContext(ErrorModalContext);
    const { user, address, vehicleList } = register;
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        const { password, ...tempUser } = user;
        try {
            setIsLoading(true);
            await apiRegisterUser({
                user: {
                    ...tempUser,
                    address: address,
                },
                vehicleList,
                password: password,
            });
            setIsLoading(false);
            showAlert('User registered successfully!', 'success');
            navigate('/');
        } catch (error: unknown) {
            if (error instanceof Error) showErrorModal('An error occurred: ' + (error as Error).message);
        }
    };

    return (
        <>
            <h2>Summary</h2>
            <CollapseWrapper>
                <LoadingOverlay isLoading={isLoading}>
                    <Row className='mb-3'>
                        <Col>
                            <h3>User</h3>
                            <p>Username: {user.username}</p>
                            <p>Email: {user.email}</p>
                            <p>
                                Name: {user.firstname} {user.name}
                            </p>
                            <p>Additional Description: {user.additionalDescription}</p>
                            <p>Telephone: {user.telephone}</p>
                        </Col>
                    </Row>
                    <Row className='mb-3'>
                        <Col>
                            <h3>Address</h3>
                            <p>Street: {address.street}</p>
                            <p>Postal Code: {address.postalcode}</p>
                            <p>Region: {address.region}</p>
                            <p>Country: {address.country}</p>
                            <p>State: {address.state}</p>
                        </Col>
                    </Row>
                    {vehicleList.length > 0 && (
                        <Row className='mb-3'>
                            <Col>
                                <h3>Vehicles</h3>
                                {vehicleList.map((vehicle) => (
                                    <p key={`vehicle-${vehicle.vehicleId}`}>
                                        Make: {vehicle.manufacturerName}, Model: {vehicle.model}, Year:{' '}
                                        {vehicle.yearOfManufacture}, Seats:
                                        {vehicle.seats}, License Plate: {vehicle.licensePlate}
                                    </p>
                                ))}
                            </Col>
                        </Row>
                    )}
                    <Button onClick={handleSubmit}>Submit</Button>
                </LoadingOverlay>
            </CollapseWrapper>
        </>
    );
}
