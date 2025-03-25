import React, { useEffect, useState } from 'react';
import { Button, Container, ListGroup } from 'react-bootstrap';
import CollapseWrapper from '@/components/CollapseWrapper';
import Address from '@/types/objects/Address/dto';
import AddressAdd from '@/components/AddressAdd';

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
    const [showAddressModal, setShowAddressModal] = useState<boolean>(false);

    // Mark as done based on completion
    useEffect(() => done.onComplete(!!address), [address, done.onComplete]);

    return (
        <>
            <h2>Address</h2>
            <CollapseWrapper>
                <Container>
                    {address ? (
                        <ListGroup>
                            <ListGroup.Item>Street: {address.street}</ListGroup.Item>
                            <ListGroup.Item>Postal Code: {address.postal_code}</ListGroup.Item>
                            <ListGroup.Item>Region: {address.region}</ListGroup.Item>
                            <ListGroup.Item>City: {address.city}</ListGroup.Item>
                            <ListGroup.Item>Country: {address.country}</ListGroup.Item>
                            <ListGroup.Item>Longitude: {address.latitude}</ListGroup.Item>
                            <ListGroup.Item>Latitude: {address.longitude}</ListGroup.Item>
                            <ListGroup.Item>
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
                        <Button onClick={() => setShowAddressModal(true)}>Add Address</Button>
                    )}
                </Container>
            </CollapseWrapper>
            <AddressAdd showState={[showAddressModal, setShowAddressModal]} setAddress={setAddress} />
        </>
    );
}
