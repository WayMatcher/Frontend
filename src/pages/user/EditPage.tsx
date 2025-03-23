import { Button, Container, Tab, Tabs } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import User from '@/types/objects/User/dto';
import EditUser from '@/components/user/EditUser';
import EditAddress from '@/components/user/EditAddress';
import EditVehicle from '@/components/user/EditVehicle';

export default function EditPage() {
    const { username } = useParams<{ username: string }>();

    const authUser = useAuthUser<User>();

    const navigate = useNavigate();

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
            <Container className='user-page'>
                <h1>
                    Welcome {authUser.firstName} {authUser.name}
                </h1>
                <Container>
                    <Tabs defaultActiveKey='profile' id='uncontrolled-tab-example' className='mb-3'>
                        <br />
                        <h2>Edit your profile</h2>
                        <Tab eventKey='profile' title='Profile'>
                            <EditUser />
                        </Tab>
                        <Tab eventKey='address' title='Address'>
                            <EditAddress />
                        </Tab>
                        <Tab eventKey='vehicle' title='Vehicle'>
                            <EditVehicle />
                        </Tab>
                    </Tabs>
                </Container>
            </Container>
        );
    }
}
