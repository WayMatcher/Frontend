import { Button, Container, Nav, Stack } from 'react-bootstrap';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';

import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import '@/pages/_styles/EditPage.scss';

import User from '@/types/objects/User/dto';
import EditUser from '@/components/user/EditUser';
import EditAddress from '@/components/user/EditAddress';
import EditVehicleList from '@/components/user/EditVehicleList';

import ProfilePicture from '@/components/ProfilePicture';

/**
 * EditPage component allows authenticated users to edit their profile details.
 * It provides navigation for editing user information, address, and vehicles.
 *
 * @returns {JSX.Element} The rendered EditPage component.
 */
export default function EditPage() {
    // Extract the username from the URL parameters.
    const { username } = useParams<{ username: string }>();

    // Get the authenticated user details.
    const authUser = useAuthUser<User>();

    // Hook for programmatic navigation.
    const navigate = useNavigate();

    // Get the current path and construct the base path for navigation.
    const currentPath = window.location.pathname;
    const basePath = `/profile/${username}/edit`;

    // If the user is not logged in, show a message and redirect to login.
    if (!authUser) {
        return (
            <Container className='user-page'>
                <h2>Not logged in!</h2>
                <Button
                    onClick={() => {
                        navigate('/login'); // Redirect to login page.
                    }}
                >
                    Log in
                </Button>
            </Container>
        );
    }
    // If the logged-in user is not the same as the username in the URL, deny access.
    else if (authUser?.username !== username) {
        return (
            <Container className='user-page'>
                <h2>You cannot edit this user!</h2>
                <Button
                    onClick={() => {
                        navigate('/login'); // Redirect to login page.
                    }}
                >
                    Log in
                </Button>
            </Container>
        );
    }
    // If the user is authenticated and authorized, render the edit page.
    else {
        return (
            <Container className='edit-page'>
                {/* Navigation menu for editing different sections */}
                <Stack className='edit-nav' direction='vertical' gap={3}>
                    {/* Display the user's profile picture */}
                    <ProfilePicture image={authUser.profilePicture} width={'144px'} />
                    <Container>
                        <Nav
                            className='flex-column'
                            variant='pills'
                            defaultActiveKey={`/profile/${authUser.username}/edit/user`}
                        >
                            {/* Navigation link for editing user details */}
                            <Nav.Item>
                                <Nav.Link
                                    onClick={() => navigate(basePath + '/user')}
                                    active={currentPath.toLowerCase().includes('/user')}
                                >
                                    User
                                </Nav.Link>
                            </Nav.Item>
                            {/* Navigation link for editing address */}
                            <Nav.Item>
                                <Nav.Link
                                    onClick={() => navigate(basePath + '/address')}
                                    active={currentPath.toLowerCase().includes('/address')}
                                >
                                    Address
                                </Nav.Link>
                            </Nav.Item>
                            {/* Navigation link for editing vehicles */}
                            <Nav.Item>
                                <Nav.Link
                                    onClick={() => navigate(basePath + '/vehicles')}
                                    active={currentPath.toLowerCase().includes('/vehicles')}
                                >
                                    Vehicles
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Container>
                </Stack>
                {/* Content area for rendering the selected edit component */}
                <Container className='edit-content'>
                    <Routes>
                        {/* Route for editing user details */}
                        <Route path={'/user'} element={<EditUser />} />
                        {/* Route for editing address */}
                        <Route path={'/address'} element={<EditAddress />} />
                        {/* Route for editing vehicles */}
                        <Route path={'/vehicles'} element={<EditVehicleList />} />
                        {/* Redirect to user edit page if no specific route is matched */}
                        <Route
                            path='/*'
                            element={<Navigate to={`/profile/${authUser.username}/edit/user`} replace />}
                        />
                    </Routes>
                </Container>
            </Container>
        );
    }
}
