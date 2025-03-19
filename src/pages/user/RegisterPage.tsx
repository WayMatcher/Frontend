import '@/styles/RegisterPage.scss';

import { Container } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';

import ProgressBar from 'react-bootstrap/ProgressBar';
import RegisterUser from '@/components/register/RegisterUser';
import RegisterAddress from '@/components/register/RegisterAddress';
import RegisterVehicle from '@/components/register/RegisterVehicle';
import RegisterSummary from '@/components/register/RegisterSummary';
import RegisterContext, { RegisterProvider } from '@/types/contexts/RegisterContext';
import { RegisterSteps } from '@/types/User/form';
import { apiRegisterUser } from '@/types/User/api';
import { useNavigate } from 'react-router-dom';
import ErrorModal from '@/components/ErrorModal';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';

export default function RegisterPage() {
    return (
        <RegisterProvider>
            <RegisterPageContent />
        </RegisterProvider>
    );
}

function RegisterPageContent() {
    const { registerUser, registerAddress, registerVehicle, step } = useContext(RegisterContext);
    const navigate = useNavigate();
    const [currentStep, setCurrentstep] = useState<RegisterSteps>(RegisterSteps.USER);
    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
        setCurrentstep(step);
    }, [step, currentStep, setCurrentstep]);

    const handleSubmit = async () => {
        if (!registerUser || !registerAddress || !registerVehicle) {
            console.warn('Missing data in registration form');
            return;
        }

        try {
            await apiRegisterUser({
                user: registerUser,
                address: registerAddress,
                vehicle: registerVehicle,
                password: registerUser.password,
            });
            navigate('/user/login');
        } catch (err: unknown) {
            setSubmissionError('An error occured: ' + (err as Error).message);
            setShowErrorModal(true); // Shows error modal
        }
    };
    if (isAuthenticated) {
        return (
            <>
                <Container className='register-page'>
                    <h1>Register</h1>
                    <Container>
                        <br />
                        <h2>You are already registered</h2>
                        <br />
                    </Container>
                </Container>
                <ErrorModal
                    show={showErrorModal}
                    handleClose={() => {
                        setShowErrorModal(false);
                    }}
                >
                    {submissionError}
                </ErrorModal>
                <br />
            </>
        );
    } else {
        return (
            <>
                <Container className='register-page'>
                    <h1>Register</h1>
                    <ProgressBar now={step * (1 / 4) * 100} />
                    <Container>
                        <br />
                        {currentStep === RegisterSteps.USER && <RegisterUser />}
                        {currentStep === RegisterSteps.ADDRESS && <RegisterAddress />}
                        {currentStep === RegisterSteps.VEHICLE && <RegisterVehicle />}
                        {currentStep === RegisterSteps.SUMMARY && <RegisterSummary handleSubmit={handleSubmit} />}
                        <br />
                    </Container>
                </Container>
                <ErrorModal
                    show={showErrorModal}
                    handleClose={() => {
                        setShowErrorModal(false);
                    }}
                >
                    {submissionError}
                </ErrorModal>
                <br />
            </>
        );
    }
}
