import { Modal, Button, Row } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import FormInput from '@/components/FormInput';
import { useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useState } from 'react';
import { apiAuthMFA } from '@/api/endpoints/user';
import { initialValuesMFAToken } from '@/types/objects/User/form';

/**
 * Component for rendering a modal for Multi-Factor Authentication (MFA).
 *
 * @param {Object} props - Component props.
 * @param {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} props.showState - State to control modal visibility.
 * @param {number} props.userLoginID - ID of the user attempting to log in.
 * @returns {JSX.Element} The rendered MFA modal component.
 */
export default function MFAModal({
    showState,
    userLoginID,
}: {
    showState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    userLoginID: number;
}) {
    // State to store submission error messages
    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const [show, setShow] = showState; // Destructure modal visibility state
    const navigate = useNavigate(); // React Router hook for navigation
    const signIn = useSignIn(); // Hook for signing in the user

    /**
     * Handles form submission for MFA token validation.
     *
     * @param {Object} values - Form values.
     * @param {string} values.mfaToken - The MFA token entered by the user.
     * @returns {Promise<void>} A promise that resolves when the submission is complete.
     */
    const handleSubmit = async (values: { mfaToken: string }): Promise<void> => {
        setSubmissionError(null); // Reset any previous error messages

        if (userLoginID != 0) {
            try {
                // Call API to validate MFA token
                const response = await apiAuthMFA({
                    token: values.mfaToken,
                    userID: userLoginID,
                });

                const { jwt, ...tempUser } = response.data;

                if (!jwt) return; // Exit if no JWT is returned

                // Sign in the user and navigate to the events page
                signIn({
                    auth: {
                        token: jwt,
                        type: 'Bearer',
                    },
                    userState: { ...tempUser, id: userLoginID },
                });

                navigate('/events');
            } catch (error) {
                // Handle API errors
                setSubmissionError('Failed to authenticate. Please try again.');
                console.error('MFA submission error:', error);
            }
        } else {
            console.error("UserID doesn't exist", userLoginID);
        }
    };

    return (
        <Modal show={show} centered>
            {/* Formik handles form state and submission */}
            <Formik initialValues={initialValuesMFAToken} onSubmit={handleSubmit}>
                {(formikProps) => (
                    <FormikForm>
                        <Modal.Header>
                            <Modal.Title>Two Factor Authentication</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                {/* Input field for MFA token */}
                                <FormInput
                                    label='MFA Token'
                                    name='mfaToken'
                                    type='text'
                                    placeholder='Enter 4-digit code'
                                    formikProps={formikProps}
                                    autoFocus
                                />
                            </Row>
                            <Row></Row>
                        </Modal.Body>
                        <Modal.Footer>
                            {/* Button to close the modal */}
                            <Button
                                variant='secondary'
                                onClick={() => {
                                    setShow(false);
                                }}
                            >
                                Cancel
                            </Button>
                            {/* Submit button */}
                            <Button type='submit'>{formikProps.isSubmitting ? 'Submitting...' : 'Submit'}</Button>
                            {/* Display submission error if any */}
                            {submissionError ? <p>{submissionError}</p> : null}
                        </Modal.Footer>
                    </FormikForm>
                )}
            </Formik>
        </Modal>
    );
}
