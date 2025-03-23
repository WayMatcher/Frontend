import ErrorModalContext from '@/contexts/ErrorModalContext';

import { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { Form as FormikForm, Formik } from 'formik';

import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

import User from '@/types/objects/User/dto';
import EditUser from '@/components/user/EditUser';
import { apiGetUser } from '@/api/endpoints/user';

import Address from '@/types/objects/Address/dto';
import EditAddress from '@/components/user/EditAddress';
import { apiGetAddress } from '@/api/endpoints/address';

import Vehicle from '@/types/objects/Vehicle/dto';
import EditVehicle from '@/components/user/EditVehicle';
import { apiGetVehicle } from '@/api/endpoints/vehicle';

export default function UserPage() {
    const { showErrorModal, hideErrorModal } = useContext(ErrorModalContext);
    const { username } = useParams<{ username: string }>();

    const authUser = useAuthUser<User>();

    const navigate = useNavigate();

    const userState = useState<User | null>(null);
    const addressState = useState<Address | null>(null);
    const vehicleState = useState<Vehicle | null>(null);

    const [user, setUser] = userState;
    const [address, setAddress] = addressState;
    const [vehicle, setVehicle] = vehicleState;

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (!authUser?.id) return;
            try {
                const [responseUser, responseAddress, responseVehicle] = await Promise.all([
                    apiGetUser({ userID: authUser.id }),
                    apiGetAddress({ userID: authUser.id }),
                    apiGetVehicle({ userID: authUser.id }),
                ]);

                setUser(responseUser.data);
                setAddress(responseAddress.data);
                setVehicle(responseVehicle.data);
            } catch (error: unknown) {
                showErrorModal((error as Error).message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [authUser, showErrorModal]);

    const handleSubmit = async () => {
        try {
            // Submit user data
        } catch {
            showErrorModal('Test');
        }
    };

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
                    Welcome {authUser.firstName} {authUser.name}{' '}
                </h1>
                <Container>
                    <br />
                    <Formik initialValues={{}} onSubmit={handleSubmit}>
                        <FormikForm>
                            <h2>Edit your profile</h2>
                            <EditUser state={userState} />
                            <hr />
                            <EditAddress state={addressState} />
                            <hr />
                            <EditVehicle state={vehicleState} />
                            <br />
                            <Button type='submit'>Save</Button>
                        </FormikForm>
                    </Formik>
                </Container>
            </Container>
        );
    }
}
