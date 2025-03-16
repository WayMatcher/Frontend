import React, { useContext } from 'react';
import { Form as FormikForm, Formik } from 'formik';
import { Container, Row } from "react-bootstrap";
import { RegisterAddressSchema } from '../../utils/formValidations';
import FormInput from '../FormInput';
import CollapseWrapper from '../CollapseWrapper';
import Address from '../../types/dto/Address';

import EditButtons from './EditButtons';
import UserContext from '../../contexts/UserContext';

export default function EditAddress(): React.ReactElement {
    const { user, setUser } = useContext(UserContext);

    const handleSubmit = (values: Address) => {
        setUser({
            ...user,
            address: values,
            username: user?.username || '',
            email: user?.email || '',
        });
    }

    const initialValues: Address = {
        street: user?.address?.street || '',
        postal_code: user?.address?.postal_code || '',
        region: user?.address?.region || '',
        country: user?.address?.country || '',
        state: user?.address?.state || '',
        city: user?.address?.city || '',
        address_line1: user?.address?.address_line1 || '',
        address_line2: user?.address?.address_line2 || '',
        longitude: user?.address?.longitude || 0,
        latitude: user?.address?.latitude || 0,
    }

    return (
        <>
            <h2>Address</h2>
            <CollapseWrapper>
                <Container>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={RegisterAddressSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors }) => (
                            <FormikForm>
                                <Row>
                                    <FormInput
                                        label="Street"
                                        name="street" type="text"
                                        placeholder='1234 Main St'
                                        value={values.street} error={errors.street}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label="Postal Code"
                                        name="postal_code" type="text"
                                        placeholder='12345'
                                        value={values.postal_code} error={errors.postal_code}
                                    />
                                    <FormInput
                                        label="Region"
                                        name="region" type="text"
                                        placeholder='Region'
                                        value={values.region} error={errors.region}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label="Country"
                                        name="country" type="text"
                                        placeholder='Country'
                                        value={values.country} error={errors.country}
                                    />
                                    <FormInput
                                        label="State"
                                        name="state" type="text"
                                        placeholder='State'
                                        value={values.state} error={errors.state}
                                    />
                                    <FormInput
                                        label="City"
                                        name="city" type="text"
                                        placeholder='City'
                                        value={values.city} error={errors.city}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label="Address Line 1"
                                        name="address_line1" type="text"
                                        placeholder='Address Line 1'
                                        value={values.address_line1} error={errors.address_line1}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label="Address Line 2"
                                        name="address_line2" type="text"
                                        placeholder='Address Line 2'
                                        value={values.address_line2} error={errors.address_line2}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label="Longitude"
                                        name="longitude" type="number"
                                        placeholder={47.8117211}
                                        value={values.longitude} error={errors.longitude}
                                    />
                                    <FormInput
                                        label="Latitude"
                                        name="latitude" type="number"
                                        placeholder={13.0322547}
                                        value={values.latitude} error={errors.latitude}
                                    />
                                </Row>
                                <EditButtons />
                            </FormikForm>
                        )}
                    </Formik>
                </Container>
            </CollapseWrapper>
        </>
    )
}