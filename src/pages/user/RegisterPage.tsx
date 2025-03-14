import '../../styles/RegisterPage.scss';

import { Container } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';

import ProgressBar from 'react-bootstrap/ProgressBar';
import RegisterUser from '../../components/register/RegisterUser';
import RegisterAddress from '../../components/register/RegisterAddress';
import RegisterVehicle from '../../components/register/RegisterVehicle';
import RegisterSummary from '../../components/register/RegisterSummary';

import RegisterContext, { RegisterProvider } from '../../contexts/RegisterContext';

import RegisterSteps from '../../types/RegisterSteps';

export default function RegisterPage() {
    return (
        <RegisterProvider>
            <RegisterPageContent />
        </RegisterProvider>
    );
}

function RegisterPageContent() {
    const { step } = useContext(RegisterContext);
    const [currentStep, setCurrentstep] = useState<RegisterSteps>(RegisterSteps.USER);

    useEffect(() => {
        setCurrentstep(step);
    }, [step, currentStep, setCurrentstep]);

    return (
        <>
            <Container className="register-page">
                <h1>Register</h1>
                <ProgressBar now={step * (1 / 4) * 100} />
                <Container>
                    <br />
                    {currentStep === RegisterSteps.USER && <RegisterUser />}
                    {currentStep === RegisterSteps.ADDRESS && <RegisterAddress />}
                    {currentStep === RegisterSteps.VEHICLE && <RegisterVehicle />}
                    {currentStep === RegisterSteps.SUMMARY && <RegisterSummary />}
                    <br />
                </Container>
            </Container>
            <br />
        </>
    );
}