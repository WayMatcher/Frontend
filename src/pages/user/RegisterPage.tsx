import '@/pages/styles/RegisterPage.scss';

import { Container } from 'react-bootstrap';
import { useContext, useState } from 'react';

import ProgressBar from 'react-bootstrap/ProgressBar';

import { StepsRegister } from '@/types/objects/User/form';
import { apiRegisterUser } from '@/api/endpoints/user';
import { useNavigate } from 'react-router-dom';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import ErrorModalContext from '@/contexts/ErrorModalContext';

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
    const { showErrorModal } = useContext(ErrorModalContext);
    const isAuthenticated = useIsAuthenticated();

    const [user, setUser] = useState<User | null>(null);
    const [address, setAddress] = useState<Address | null>(null);
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);

    const handleSubmit = async () => {
        if (!user || !address || !vehicle) {
            console.warn('Missing data in registration form');
            return;
        }

        try {
            await apiRegisterUser({
                user: { ...user, address },
                vehicle,
                password: user.password,
            });
            navigate('/user/login');
        } catch (err: unknown) {
            showErrorModal('An error occurred: ' + (err as Error).message);
        }
    };

    if (isAuthenticated) {
        return (
            <Container className='register-page'>
                <h1>Register</h1>
                <Container>
                    <h2>You are already logged in!</h2>
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
                <RegisterSummary step={[currentStep, setCurrentStep]} handleSubmit={handleSubmit} />
            </Container>
        </Container>
    );
};

export default RegisterPage;
