import Address, { HereApiItem } from '@/types/objects/Address/dto';
import { Formik, Form as FormikForm } from 'formik';
import { useContext } from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import FormInput from '@/components/FormInput';
import * as Yup from 'yup';
import { getHEREAddress } from '@/api/endpoints/address';
import ErrorModalContext from '@/contexts/ErrorModalContext';

/**
 * Props for the AddressAddModal component.
 */
interface AddressAddModalProps {
    /**
     * State to control the visibility of the modal.
     */
    showState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    /**
     * Function to set the selected address.
     */
    setAddress: React.Dispatch<React.SetStateAction<Address | null>>;
}

/**
 * Modal component for adding an address.
 * @param {AddressAddModalProps} props - The props for the component.
 * @returns {JSX.Element} The rendered AddressAddModal component.
 */
const AddressAddModal = ({ showState, setAddress }: AddressAddModalProps) => {
    const [show, setShow] = showState; // Destructure modal visibility state.
    const { showErrorModal } = useContext(ErrorModalContext); // Access error modal context.

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

            // Map the API response to the Address object structure.
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
            // Show error modal if the API call fails.
            showErrorModal('Error fetching address');
            throw error;
        }
    };

    // Initial form values.
    const initialValues = { address: '' };

    // Validation schema for the form.
    const validationSchema = Yup.object({
        address: Yup.string().required('Address is required'),
    });

    /**
     * Handles form submission.
     * @param {typeof initialValues} values - The form values.
     */
    const onSubmit = async (values: typeof initialValues) => {
        try {
            const response = await getAddress(values.address); // Fetch address details.
            setAddress(response); // Update the selected address.
            setShow(false); // Close the modal.
        } catch (error: unknown) {
            // Show error modal if an error occurs during submission.
            if (error instanceof Error) showErrorModal(error.message);
            throw error;
        }
    };

    return (
        <>
            <Modal show={show} onHide={() => setShow(false)}>
                <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
                    {(formikProps) => (
                        <FormikForm>
                            <Modal.Header>
                                <Modal.Title>Add Address</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {/* Input field for the address */}
                                <FormInput
                                    type='text'
                                    label='Address'
                                    name='address'
                                    placeholder='Enter address'
                                    formikProps={formikProps}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                <ButtonGroup>
                                    {/* Submit button */}
                                    <Button type='submit'>Save</Button>
                                    {/* Cancel button */}
                                    <Button
                                        variant='secondary'
                                        onClick={() => {
                                            setShow(false); // Close the modal on cancel.
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                </ButtonGroup>
                            </Modal.Footer>
                        </FormikForm>
                    )}
                </Formik>
            </Modal>
        </>
    );
};

export default AddressAddModal;
