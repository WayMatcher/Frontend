import useSignOut from 'react-auth-kit/hooks/useSignOut';
import '@/components/_styles/NavBar.scss';
import { NavDropdown, Navbar, Nav, Container, ButtonGroup, Button, Offcanvas, Badge, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated';
import User from '@/types/objects/User/dto';
import { useEffect, useState } from 'react';
import { apiGetInbox } from '@/api/endpoints/inbox';
import Notification from '@/types/objects/Notification/dto';
import brandImgUrl from './WayMatcher-Logo-NoText-Transparent.png';

/**
 * NavBar component that provides navigation and user interaction options.
 * Includes links, dropdowns, and user-specific actions like login/logout.
 */
export default function NavBar() {
    const signOut = useSignOut(); // Hook to handle user sign-out
    const authUser = useAuthUser<User>(); // Hook to get authenticated user details
    const isAuthenticated = useIsAuthenticated(); // Hook to check if the user is authenticated
    const navigate = useNavigate(); // Hook to programmatically navigate between routes
    const [inbox, setInbox] = useState<Notification[]>([]); // State to store notifications
    const [notificationCount, setNotificationCount] = useState<number>(0); // State to store unread notification count

    /**
     * Fetches notifications for the authenticated user.
     * Runs on component mount and when `isAuthenticated` changes.
     */
    useEffect(() => {
        const getNotifications = async () => {
            if (isAuthenticated) {
                const response = await apiGetInbox({ userId: authUser?.userId });
                if (response.data) setInbox(response.data); // Update inbox state with fetched notifications
            }
        };

        getNotifications();
    }, [isAuthenticated]);

    /**
     * Updates the unread notification count whenever the inbox changes.
     */
    useEffect(() => {
        setNotificationCount(inbox.filter((notification) => !notification.read).length);
    }, [inbox]);

    return (
        <Navbar className='bg-body-tertiary mb-3' expand='lg'>
            <Container fluid>
                {/* Brand logo and title */}
                <Navbar.Brand
                    onClick={() => {
                        navigate('/'); // Navigate to the home page
                    }}
                >
                    <Image src={brandImgUrl} height={30} /> WayMatcher
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
                            {/* Navigation links */}
                            <Link to='/' className='nav-link'>
                                Home
                            </Link>
                            <NavDropdown
                                title='Ways'
                                id='ways-dropdown'
                                aria-label='Way Filters'
                                className='justify-content-end'
                            >
                                {/* Dropdown options for filtering "Ways" */}
                                <NavDropdown.Item onClick={() => navigate('/events')} aria-label='Events'>
                                    <strong>All Ways</strong>
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={() => navigate('/events?filter=passenger')}
                                    aria-label='Passenger Ways'
                                >
                                    Passenger Ways
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    onClick={() => navigate('/events?filter=pilot')}
                                    aria-label='Pilot Ways'
                                >
                                    Pilot Ways
                                </NavDropdown.Item>
                                {isAuthenticated && (
                                    <>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item
                                            onClick={() => navigate('/events?filter=owned')}
                                            aria-label='My Matches'
                                        >
                                            My Matches
                                        </NavDropdown.Item>
                                    </>
                                )}
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            {isAuthenticated ? (
                                <>
                                    {/* User-specific dropdown menu */}
                                    <NavDropdown
                                        title={authUser?.username}
                                        id='user-options-dropdown'
                                        aria-label='User Options'
                                        className='justify-content-end'
                                    >
                                        <NavDropdown.Item
                                            onClick={() => {
                                                navigate(`/profile/${authUser?.username}/edit`); // Navigate to edit profile
                                            }}
                                            aria-label='Edit Profile'
                                        >
                                            Edit Profile
                                        </NavDropdown.Item>
                                        <NavDropdown.Item
                                            onClick={() => {
                                                navigate(`/events?filter=owned`); // Navigate to user's "Ways"
                                            }}
                                            aria-label='My Matches'
                                        >
                                            My Ways
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item
                                            onClick={() => {
                                                signOut(); // Sign out the user
                                                navigate('/login'); // Redirect to login page
                                            }}
                                            aria-label='Logout'
                                        >
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>

                                    {/* Inbox link with notification count */}
                                    <Link to='/inbox' className='nav-link'>
                                        <Badge>
                                            <span className={'bi bi-inbox-fill'}> {notificationCount}</span>
                                        </Badge>
                                    </Link>
                                </>
                            ) : (
                                <ButtonGroup>
                                    {/* Login and Register buttons for unauthenticated users */}
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
