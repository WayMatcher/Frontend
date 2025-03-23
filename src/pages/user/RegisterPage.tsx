import '@/pages/styles/RegisterPage.scss';

import { Button, Container } from 'react-bootstrap';
import { useState } from 'react';

import ProgressBar from 'react-bootstrap/ProgressBar';

import { StepsRegister } from '@/types/objects/User/form';

import { useNavigate } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

import User from '@/types/objects/User/dto';
import RegisterUser from '@/components/register/RegisterUser';
import Address from '@/types/objects/Address/dto';
import RegisterAddress from '@/components/register/RegisterAddress';
import Vehicle from '@/types/objects/Vehicle/dto';
import RegisterVehicle from '@/components/register/RegisterVehicle';

import RegisterSummary from '@/components/register/RegisterSummary';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<StepsRegister>(StepsRegister.USER);
    const isAuthenticated = useIsAuthenticated();

    const [user, setUser] = useState<(User & { password: string }) | null>(null);
    const [address, setAddress] = useState<Address | null>(null);
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);

    if (isAuthenticated) {
        return (
            <Container className='register-page'>
                <h1>Register</h1>
                <Container>
                    <h2>You are already logged in!</h2>
                    <Button variant='primary' onClick={() => navigate('/user')}>
                        Go to your profile
                    </Button>
                </Container>
            </Container>
        );
    }

    return (
        <Container className='register-page'>
            <h1>Register</h1>
            <ProgressBar now={currentStep * 25} />
            <Container>
                <RegisterUser step={[currentStep, setCurrentStep]} setUser={setUser} />
                <RegisterAddress step={[currentStep, setCurrentStep]} setAddress={setAddress} />
                <RegisterVehicle step={[currentStep, setCurrentStep]} setVehicle={setVehicle} />
                {user && address && vehicle && (
                    <RegisterSummary step={[currentStep, setCurrentStep]} register={{ user, address, vehicle }} />
                )}
            </Container>
        </Container>
    );
};

export default RegisterPage;
