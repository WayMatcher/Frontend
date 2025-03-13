import '../../styles/RegisterPage.scss';
import { Container, Form, Button, ButtonGroup, InputGroup, Col, Row } from 'react-bootstrap';
import { UserRegister } from '../../types/dto/User';
import React, { useContext, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { RegisterUser } from './register/RegisterUser';
import { RegisterAddress } from './register/RegisterAddress';
import { RegisterVehicle } from './register/RegisterVehicle';
import { RegisterUserSchema, RegisterAddressSchema, RegisterVehicleSchema } from '../../formValidations';
import { RegisterUserInitialValues, RegisterAddressInitialValues, RegisterVehicleInitialValues } from '../../formInitialValues';

import { RegisterProvider } from '../../contexts/RegisterContext';

export default function RegisterPage() {

    const registerContext = React.Context<UserRegister | undefined>(undefined);

    return (
        <>
            <Container className="register-page">
                <h1>Register</h1>
                <RegisterProvider>
                    <RegisterUser />
                    <ProgressBar now={33} />
                    <RegisterAddress />
                    <ProgressBar now={66} />
                    <RegisterVehicle />
                    <ProgressBar now={100} />
                </RegisterProvider>
            </Container>
            <br />
        </>
    )
}