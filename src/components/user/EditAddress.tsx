import React, { useContext } from 'react';

import { Formik, Form as FormikForm } from 'formik';
import { Container, Row } from 'react-bootstrap';
import FormInput from '@/components/FormInput';
import CollapseWrapper from '@/components/CollapseWrapper';
import Address from '@/types/objects/Address/dto';
import User from '@/types/objects/User/dto';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import { apiGetAddress, apiSetAddress } from '@/api/endpoints/address';
import { RegisterAddressSchema } from '@/utils/formValidations';
import EditButtons from './EditButtons';

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

    const validationSchema = RegisterAddressSchema;

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

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            if (authUser?.userId === undefined) {
                showErrorModal('No user logged in!');
                return;
            }

            const response = await apiSetAddress({ address: values, userId: authUser?.userId });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <h2>Address</h2>
            <CollapseWrapper>
                <Container>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {(formikProps) => (
                            <FormikForm>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Street'
                                        name='street'
                                        type='text'
                                        placeholder='1234 Main St'
                                        isLoading={isLoading}
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Postal Code'
                                        name='postal_code'
                                        type='text'
                                        placeholder='12345'
                                        isLoading={isLoading}
                                        formikProps={formikProps}
                                    />
                                    <FormInput
                                        label='Region'
                                        name='region'
                                        type='text'
                                        placeholder='Region'
                                        isLoading={isLoading}
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Country'
                                        name='countrycode'
                                        type='text'
                                        placeholder='Country'
                                        isLoading={isLoading}
                                        formikProps={formikProps}
                                    />
                                    <FormInput
                                        label='State'
                                        name='state'
                                        type='text'
                                        placeholder='State'
                                        isLoading={isLoading}
                                        formikProps={formikProps}
                                    />
                                    <FormInput
                                        label='City'
                                        name='city'
                                        type='text'
                                        placeholder='City'
                                        isLoading={isLoading}
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Address Line 1'
                                        name='address_line1'
                                        type='text'
                                        placeholder='Address Line 1'
                                        isLoading={isLoading}
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Address Line 2'
                                        name='address_line2'
                                        type='text'
                                        placeholder='Address Line 2'
                                        isLoading={isLoading}
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Longitude'
                                        name='longitude'
                                        type='number'
                                        placeholder={47.8117211}
                                        isLoading={isLoading}
                                        formikProps={formikProps}
                                    />
                                    <FormInput
                                        label='Latitude'
                                        name='latitude'
                                        type='number'
                                        placeholder={13.0322547}
                                        isLoading={isLoading}
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <br />
                                <EditButtons isLoading={isLoading} isSubmitting={formikProps.isSubmitting} />
                            </FormikForm>
                        )}
                    </Formik>
                </Container>
            </CollapseWrapper>
        </>
    );
}
