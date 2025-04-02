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

/**
 * Component for editing a user's address.
 * Fetches the current address, displays it, and allows the user to update or unset it.
 */
export default function EditAddress(): React.ReactElement {
    const { showErrorModal } = useContext(ErrorModalContext); // Context for displaying error modals
    const [isLoading, setIsLoading] = React.useState(true); // Loading state
    const authUser = useAuthUser<User>(); // Hook to get the authenticated user

    const [address, setAddress] = React.useState<Address | null>(null); // Current address state
    const [newAddress, setNewAddress] = React.useState<Address | null>(null); // New address state

    // Fetch the user's address when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (authUser?.userId === undefined) {
                    showErrorModal('No user logged in!');
                    return;
                }

                const response = await apiGetAddress({ userID: authUser.userId });
                setAddress(response.data); // Set the fetched address
            } catch (error: unknown) {
                showErrorModal((error as Error).message); // Show error modal on failure
            } finally {
                setIsLoading(false); // Stop loading spinner
            }
        };
        fetchData();
    }, []);

    // Update the user's address when `newAddress` changes
    useEffect(() => {
        const set = async () => {
            try {
                if (authUser?.userId === undefined) {
                    showErrorModal('No user logged in!');
                    return;
                }

                setIsLoading(true); // Start loading spinner
                if (newAddress && newAddress !== address) {
                    await apiSetAddress({ address: newAddress, userId: authUser?.userId });
                    setAddress(newAddress); // Update the current address
                }
                setIsLoading(false); // Stop loading spinner
            } catch (error) {
                showErrorModal((error as Error).message); // Show error modal on failure
            }
        };
        if (newAddress) set(); // Trigger address update if `newAddress` is set
    }, [newAddress]);

    // Generate a Google Maps URL for the current address
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
                            {/* Display the address on a map */}
                            <ListGroup.Item style={{ padding: '0' }}>
                                <SingleAddressMap address={address} width={400} height={640} />
                            </ListGroup.Item>
                            {/* Display address details */}
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
                            {/* Note: Latitude and longitude labels were swapped */}
                            {address.latitude && (
                                <ListGroup.Item>
                                    <strong>Latitude:</strong> {address.latitude}
                                </ListGroup.Item>
                            )}
                            {address.longitude && (
                                <ListGroup.Item>
                                    <strong>Longitude:</strong> {address.longitude}
                                </ListGroup.Item>
                            )}
                            {/* Buttons for unsetting the address or viewing it on Google Maps */}
                            <ListGroup.Item>
                                <ButtonGroup>
                                    <Button
                                        variant='outline-danger'
                                        onClick={() => {
                                            setAddress(null); // Unset the current address
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
                        // Show the address add form if no address is set
                        <AddressAdd setAddress={setNewAddress} />
                    )}
                </LoadingOverlay>
            </CollapseWrapper>
        </>
    );
}
