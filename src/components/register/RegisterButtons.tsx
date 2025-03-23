import { Button, Col, ButtonGroup, Row } from 'react-bootstrap';
import { StepsRegister } from '@/types/objects/User/form';
import { useNavigate } from 'react-router-dom';

/**
 * Props for the RegisterNavButtons component.
 *
 * @interface RegisterNavButtonsProps
 * @property {StepsRegister} [prevStep] - The previous step in the registration process. Optional.
 * @property {StepsRegister} [nextStep] - The next step in the registration process. Optional.
 */
interface RegisterNavButtonsProps {
    prevStep?: StepsRegister | undefined;
    nextStep?: StepsRegister | undefined;
    setStep: (step: StepsRegister) => void;
}

const ButtonsRegister = (prevStep: StepsRegister, setStep: (step: StepsRegister) => void) => {
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

const ButtonsPrev = (prevStep: StepsRegister, setStep: (step: StepsRegister) => void) => {
    return (
        <>
            <Button type='button' variant='secondary' onClick={() => setStep(prevStep)}>
                Previous
            </Button>
            <Button type='submit'>Submit</Button>
        </>
    );
};

const Buttons = (prevStep: StepsRegister, setStep: (step: StepsRegister) => void) => {
    return (
        <>
            <Button type='button' variant='secondary' onClick={() => setStep(prevStep)}>
                Previous
            </Button>
            <Button type='submit'>Next</Button>
        </>
    );
};

export default function RegisterNavButtons({ prevStep, nextStep, setStep }: RegisterNavButtonsProps) {
    const navigate = useNavigate();

    const cancel = () => {
        navigate('/');
    };

    let buttons;
    if (prevStep === StepsRegister.VEHICLE) {
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
