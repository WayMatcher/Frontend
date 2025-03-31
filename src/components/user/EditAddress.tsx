import React, { useContext, useEffect } from 'react';
import { Button, ButtonGroup, ListGroup } from 'react-bootstrap';
import CollapseWrapper from '@/components/CollapseWrapper';
import Address from '@/types/objects/Address/dto';
import User from '@/types/objects/User/dto';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import { apiGetAddress, apiSetAddress } from '@/api/endpoints/address';
import LoadingOverlay from '../LoadingOverlay';
import AddressAdd from '@/components/address/AddressAdd';
import { SingleAddressMap } from '../maps/SingleAddressMap';

export default function EditAddress(): React.ReactElement {
    const { showErrorModal } = useContext(ErrorModalContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const authUser = useAuthUser<User>();

    const [address, setAddress] = React.useState<Address | null>(null);
    const [newAddress, setNewAddress] = React.useState<Address | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (authUser?.userId === undefined) {
                    showErrorModal('No user logged in!');
                    return;
                }

                const response = await apiGetAddress({ userID: authUser.userId });

                setAddress(response.data);
            } catch (error: unknown) {
                showErrorModal((error as Error).message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const set = async () => {
            try {
                if (authUser?.userId === undefined) {
                    showErrorModal('No user logged in!');
                    return;
                }

                setIsLoading(true);
                if (newAddress && newAddress !== address) {
                    await apiSetAddress({ address: newAddress, userId: authUser?.userId });
                    setAddress(newAddress);
                }
                setIsLoading(false);
            } catch (error) {
                showErrorModal((error as Error).message);
            }
        };
        if (newAddress) set();
    }, [newAddress]);

    const mapUrl =
        address && address.latitude && address.longitude
            ? `https://www.google.com/maps?q=${address.latitude},${address.longitude}`
            : null;

    return (
        <>
            <h2>Address</h2>
            <CollapseWrapper>
                <LoadingOverlay isLoading={isLoading}>
                    {address ? (
                        <ListGroup>
                            <ListGroup.Item style={{ padding: '0' }}>
                                <SingleAddressMap address={address} width={640} height={400} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <strong>Street:</strong> {address.street}
                            </ListGroup.Item>
                            {address.postalcode && (
                                <ListGroup.Item>
                                    <strong>Postal Code:</strong> {address.postalcode}
                                </ListGroup.Item>
                            )}
                            {address.region && (
                                <ListGroup.Item>
                                    <strong>Region:</strong> {address.region}
                                </ListGroup.Item>
                            )}
                            {address.city && (
                                <ListGroup.Item>
                                    <strong>City:</strong> {address.city}
                                </ListGroup.Item>
                            )}
                            {address.country && (
                                <ListGroup.Item>
                                    <strong>Country:</strong> {address.country}
                                </ListGroup.Item>
                            )}
                            {address.latitude && (
                                <ListGroup.Item>
                                    <strong>Longitude:</strong> {address.latitude}
                                </ListGroup.Item>
                            )}
                            {address.longitude && (
                                <ListGroup.Item>
                                    <strong>Latitude:</strong> {address.longitude}
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <ButtonGroup>
                                    <Button
                                        variant='outline-danger'
                                        onClick={() => {
                                            setAddress(null);
                                        }}
                                    >
                                        Unset Address
                                    </Button>
                                    {mapUrl && (
                                        <Button
                                            variant='outline-primary'
                                            href={mapUrl}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            View on Google Maps
                                        </Button>
                                    )}
                                </ButtonGroup>
                            </ListGroup.Item>
                        </ListGroup>
                    ) : (
                        <AddressAdd setAddress={setNewAddress} />
                    )}
                </LoadingOverlay>
            </CollapseWrapper>
        </>
    );
}
