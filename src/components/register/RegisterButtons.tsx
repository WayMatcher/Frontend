import { JSX } from 'react';
import { Button, ButtonGroup, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/**
 * Component for rendering navigation buttons and tabs for the registration process.
 * @param {Object} props - Component props.
 * @param {Object} props.doneStates - Object indicating the completion state of each registration step.
 * @param {boolean} props.doneStates.user - Indicates if the user step is completed.
 * @param {boolean} props.doneStates.address - Indicates if the address step is completed.
 * @param {boolean} props.doneStates.vehicle - Indicates if the vehicle step is completed.
 * @param {JSX.Element} props.children - Child components to render between navigation and buttons.
 * @returns {JSX.Element} The rendered component.
 */
export default function RegisterNavigation({
    doneStates,
    children,
}: {
    doneStates: { user: boolean; address: boolean; vehicle: boolean };
    children: JSX.Element;
}) {
    const navigate = useNavigate();

    /**
     * Navigates to the home page when the cancel button is clicked.
     */
    const cancel = () => {
        navigate('/');
    };

    // Get the current path from the browser's location.
    const currentPath = window.location.pathname;

    /**
     * Determines the next path in the registration process based on the current path.
     * @returns {string} The next path.
     */
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

    /**
     * Determines the previous path in the registration process based on the current path.
     * @returns {string} The previous path.
     */
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

    /**
     * Checks if the current step in the registration process is completed.
     * @returns {boolean} True if the current step is completed, false otherwise.
     */
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
            {/* Navigation tabs for each registration step */}
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
                        disabled={!doneStates.user} // Disable if the user step is not completed
                    >
                        Address
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => navigate('/register/vehicles')}
                        eventKey='/register/vehicles'
                        active={currentPath.includes('/register/vehicles')}
                        disabled={!doneStates.address} // Disable if the address step is not completed
                    >
                        Vehicles
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => navigate('/register/summary')}
                        eventKey='/register/summary'
                        active={currentPath.includes('/register/summary')}
                        disabled={!doneStates.vehicle || !doneStates.address || !doneStates.user} // Disable if any prior step is not completed
                    >
                        Summary
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <br />
            {/* Render child components */}
            {children}
            <br />
            {/* Navigation buttons */}
            <ButtonGroup>
                <Button onClick={cancel} variant='danger'>
                    Cancel
                </Button>
                <Button
                    variant='primary'
                    disabled={currentPath.includes('/register/user')} // Disable if on the first step
                    onClick={() => navigate(previousPath())}
                >
                    Previous
                </Button>
                <Button
                    variant='primary'
                    disabled={currentPath.includes('/register/summary') || !checkIfStepIsDone()} // Disable if on the last step or current step is not completed
                    onClick={() => navigate(nextPath())}
                >
                    Next
                </Button>
            </ButtonGroup>
        </>
    );
}
