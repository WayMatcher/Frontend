import { JSX } from 'react';
import { Button, ButtonGroup, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function RegisterNavigation({
    doneStates,
    children,
}: {
    doneStates: { user: boolean; address: boolean; vehicle: boolean };
    children: JSX.Element;
}) {
    const navigate = useNavigate();

    const cancel = () => {
        navigate('/');
    };

    const currentPath = window.location.pathname;

    const nextPath = () => {
        if (currentPath.includes('/register/user')) {
            return '/register/address';
        } else if (currentPath.includes('/register/address')) {
            return '/register/vehicles';
        } else if (currentPath.includes('/register/vehicles')) {
            return '/register/summary';
        } else {
            return '';
        }
    };

    const previousPath = () => {
        if (currentPath.includes('/register/summary')) {
            return '/register/vehicles';
        }
        if (currentPath.includes('/register/vehicles')) {
            return '/register/address';
        }
        if (currentPath.includes('/register/address')) {
            return '/register/user';
        }
        return '';
    };

    const checkIfStepIsDone = () => {
        if (currentPath.includes('/register/user')) {
            return doneStates.user;
        }
        if (currentPath.includes('/register/address')) {
            return doneStates.address;
        }
        if (currentPath.includes('/register/vehicles')) {
            return doneStates.vehicle;
        }
        return false;
    };

    return (
        <>
            <br />
            <Nav fill variant='tabs' defaultActiveKey='/register/user'>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => navigate('/register/user')}
                        eventKey='/register/user'
                        active={currentPath.includes('/register/user')}
                    >
                        User
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => navigate('/register/address')}
                        eventKey='/register/address'
                        active={currentPath.includes('/register/address')}
                        disabled={!doneStates.user}
                    >
                        Address
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => navigate('/register/vehicles')}
                        eventKey='/register/vehicles'
                        active={currentPath.includes('/register/vehicles')}
                        disabled={!doneStates.address}
                    >
                        Vehicles
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => navigate('/register/summary')}
                        eventKey='/register/summary'
                        active={currentPath.includes('/register/summary')}
                        disabled={!doneStates.vehicle || !doneStates.address || !doneStates.user}
                    >
                        Summary
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <br />
            {children}
            <br />
            <ButtonGroup>
                <Button onClick={cancel} variant='danger'>
                    Cancel
                </Button>
                <Button
                    variant='primary'
                    disabled={currentPath.includes('/register/user')}
                    onClick={() => navigate(previousPath())}
                >
                    Previous
                </Button>
                <Button
                    variant='primary'
                    disabled={currentPath.includes('/register/summary') || !checkIfStepIsDone()}
                    onClick={() => navigate(nextPath())}
                >
                    Next
                </Button>
            </ButtonGroup>
        </>
    );
}
