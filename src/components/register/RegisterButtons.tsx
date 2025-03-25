import { Button, Col, ButtonGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function RegisterNavButtons({
    doneStates,
}: {
    doneStates: { user: boolean; address: boolean; vehicle: boolean };
}) {
    const navigate = useNavigate();

    const cancel = () => {
        navigate('/');
    };

    const buttonLabels: Record<string, string> = {
        '/register/user': 'Next: Address',
        '/register/address': 'Next: Vehicles',
        '/register/vehicles': 'Finish Registration',
    };

    const currentPath = window.location.pathname;
    const buttonVariant = currentPath === '/register/vehicles' ? 'success' : 'primary';

    const buttons = buttonLabels[currentPath] ? (
        <Button type='submit' variant={buttonVariant}>
            {buttonLabels[currentPath]}
        </Button>
    ) : null;

    return (
        <>
            <br />
            <Row>
                <Col>
                    <ButtonGroup>
                        <Button onClick={cancel} variant='danger'>
                            Cancel
                        </Button>
                        <Button
                            variant='secondary'
                            disabled={currentPath === '/register/user'}
                            onClick={() => navigate(-1)}
                        >
                            Back
                        </Button>
                        {buttons}
                    </ButtonGroup>
                </Col>
            </Row>
        </>
    );
}
