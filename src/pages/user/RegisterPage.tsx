import '../../styles/RegisterPage.scss';
import { Container, Button, ButtonGroup } from 'react-bootstrap';
import { useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import RegisterUser from './register/RegisterUser';
import RegisterAddress from './register/RegisterAddress';
import RegisterVehicle from './register/RegisterVehicle';

import { RegisterProvider } from '../../contexts/RegisterContext';
import RegisterSteps from '../../types/RegisterSteps';

export default function RegisterPage() {


    const isCompleted = steps.registerSteps.every(step => step.isValid === true);

    const currentStep = steps.registerSteps.find(step => step.isValid === false)?.step || 3;

    const handleNext = () => {
        setSteps(prevSteps => {
            const nextStep = prevSteps.currentStep + 1;
            return {
                ...prevSteps,
                currentStep: nextStep,
                registerSteps: prevSteps.registerSteps.map(step =>
                    step.stepNumber === nextStep ? { ...step, isValid: true } : step
                )
            };
        });
    };

    const handlePrevious = () => {
        setSteps(prevSteps => {
            const previousStep = prevSteps.currentStep - 1;
            return {
                ...prevSteps,
                currentStep: previousStep,
                registerSteps: prevSteps.registerSteps.map(step =>
                    step.stepNumber === previousStep ? { ...step, isValid: false } : step
                )
            };
        });
    };

    const setStepValidity = (stepNumber: number, isValid: boolean): void => {
        setSteps();
    };

    const [steps, setSteps] = useState<RegisterSteps>({
        registerSteps:
            [
                { stepNumber: 1, isValid: false },
                { stepNumber: 2, isValid: false },
                { stepNumber: 3, isValid: false },
            ],
        isCompleted: false,
        currentStep: 1,
        handleNext: () => { },
        handlePrevious: () => { },
        setStepValidity: setStepValidity
    });

    return (
        <>
            <Container className="register-page">
                <h1>Register</h1>
                <ProgressBar now={currentStep * (1 / 3) * 100} />
                <Container>
                    <br />
                    <RegisterProvider>
                        {currentStep === 1 && <RegisterUser steps={steps} />}
                        {currentStep === 2 && <RegisterAddress steps={steps} />}
                        {currentStep === 3 && <RegisterVehicle steps={steps} />}
                    </RegisterProvider>
                    <br />
                </Container>
                <ButtonGroup>
                    <Button onClick={handlePrevious} disabled={currentStep === 1} variant='secondary'>Previous</Button>
                    <Button onClick={handleNext} disabled={currentStep === 3}>Next</Button>
                </ButtonGroup>
            </Container>
            <br />
        </>
    )
}