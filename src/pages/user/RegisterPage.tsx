import '../../styles/RegisterPage.scss';
import { Container } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import RegisterUser from '../../components/register/RegisterUser';
import RegisterAddress from '../../components/register/RegisterAddress';
import RegisterVehicle from '../../components/register/RegisterVehicle';
import RegisterContext, { RegisterProvider } from '../../contexts/RegisterContext';

export default function RegisterPage() {
    return (
        <RegisterProvider>
            <RegisterPageContent />
        </RegisterProvider>
    );
}

function RegisterPageContent() {
    const { step } = useContext(RegisterContext);
    const [currentStep, setCurrentstep] = useState<number>(1);

    useEffect(() => {
        setCurrentstep(step);
        console.log("Current Step: ", currentStep);
    }, [step, currentStep, setCurrentstep]);

    return (
        <>
            <Container className="register-page">
                <h1>Register</h1>
                <ProgressBar now={step * (1 / 3) * 100} />
                <Container>
                    <br />
                    {currentStep === 1 && <RegisterUser />}
                    {currentStep === 2 && <RegisterAddress />}
                    {currentStep === 3 && <RegisterVehicle />}
                    <br />
                </Container>
            </Container>
            <br />
        </>
    );
}