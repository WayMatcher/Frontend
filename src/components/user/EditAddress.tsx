import React, { useContext, useEffect } from 'react';

import { Formik, Form as FormikForm } from 'formik';
import { Button, ListGroup, Row } from 'react-bootstrap';
import FormInput from '@/components/FormInput';
import CollapseWrapper from '@/components/CollapseWrapper';
import Address from '@/types/objects/Address/dto';
import User from '@/types/objects/User/dto';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import { apiGetAddress, apiSetAddress } from '@/api/endpoints/address';
import { RegisterAddressSchema } from '@/utils/formValidations';
import EditButtons from './EditButtons';
import LoadingOverlay from '../LoadingOverlay';
import AddressAdd from '../AddressAdd';

export default function EditAddress(): React.ReactElement {
    const { showErrorModal } = useContext(ErrorModalContext);
    const [isLoading, setIsLoading] = React.useState(true);
    const authUser = useAuthUser<User>();

    let initialValues: Address = {
        street: '',
        postalcode: '',
        region: '',
        countrycode: '',
        state: '',
        city: '',
        addressLine1: '',
        addressLine2: '',
        longitude: 0,
        latitude: 0,
    };

    const [address, setAddress] = React.useState<Address | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if (authUser?.userId === undefined) {
                    showErrorModal('No user logged in!');
                    return;
                }

                const response = await apiGetAddress({ userID: authUser.userId });

                initialValues = { ...initialValues, ...response.data };
            } catch (error: unknown) {
                showErrorModal((error as Error).message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const set = async (address: Address) => {
            try {
                if (authUser?.userId === undefined) {
                    showErrorModal('No user logged in!');
                    return;
                }

                setIsLoading(true);
                await apiSetAddress({ address: address, userId: authUser?.userId });
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        if (address) set(address);
    }, [address]);

    return (
        <>
            <h2>Address</h2>
            <CollapseWrapper>
                <LoadingOverlay isLoading={isLoading}>
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
                </LoadingOverlay>
            </CollapseWrapper>
        </>
    );
}
