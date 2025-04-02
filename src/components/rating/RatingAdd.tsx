import ErrorModalContext from '@/contexts/ErrorModalContext';
import { Formik, Form as FormikForm } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { Alert, Button, Modal, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import FormInput from '../FormInput';
import { apiRateUser } from '@/api/endpoints/user';
import User from '@/types/objects/User/dto';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

/**
 * Component for adding a rating to a user.
 * @param {Object} props - Component props.
 * @param {User} props.user - The user to be rated.
 * @param {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} props.showState - State to control modal visibility.
 */
const RatingAdd = (props: { user: User; showState: [boolean, React.Dispatch<React.SetStateAction<boolean>>] }) => {
    const [user, setUser] = useState<User | undefined>(); // State to store the user being rated.
    const [loading, setLoading] = useState(false); // State to indicate loading status.
    const [success, setSuccess] = useState(false); // State to indicate success status.
    const { showErrorModal } = useContext(ErrorModalContext); // Context for showing error modals.
    const authUser = useAuthUser<User>(); // Hook to get the authenticated user.

    // Update the user state whenever the prop changes.
    useEffect(() => {
        setUser(props.user);
    }, [props.user]);

    // Initial form values.
    const initialValues = {
        rating: 5,
    };

    // Validation schema for the rating form.
    const validationSchema = Yup.object({
        rating: Yup.number()
            .min(1, 'Rating must be at least 1')
            .max(5, 'Rating cannot exceed 5')
            .required('Rating is required'),
    });

    /**
     * Handles form submission to rate a user.
     * @param {Object} values - Form values.
     * @param {number} values.rating - The rating value.
     */
    const onSubmit = async (values: typeof initialValues) => {
        setLoading(true);
        try {
            // Validate user and authenticated user existence.
            if (!user?.userId) {
                showErrorModal('User not found');
                throw new Error('User not found');
            }

            if (!authUser?.userId) {
                showErrorModal('User not authenticated');
                throw new Error('User not authenticated');
            }

            // Submit the rating via API.
            const response = await apiRateUser({
                ratedUserId: user.userId,
                userWhoRatedId: authUser.userId,
                ratingValue: values.rating,
            });

            setUser(response.data); // Update user data with the response.
            setSuccess(true); // Indicate success.
        } catch (error) {
            if (error instanceof Error) {
                showErrorModal(error.message); // Show error modal with the error message.
                setSuccess(false);
                throw error;
            } else {
                console.error(error); // Log unknown errors.
                setSuccess(false);
                throw new Error('An unknown error occurred');
            }
        } finally {
            setLoading(false); // Reset loading state.
        }
    };

    return (
        <Modal show={props.showState[0]} onHide={() => props.showState[1](false)} centered size='sm'>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {(formikProps) => (
                    <FormikForm>
                        <Modal.Header closeButton>
                            <Modal.Title>Rate: {user?.username}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row className='mb-3'>
                                {/* Form input for selecting a rating */}
                                <FormInput
                                    as='select'
                                    name='rating'
                                    label='Rating'
                                    placeholder='Select your rating'
                                    isLoading={loading}
                                    formikProps={formikProps}
                                    selectOptions={[
                                        { name: '1 Star', value: 1 },
                                        { name: '2 Stars', value: 2 },
                                        { name: '3 Stars', value: 3 },
                                        { name: '4 Stars', value: 4 },
                                        { name: '5 Stars', value: 5 },
                                    ]}
                                    type={'select'}
                                    autoFocus
                                />
                            </Row>
                            {/* Display validation error for rating */}
                            {formikProps.errors.rating && formikProps.touched.rating && (
                                <Alert variant='danger'>{formikProps.errors.rating}</Alert>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='secondary' onClick={() => props.showState[1](false)}>
                                Close
                            </Button>
                            <Button variant='primary' type='submit'>
                                Submit Rating
                            </Button>
                        </Modal.Footer>
                        {/* Success message */}
                        {success && (
                            <Alert variant='success' className='mt-3'>
                                User rated successfully
                            </Alert>
                        )}
                    </FormikForm>
                )}
            </Formik>
        </Modal>
    );
};

export default RatingAdd;
