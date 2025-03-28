import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from '@/types/objects/User/dto';
import { useContext, useEffect, useState } from 'react';
import { apiGetUser } from '@/api/endpoints/user';
import { useNavigate, useParams } from 'react-router-dom';
import Vehicle from '@/types/objects/Vehicle/dto';
import Address from '@/types/objects/Address/dto';
import { apiGetAddress } from '@/api/endpoints/address';
import { apiGetVehicleList } from '@/api/endpoints/vehicle';
import { Button, ButtonGroup, Container, Table } from 'react-bootstrap';
import Loading from '@/components/Loading';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import ProfilePicture from '@/components/ProfilePicture';
import Rating from './Rating';
import RatingAdd from './RatingAdd';

export default function Profile() {
    const { username } = useParams<{ username: string }>();
    const authUser = useAuthUser<User>();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showRating, setShowRating] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [address, setAddress] = useState<Address | null>(null);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);

    const { showErrorModal } = useContext(ErrorModalContext);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const effectiveUsername = username || authUser?.username;
                if (!username && authUser?.username) {
                    navigate(`/profile/${authUser?.username}`);
                    return;
                }
                if (!effectiveUsername) {
                    navigate('/login');
                    return;
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
        <>
            <Loading loading={loading}>
                <Container className='profile'>
                    <Container className='profile-picture'>
                        <ProfilePicture image={user?.profilepicture} width={150} height={150} />
                    </Container>
                    <h1>
                        {user?.firstname} {user?.name}
                    </h1>
                    <p>{user?.additionalDescription}</p>
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
                                    {address?.street} {address?.postalcode} {address?.city}
                                </td>
                            </tr>
                            {user?.userId && (
                                <tr>
                                    <td>Rating</td>
                                    <td>
                                        <Rating userId={user?.userId} />
                                    </td>
                                </tr>
                            )}
                            {vehicles?.map((vehicle) => (
                                <tr key={vehicle.vehicleId}>
                                    <td>Vehicle #{vehicle.vehicleId}</td>
                                    <td>
                                        {vehicle?.manufacturerName} {vehicle?.model} {vehicle?.yearOfManufacture}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <ButtonGroup>
                        {authUser?.userId !== user?.userId && (
                            <Button onClick={() => setShowRating(true)}>Rate User</Button>
                        )}
                        {authUser?.userId === user?.userId && <Button onClick={() => navigate('./edit')}>Edit</Button>}
                        {authUser?.userId === user?.userId && (
                            <Button onClick={() => navigate('/password/forget')}>Change Password</Button>
                        )}
                    </ButtonGroup>
                </Container>
            </Loading>
            {user && <RatingAdd showState={[showRating, setShowRating]} user={user} />}
        </>
    );
}
