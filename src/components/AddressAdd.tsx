import Address, { HereApiItem } from '@/types/objects/Address/dto';
import { Formik, Form as FormikForm } from 'formik';
import { useContext } from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import FormInput from './FormInput';
import * as Yup from 'yup';
import { getHEREAddress } from '@/api/endpoints/address';
import ErrorModalContext from '@/contexts/ErrorModalContext';

const AddressAddModal = ({
    showState,
    setAddress,
}: {
    showState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    setAddress: React.Dispatch<React.SetStateAction<Address | null>>;
}) => {
    const [show, setShow] = showState;
    const { showErrorModal } = useContext(ErrorModalContext);
    const getAddress = async (address: string): Promise<Address> => {
        try {
            const response = await getHEREAddress({ q: address });
            const item: HereApiItem = response.data.items[0];

            return {
                address_line1: item.address.label,
                city: item.address.city || '',
                postal_code: item.address.postalCode || '',
                country: item.address.countryCode,
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
            const response = await getAddress(values.address);
            setAddress(response);
            setShow(false);
        } catch (error: unknown) {
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
                                    <Button type='submit'>Save</Button>
                                    <Button
                                        variant='secondary'
                                        onClick={() => {
                                            setShow(false);
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
