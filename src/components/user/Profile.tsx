import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from '@/types/User/dto';
import { useEffect, useState } from 'react';
import { apiGetUser } from '@/api/endpoints/user';
import { useNavigate, useParams } from 'react-router-dom';
import Vehicle from '@/types/Vehicle/dto';
import Address from '@/types/Address/dto';
import { apiGetAddress } from '@/api/endpoints/address';
import { apiGetVehicle } from '@/api/endpoints/vehicle';
import { Button, Container, Table } from 'react-bootstrap';
import Loading from '@/components/Loading';

export default function Profile() {
    const { username } = useParams<{ username: string }>();

    const authUser = useAuthUser<User>();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [address, setAddress] = useState<Address | null>(null);
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const effectiveUsername = username || authUser?.username;
                if (!effectiveUsername) {
                    throw new Error('No username available');
                }

                const userResponse = await apiGetUser({ username: effectiveUsername });
                const addressResponse = await apiGetAddress({ username: effectiveUsername });
                const vehicleResponse = await apiGetVehicle({ username: effectiveUsername });

                setUser(userResponse.data);
                setAddress(addressResponse.data);
                setVehicle(vehicleResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username, authUser]);

    return (
        <Loading loading={loading}>
            <Container className='profile'>
                <Container className='profile-picture'>
                    <p>{user?.profile_picture}</p>
                </Container>
                <h1>
                    {user?.firstName} {user?.name}
                </h1>
                <p>{user?.additional_description}</p>
                <br />
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>Attribute</th>
                            <th>Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Username</td>
                            <td>{user?.username}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{user?.email}</td>
                        </tr>
                        <tr>
                            <td>Phone</td>
                            <td>{user?.telephone}</td>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>
                                {address?.street} {address?.postal_code} {address?.city}
                            </td>
                        </tr>
                        <tr>
                            <td>Vehicle</td>
                            <td>
                                {vehicle?.make} {vehicle?.model}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                {authUser?.id === user?.id && <Button onClick={() => navigate('./edit')}>Edit</Button>}
            </Container>
        </Loading>
    );
}
