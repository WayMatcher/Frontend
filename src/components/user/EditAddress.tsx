import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Form as FormikForm, Formik } from 'formik';
import { EditAddressSchema } from '@/utils/formValidations';
import FormInput from '@/components/FormInput';
import CollapseWrapper from '@/components/CollapseWrapper';
import EditProps from '@/types/EditProps';
import Address from '@/types/Address/dto';
import { FormAddress, initialValuesAddress } from '@/types/Address/form';
import { apiGetAddress, apiSetAddress, RequestAddress } from '@/api/endpoints/address';
import EditButtons from '@/components/user/EditButtons';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from '@/types/User/dto';

export default function EditAddress({ setShowErrorModal, setSubmissionError }: EditProps) {
    const [address, setAddress] = useState<Address | null>(null);
    const authUser = useAuthUser<User>();

    useEffect(() => {
        const fetchAddress = async () => {
            if (authUser === null || authUser.id === null) return;

            try {
                const response = await apiGetAddress({ userID: authUser.id });
                setAddress(response.data);
            } catch (error: unknown) {
                console.error('Error fetching address:', error);
                setSubmissionError((error as Error).message);
                setShowErrorModal(true);
            }
        };
        fetchAddress();
    });

    const handleSubmit = async (values: FormAddress) => {
        const request: RequestAddress = {
            address: values,
        };

        await apiSetAddress(request);

        setAddress(values);
    };

    const initialValues: FormAddress = {
        address_line1: address?.address_line1 || initialValuesAddress.address_line1,
        address_line2: address?.address_line2 || initialValuesAddress.address_line2,
        city: address?.city || initialValuesAddress.city,
        country: address?.country || initialValuesAddress.country,
        latitude: address?.latitude || initialValuesAddress.latitude,
        longitude: address?.longitude || initialValuesAddress.longitude,
        postal_code: address?.postal_code || initialValuesAddress.postal_code,
        region: address?.region || initialValuesAddress.region,
        state: address?.state || initialValuesAddress.state,
        street: address?.street || initialValuesAddress.street,
    };

    if (authUser === null) return <h2>Not logged in</h2>;
    return (
        <>
            <h2>Address</h2>
            <CollapseWrapper>
                <Container>
                    <Formik initialValues={initialValues} validationSchema={EditAddressSchema} onSubmit={handleSubmit}>
                        {({ values, errors, isSubmitting }) => (
                            <FormikForm>
                                <Row>
                                    <FormInput
                                        label='Street'
                                        name='street'
                                        type='text'
                                        placeholder='1234 Main St'
                                        formikData={{
                                            value: values.street,
                                            error: errors.street,
                                            isSubmitting: isSubmitting,
                                        }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Postal Code'
                                        name='postal_code'
                                        type='text'
                                        placeholder='12345'
                                        formikData={{
                                            value: values.postal_code,
                                            error: errors.postal_code,
                                            isSubmitting: isSubmitting,
                                        }}
                                    />
                                    <FormInput
                                        label='Region'
                                        name='region'
                                        type='text'
                                        placeholder='Region'
                                        formikData={{
                                            value: values.region,
                                            error: errors.region,
                                            isSubmitting: isSubmitting,
                                        }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Country'
                                        name='country'
                                        type='text'
                                        placeholder='Country'
                                        formikData={{
                                            value: values.country,
                                            error: errors.country,
                                            isSubmitting: isSubmitting,
                                        }}
                                    />
                                    <FormInput
                                        label='State'
                                        name='state'
                                        type='text'
                                        placeholder='State'
                                        formikData={{
                                            value: values.state,
                                            error: errors.state,
                                            isSubmitting: isSubmitting,
                                        }}
                                    />
                                    <FormInput
                                        label='City'
                                        name='city'
                                        type='text'
                                        placeholder='City'
                                        formikData={{
                                            value: values.city,
                                            error: errors.city,
                                            isSubmitting: isSubmitting,
                                        }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Address Line 1'
                                        name='address_line1'
                                        type='text'
                                        placeholder='Address Line 1'
                                        formikData={{
                                            value: values.address_line1,
                                            error: errors.address_line1,
                                            isSubmitting: isSubmitting,
                                        }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Address Line 2'
                                        name='address_line2'
                                        type='text'
                                        placeholder='Address Line 2'
                                        formikData={{
                                            value: values.address_line2,
                                            error: errors.address_line2,
                                            isSubmitting: isSubmitting,
                                        }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Longitude'
                                        name='longitude'
                                        type='number'
                                        placeholder={47.8117211}
                                        formikData={{
                                            value: values.longitude,
                                            error: errors.longitude,
                                            isSubmitting: isSubmitting,
                                        }}
                                    />
                                    <FormInput
                                        label='Latitude'
                                        name='latitude'
                                        type='number'
                                        placeholder={13.0322547}
                                        formikData={{
                                            value: values.latitude,
                                            error: errors.latitude,
                                            isSubmitting: isSubmitting,
                                        }}
                                    />
                                </Row>
                                <br />
                                <Row>
                                    <EditButtons isSubmitting={isSubmitting} />
                                </Row>
                            </FormikForm>
                        )}
                    </Formik>
                </Container>
            </CollapseWrapper>
        </>
    );
}
