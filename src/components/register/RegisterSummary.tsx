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

/**
 * Component to display a summary of the registration details and handle user registration.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.register - Registration data containing user, address, and vehicle list.
 * @param {User & { password: string }} props.register.user - User details including password.
 * @param {Address} props.register.address - Address details.
 * @param {Vehicle[]} props.register.vehicleList - List of vehicles.
 * @returns {React.ReactElement} The rendered component.
 */
export default function RegisterSummary({
    register,
}: {
    register: { user: User & { password: string }; address: Address; vehicleList: Vehicle[] };
}): React.ReactElement {
    const navigate = useNavigate();
    const { showErrorModal, showAlert } = useContext(ErrorModalContext);
    const { user, address, vehicleList } = register;
    const [loading, setLoading] = useState<boolean>(false);

    /**
     * Handles the submission of the registration data.
     * Sends the data to the API and provides feedback to the user.
     */
    const handleSubmit = async () => {
        const { password, profilePicture, ...tempUser } = user; // Exclude profilePicture from user data
        try {
            setLoading(true);
            await apiRegisterUser({
                user: {
                    ...tempUser, // Include only allowed user properties
                    address: address, // Attach address to user
                },
                vehicleList: vehicleList.map(({ vehicleId, ...vehicle }) => vehicle), // Exclude vehicleId from each vehicle
                password: password, // Explicitly include password
            });
            setLoading(false);
            showAlert('User registered successfully!', 'success'); // Show success alert
            navigate('/'); // Redirect to home page
        } catch (error: unknown) {
            if (error instanceof Error) {
                showErrorModal('An error occurred: ' + error.message); // Show error modal
            }
            setLoading(false);
            throw new Error('Failed to register user'); // Throw error for debugging
        }
    };

    return (
        <>
            <h2>Summary</h2>
            <CollapseWrapper>
                <LoadingOverlay isLoading={loading}>
                    {/* Display user details */}
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
                    {/* Display address details */}
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
                    {/* Display vehicle details if any */}
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
                    {/* Submit button */}
                    <Button onClick={handleSubmit}>Submit</Button>
                </LoadingOverlay>
            </CollapseWrapper>
        </>
    );
}
