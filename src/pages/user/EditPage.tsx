import { Button, Container, Nav, Stack } from 'react-bootstrap';
import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';

import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import User from '@/types/objects/User/dto';
import EditUser from '@/components/user/EditUser';
import EditAddress from '@/components/user/EditAddress';
import EditVehicle from '@/components/user/EditVehicle';

import '../styles/EditPage.scss';
import ProfilePicture from '@/components/ProfilePicture';

export default function EditPage() {
    const { username } = useParams<{ username: string }>();

    const authUser = useAuthUser<User>();

    const navigate = useNavigate();

    const currentPath = window.location.pathname;
    const basePath = `/profile/${username}/edit`;

    if (!authUser) {
        return (
            <Container className='user-page'>
                <h2>Not logged in!</h2>
                <Button
                    onClick={() => {
                        navigate('/login');
                    }}
                >
                    Log in
                </Button>
            </Container>
        );
    } else if (authUser?.username !== username) {
        return (
            <Container className='user-page'>
                <h2>You cannot edit this user!</h2>
                <Button
                    onClick={() => {
                        navigate('/login');
                    }}
                >
                    Log in
                </Button>
            </Container>
        );
    } else {
        return (
            <Container>
                <h1>
                    Welcome {authUser.firstName} {authUser.name}
                </h1>
                <Container className='edit-page'>
                    <Stack className='edit-nav' direction='vertical' gap={3}>
                        <ProfilePicture image={authUser.profilepicture} width={'144px'} />
                        <Container>
                            <Nav
                                className='flex-column'
                                variant='pills'
                                defaultActiveKey={`/profile/${authUser.username}/edit/user`}
                            >
                                <Nav.Item>
                                    <Nav.Link
                                        onClick={() => navigate(basePath + '/user')}
                                        active={currentPath.toLowerCase().includes('/user')}
                                    >
                                        User
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        onClick={() => navigate(basePath + '/address')}
                                        active={currentPath.toLowerCase().includes('/address')}
                                    >
                                        Address
                                    </Nav.Link>
                                </Nav.Item>
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
                    <Container className='edit-content'>
                        <Routes>
                            <Route path={'/user'} element={<EditUser />} />
                            <Route path={'/address'} element={<EditAddress />} />
                            <Route path={'/vehicles'} element={<EditVehicle />} />
                            <Route
                                path='/*'
                                element={<Navigate to={`/profile/${authUser.username}/edit/user`} replace />}
                            />
                        </Routes>
                    </Container>
                </Container>
            </Container>
        );
    }
}
