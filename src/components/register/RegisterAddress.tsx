import React, { useEffect } from 'react';
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

    // Mark as done based on completion
    useEffect(() => done.onComplete(!!address), [address, done.onComplete]);

    return (
        <>
            <CollapseWrapper>
                <Container>
                    {address ? (
                        <ListGroup>
                            <ListGroup.Item>Street: {address.street}</ListGroup.Item>
                            <ListGroup.Item>Postal Code: {address.postalcode}</ListGroup.Item>
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
                        <AddressAdd setAddress={setAddress} />
                    )}
                </Container>
            </CollapseWrapper>
        </>
    );
}
