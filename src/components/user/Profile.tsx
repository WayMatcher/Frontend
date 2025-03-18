import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import User from "../../types/dto/User"
import { useEffect, useState } from "react";
import { apiGetUserByUsername } from "../../api/endpoints/user/user";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Vehicle from "../../types/dto/Vehicle";
import Address from "../../types/dto/Address";

export default function Profile() {
    const { username } = useParams()
    const authUser = useAuthUser<User>();
    const [user, setUser] = useState<User | null>(null);
    const [address, setAddress] = useState<Address | null>(null);
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (username) {
                    setUser(await apiGetUserByUsername(username));
                    setAddress(await apiGetAddressByID(user?.address));
                    setVehicle(await apiGetVehicleByID(user?.vehicle));
                } else {
                    console.error(response.message);
                }
            }
            } catch (error: unknown) {
            console.error('Error fetching user:', error);
        }
    };
    fetchData();
}, []);

return (
    <Container className="profile">
        <h1>{user?.firstName} {user?.name}</h1>
        <p>{user?.additional_description}</p>
    </Container>
);
}