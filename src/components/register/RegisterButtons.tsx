import { Button, Col, ButtonGroup, Row } from 'react-bootstrap';
import { RegisterSteps } from '@/types/User/form';
import RegisterContext from '@/contexts/RegisterContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Props for the RegisterNavButtons component.
 *
 * @interface RegisterNavButtonsProps
 * @property {RegisterSteps} [prevStep] - The previous step in the registration process. Optional.
 * @property {RegisterSteps} [nextStep] - The next step in the registration process. Optional.
 */
interface RegisterNavButtonsProps {
    prevStep?: RegisterSteps | undefined;
    nextStep?: RegisterSteps | undefined;
}

const ButtonsRegister = (prevStep: RegisterSteps, setStep: (step: RegisterSteps) => void) => {
    const { registerUser, registerAddress, registerVehicle } = useContext(RegisterContext);
    if (!registerUser || !registerAddress || !registerVehicle) return <></>;
    return (
        <>
            <Button type='button' variant='secondary' onClick={() => setStep(prevStep)}>
                Previous
            </Button>
            <Button type='submit'>Register</Button>
        </>
    );
};

const ButtonsNext = () => {
    return (
        <>
            <Button type='button' variant='secondary' disabled={true}>
                Previous
            </Button>
            <Button type='submit'>Next</Button>
        </>
    );
};

const ButtonsPrev = (prevStep: RegisterSteps, setStep: (step: RegisterSteps) => void) => {
    return (
        <>
            <Button type='button' variant='secondary' onClick={() => setStep(prevStep)}>
                Previous
            </Button>
            <Button type='submit'>Submit</Button>
        </>
    );
};

const Buttons = (prevStep: RegisterSteps, setStep: (step: RegisterSteps) => void) => {
    return (
        <>
            <Button type='button' variant='secondary' onClick={() => setStep(prevStep)}>
                Previous
            </Button>
            <Button type='submit'>Next</Button>
        </>
    );
};

export default function RegisterNavButtons({ prevStep, nextStep }: RegisterNavButtonsProps) {
    const { setRegisterUser, setRegisterAddress, setRegisterVehicle, setStep } = useContext(RegisterContext);
    const navigate = useNavigate();

    const cancel = () => {
        setRegisterAddress(null);
        setRegisterUser(null);
        setRegisterVehicle(null);
        navigate('/');
    };

    let buttons;
    if (prevStep === RegisterSteps.VEHICLE) {
        buttons = ButtonsRegister(prevStep, setStep);
    } else if (prevStep && nextStep) {
        buttons = Buttons(prevStep, setStep);
    } else if (prevStep && !nextStep) {
        buttons = ButtonsPrev(prevStep, setStep);
    } else if (!prevStep && nextStep) {
        buttons = ButtonsNext();
    }

    return (
        <>
            <br />
            <Row>
                <Col>
                    <ButtonGroup>
                        <Button onClick={cancel} variant='secondary'>
                            Cancel
                        </Button>
                        {buttons}
                    </ButtonGroup>
                </Col>
            </Row>
        </>
    );
}
