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

import registerAPI from '../../api/register';
import APIResponse from '../../types/API';
import UserContext from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import User from '../../types/dto/User';
import ErrorModal from '../../components/ErrorModal';

export default function RegisterPage() {
    return (
        <RegisterProvider>
            <RegisterPageContent />
        </RegisterProvider>
    );
}

function RegisterPageContent() {
    const { registerUser, registerAddress, registerVehicle, step } = useContext(RegisterContext);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [currentStep, setCurrentstep] = useState<RegisterSteps>(RegisterSteps.USER);
    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    useEffect(() => {
        setCurrentstep(step);
    }, [step, currentStep, setCurrentstep]);

    const handleSubmit = async () => {
        if (!registerUser || !registerAddress || !registerVehicle) {
            console.warn("Missing data in registration form");
            return;
        }

        console.log(registerUser, registerAddress, registerVehicle);
        try {
            const registerResponse: APIResponse = await registerAPI(registerUser, registerAddress, registerVehicle);

            // Check if registration was successful
            if (registerResponse.succeeded === true) {
                setUser(registerUser as User); // Sets user context
                navigate('/'); // Navigates to Landing page if login was successful
            } else {
                setSubmissionError("Login Failed: " + registerResponse.message); // Sets error message if registration failed
                setShowErrorModal(true); // Shows error modal
            }

        } catch (err: unknown) {
            setSubmissionError("Unknown error occured: " + (err as Error).message);
            // Shows error modal
        }
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
    };

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
                    {currentStep === RegisterSteps.SUMMARY && <RegisterSummary handleSubmit={handleSubmit} />}
                    <br />
                </Container>
            </Container>
            <ErrorModal show={showErrorModal} handleClose={handleCloseErrorModal} >
                {submissionError}
            </ErrorModal>
            <br />
        </>
    );
}