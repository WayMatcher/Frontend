import Address, { HereApiItem } from '@/types/objects/Address/dto';
import { Formik, Form as FormikForm } from 'formik';
import { useContext, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import FormInput from './FormInput';
import * as Yup from 'yup';
import { getHEREAddress } from '@/api/endpoints/address';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import LoadingOverlay from './LoadingOverlay';

const AddressAddModal = ({ setAddress }: { setAddress: React.Dispatch<React.SetStateAction<Address | null>> }) => {
    const { showErrorModal } = useContext(ErrorModalContext);
    const [isLoading, setIsLoading] = useState(false);
    const getAddress = async (address: string): Promise<Address> => {
        try {
            const response = await getHEREAddress({ q: address });
            const item: HereApiItem = response.data.items[0];

            return {
                addressLine1: item.address.label,
                city: item.address.city || '',
                postalcode: item.address.postalCode || '',
                country: item.address.countryName,
                countrycode: item.address.countryCode,
                region: item.address.state,
                state: item.address.state,
                longitude: item.position.lng,
                latitude: item.position.lat,
                street: item.address.street + ' ' + item.address.houseNumber || '',
            };
        } catch (error) {
            showErrorModal('Error fetching address');
            throw error;
        }
    };

    const initialValues = { address: '' };

    const validationSchema = Yup.object({
        address: Yup.string().required('Address is required'),
    });

    const onSubmit = async (values: typeof initialValues) => {
        try {
            setIsLoading(true);
            const response = await getAddress(values.address);
            setAddress(response);
            setIsLoading(false);
        } catch (error: unknown) {
            if (error instanceof Error) showErrorModal(error.message);
            throw error;
        }
    };

    return (
        <LoadingOverlay isLoading={isLoading}>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
                {(formikProps) => (
                    <FormikForm>
                        <Row className='mb-3'>
                            <FormInput
                                type='text'
                                label='Address'
                                name='address'
                                placeholder='Enter address'
                                formikProps={formikProps}
                            />
                        </Row>
                        <Row>
                            <Col>
                                <Button type='submit' disabled={formikProps.isSubmitting}>
                                    {formikProps.isSubmitting ? 'Saving...' : 'Save'}
                                </Button>
                            </Col>
                        </Row>
                    </FormikForm>
                )}
            </Formik>
        </LoadingOverlay>
    );
};

export default AddressAddModal;
