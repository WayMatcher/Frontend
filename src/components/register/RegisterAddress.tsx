import React, { useEffect } from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import CollapseWrapper from '@/components/CollapseWrapper';
import Address from '@/types/objects/Address/dto';
import AddressAdd from '@/components/address/AddressAdd';

/**
 * Component for managing and displaying an address during the registration process.
 *
 * @param {Object} props - Component props.
 * @param {[Address | null, React.Dispatch<React.SetStateAction<Address | null>>]} props.addressState - State for the address object.
 * @param {Object} props.done - Object tracking completion status of different registration steps.
 * @param {boolean} props.done.user - Indicates if the user step is complete.
 * @param {boolean} props.done.address - Indicates if the address step is complete.
 * @param {boolean} props.done.vehicle - Indicates if the vehicle step is complete.
 * @param {Function} props.done.onComplete - Callback to update the completion status.
 *
 * @returns {React.ReactElement} The rendered component.
 */
export default function RegisterAddress({
    addressState,
    done,
}: {
    addressState: [Address | null, React.Dispatch<React.SetStateAction<Address | null>>];
    done: {
        user: boolean;
        address: boolean;
        vehicle: boolean;
        onComplete: (isDone: boolean) => void;
    };
}): React.ReactElement {
    const [address, setAddress] = addressState;

    // Mark the address step as done if an address is set
    useEffect(() => done.onComplete(!!address), [address, done.onComplete]);

    return (
        <>
            <CollapseWrapper>
                <Container>
                    {address ? (
                        <ListGroup>
                            {/* Display address details */}
                            <ListGroup.Item>Street: {address.street}</ListGroup.Item>
                            <ListGroup.Item>Postal Code: {address.postalcode}</ListGroup.Item>
                            <ListGroup.Item>Region: {address.region}</ListGroup.Item>
                            <ListGroup.Item>City: {address.city}</ListGroup.Item>
                            <ListGroup.Item>Country: {address.country}</ListGroup.Item>
                            <ListGroup.Item>Longitude: {address.latitude}</ListGroup.Item>
                            <ListGroup.Item>Latitude: {address.longitude}</ListGroup.Item>
                            <ListGroup.Item>
                                {/* Button to unset the address */}
                                <Button
                                    variant='outline-danger'
                                    onClick={() => {
                                        setAddress(null);
                                    }}
                                >
                                    Unset Address
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    ) : (
                        // Render AddressAdd component if no address is set
                        <AddressAdd setAddress={setAddress} />
                    )}
                </Container>
            </CollapseWrapper>
        </>
    );
}
