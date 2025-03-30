import useSignOut from 'react-auth-kit/hooks/useSignOut';
import './styles/NavBar.scss';
import { NavDropdown, Navbar, Nav, Container, ButtonGroup, Button, Offcanvas, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import User from '@/types/objects/User/dto';
import { useEffect, useState } from 'react';
import { apiGetInbox } from '@/api/endpoints/inbox';
import Notification from '@/types/objects/Notification/dto';
export default function NavBar() {
    const signOut = useSignOut();
    const authUser = useAuthUser<User>();
    const isAuthenticated = useIsAuthenticated();
    const navigate = useNavigate();
    const [inbox, setInbox] = useState<Notification[]>([]);
    const [notificationCount, setNotificationCount] = useState<number>(0);

    useEffect(() => {
        const getNotifications = async () => {
            if (isAuthenticated) {
                const response = await apiGetInbox({ userId: authUser?.userId });
                if (response.data) setInbox(response.data);
            }
        };

        getNotifications();
    }, [isAuthenticated]);

    useEffect(() => {
        setNotificationCount(inbox.filter((notification) => !notification.read).length);
    }, [inbox]);

    return (
        <Navbar className='bg-body-tertiary mb-3' expand='lg'>
            <Container fluid>
                <Navbar.Brand
                    onClick={() => {
                        navigate('/');
                    }}
                >
                    WayMatcher
                </Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement='end'
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>WayMatcher</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className='me-auto'>
                            <Link to='/' className='nav-link'>
                                Home
                            </Link>
                            <Link to='/events' className='nav-link'>
                                Ways
                            </Link>
                            {isAuthenticated && (
                                <Link to='/events?filter=owned' className='nav-link'>
                                    Matches
                                </Link>
                            )}
                        </Nav>
                        <Nav>
                            {isAuthenticated ? (
                                <>
                                    <NavDropdown
                                        title={<span className='bi bi-plus-lg'> Create New Way</span>}
                                        className='justify-content-end'
                                    >
                                        <NavDropdown.Item
                                            onClick={() => navigate('/events/new/?ispilot=true')}
                                            eventKey='2'
                                        >
                                            <span className='bi bi-car-front-fill'> New Pilot Way</span>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={() => navigate('/events/new/?ispassenger=true')}
                                            eventKey='1'
                                        >
                                            <span className='bi bi-person-fill'> New Passenger Way</span>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <div className='vr' />
                                    <NavDropdown
                                        title={authUser?.username}
                                        id='user-options-dropdown'
                                        aria-label='User Options'
                                        className='justify-content-end'
                                    >
                                        <NavDropdown.Item
                                            onClick={() => {
                                                navigate(`/profile/${authUser?.username}/edit`);
                                            }}
                                            aria-label='Edit Profile'
                                        >
                                            Edit Profile
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={() => {
                                                navigate(`/events?filter=owned`);
                                            }}
                                            aria-label='My Matches'
                                        >
                                            My Ways
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item
                                            onClick={() => {
                                                signOut();
                                                navigate('/login');
                                            }}
                                            aria-label='Logout'
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    <Link to='/inbox' className='nav-link'>
                                        <Badge>
                                            <span className={'bi bi-inbox-fill'}> {notificationCount}</span>
                                        </Badge>
                                    </Link>
                                </>
                            ) : (
                                <ButtonGroup>
                                    <Button className='btn btn-primary' onClick={() => navigate('/login')}>
                                        Login
                                    </Button>
                                    <Button className='btn btn-secondary' onClick={() => navigate('/register')}>
                                        Register
                                    </Button>
                                </ButtonGroup>
                            )}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}
