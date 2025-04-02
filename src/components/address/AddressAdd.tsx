import Address, { HereApiItem } from '@/types/objects/Address/dto';
import { Formik, Form as FormikForm } from 'formik';
import { useContext, useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import FormInput from '@/components/FormInput';
import * as Yup from 'yup';
import { getHEREAddress } from '@/api/endpoints/address';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import LoadingOverlay from '@/components/LoadingOverlay';

/**
 * AddressAddModal component allows users to add an address by fetching data from the HERE API.
 * @param {Object} props - Component props.
 * @param {React.Dispatch<React.SetStateAction<Address | null>>} props.setAddress - Function to set the selected address.
 * @returns {JSX.Element} The rendered AddressAddModal component.
 */
const AddressAddModal = ({ setAddress }: { setAddress: React.Dispatch<React.SetStateAction<Address | null>> }) => {
    const { showErrorModal } = useContext(ErrorModalContext); // Context for displaying error modals.
    const [isLoading, setIsLoading] = useState(false); // State to manage loading overlay visibility.

    /**
     * Fetches address details from the HERE API.
     * @param {string} address - The address string to search for.
     * @returns {Promise<Address>} The formatted address object.
     * @throws Will throw an error if the API call fails.
     */
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
            showErrorModal('Error fetching address'); // Show error modal if API call fails.
            throw error;
        }
    };

    const initialValues = { address: '' }; // Initial form values.

    const validationSchema = Yup.object({
        address: Yup.string().required('Address is required'), // Validation schema for the form.
    });

    /**
     * Handles form submission.
     * @param {typeof initialValues} values - The form values.
     */
    const onSubmit = async (values: typeof initialValues) => {
        try {
            setIsLoading(true); // Show loading overlay.
            const response = await getAddress(values.address); // Fetch address details.
            setAddress(response); // Update the parent component with the fetched address.
            setIsLoading(false); // Hide loading overlay.
        } catch (error: unknown) {
            if (error instanceof Error) showErrorModal(error.message); // Show error modal if an error occurs.
            throw error;
        }
    };

    return (
        <LoadingOverlay isLoading={isLoading}>
            <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
                {(formikProps) => (
                    <FormikForm>
                        <Row className='mb-3'>
                            {/* Input field for entering the address */}
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
                                {/* Submit button */}
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
