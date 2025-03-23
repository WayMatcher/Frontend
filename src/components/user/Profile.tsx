import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from '@/types/objects/User/dto';
import { useContext, useEffect, useState } from 'react';
import { apiGetUser } from '@/api/endpoints/user';
import { useNavigate, useParams } from 'react-router-dom';
import Vehicle from '@/types/objects/Vehicle/dto';
import Address from '@/types/objects/Address/dto';
import { apiGetAddress } from '@/api/endpoints/address';
import { apiGetVehicleList } from '@/api/endpoints/vehicle';
import { Button, Container, Table } from 'react-bootstrap';
import Loading from '@/components/Loading';
import ErrorModalContext from '@/contexts/ErrorModalContext';

export default function Profile() {
    const { username } = useParams<{ username: string }>();

    const authUser = useAuthUser<User>();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [address, setAddress] = useState<Address | null>(null);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    const { showErrorModal } = useContext(ErrorModalContext);

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
                const vehicleResponse = await apiGetVehicleList({ username: effectiveUsername });

                setUser(userResponse.data);
                setAddress(addressResponse.data);
                setVehicles(vehicleResponse.data);
            } catch (error) {
                showErrorModal(`Error fetching data: ${error}`);
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
                        {vehicles?.map((vehicle) => (
                            <tr key={vehicle.id}>
                                <td>Vehicle #{vehicle.id}</td>
                                <td>
                                    {vehicle?.make} {vehicle?.model} {vehicle?.year}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                {authUser?.id === user?.id && <Button onClick={() => navigate('./edit')}>Edit</Button>}
            </Container>
        </Loading>
    );
}
