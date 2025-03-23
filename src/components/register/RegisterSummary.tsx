import { Col, Container, Row } from 'react-bootstrap';
import React, { useContext } from 'react';
import CollapseWrapper from '@/components/CollapseWrapper';
import RegisterButtons from '@/components/register/RegisterButtons';
import { StepsRegister } from '@/types/objects/User/form';
import User from '@/types/objects/User/dto';
import Address from '@/types/objects/Address/dto';
import Vehicle from '@/types/objects/Vehicle/dto';
import { Formik, Form as FormikForm } from 'formik';
import { apiRegisterUser } from '@/api/endpoints/user';
import { useNavigate } from 'react-router-dom';
import ErrorModalContext from '@/contexts/ErrorModalContext';

export default function RegisterSummary({
    step,
    register,
}: {
    step: [StepsRegister, React.Dispatch<React.SetStateAction<StepsRegister>>];
    register: { user: User & { password: string }; address: Address; vehicle: Vehicle };
}): React.ReactElement {
    const navigate = useNavigate();
    const { showErrorModal } = useContext(ErrorModalContext);
    const { user, address, vehicle } = register;
    const [_, setStep] = step;

    const handleSubmit = async ({
        user,
        address,
        vehicle,
    }: {
        user: User & { password: string };
        address: Address;
        vehicle: Vehicle;
    }) => {
        try {
            await apiRegisterUser({
                user: { ...user, address },
                vehicle,
                password: user.password,
            });
            navigate('/user/login');
        } catch (error: unknown) {
            if (error instanceof Error) showErrorModal('An error occurred: ' + (error as Error).message);
        }
    };

    return (
        <>
            <h2>Summary</h2>
            <CollapseWrapper>
                <Container>
                    <Formik initialValues={{ user, address, vehicle }} onSubmit={handleSubmit}>
                        {() => (
                            <FormikForm>
                                <Row className='mb-3'>
                                    <Col>
                                        <h3>User</h3>
                                        <p>Username: {user.username}</p>
                                        <p>Email: {user.email}</p>
                                        <p>
                                            Name: {user.firstName} {user.name}
                                        </p>
                                        <p>Additional Description: {user.additional_description}</p>
                                        <p>Telephone: {user.telephone}</p>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col>
                                        <h3>Address</h3>
                                        <p>Street: {address.street}</p>
                                        <p>Postal Code: {address.postal_code}</p>
                                        <p>Region: {address.region}</p>
                                        <p>Country: {address.country}</p>
                                        <p>State: {address.state}</p>
                                    </Col>
                                </Row>
                                <Row className='mb-3'>
                                    <Col>
                                        <h3>Vehicle</h3>
                                        <p>Make: {vehicle.make}</p>
                                        <p>Model: {vehicle.model}</p>
                                        <p>Year: {vehicle.year}</p>
                                        <p>Seats: {vehicle.seats}</p>
                                        <p>License Plate: {vehicle.license_plate}</p>
                                    </Col>
                                </Row>
                                <RegisterButtons prevStep={StepsRegister.VEHICLE} setStep={setStep} />
                            </FormikForm>
                        )}
                    </Formik>
                </Container>
            </CollapseWrapper>
        </>
    );
}
