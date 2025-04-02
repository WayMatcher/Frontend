import React, { useContext, useEffect } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { useSearchParams } from 'react-router-dom';
import { apiChangePassword } from '@/api/endpoints/user';
import { Alert, Button, Card, Row } from 'react-bootstrap';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import FormInput from '@/components/FormInput';

/**
 * PasswordChange component allows users to change their password using a token from the URL.
 * It validates the input and communicates with the backend API to update the password.
 */
const PasswordChange: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('hash'); // Extract the token from the URL query parameters.

    const { showErrorModal } = useContext(ErrorModalContext); // Context for displaying error modals.
    const [loading, setLoading] = React.useState<boolean>(false); // State to track loading status.
    const [success, setSuccess] = React.useState<boolean>(false); // State to track success status.
    const [enabled, setEnabled] = React.useState<boolean>(false); // State to enable/disable form inputs.

    // Validation schema for the form using Yup.
    const validationSchema = Yup.object({
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters') // Minimum password length validation.
            .required('Password is required'), // Password is mandatory.
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match') // Ensure passwords match.
            .required('Confirm Password is required'), // Confirm password is mandatory.
    });

    // Initial values for the form fields.
    const initialValues = {
        password: '',
        confirmPassword: '',
    };

    /**
     * Handles form submission to change the password.
     * @param values - The form values containing the new password and confirmation.
     */
    const handleSubmit = async (values: typeof initialValues) => {
        if (!token) {
            // Show error if the token is missing.
            showErrorModal('Invalid URL parameters');
            throw new Error('Invalid URL parameters');
        }

        try {
            setLoading(true); // Set loading state to true.
            await apiChangePassword(token, values.password); // Call API to change the password.
            setSuccess(true); // Set success state to true on successful password change.
            setLoading(false);
        } catch (error) {
            // Show error modal if an error occurs during the API call.
            showErrorModal('An error occurred: ' + (error as Error).message);
        } finally {
            setLoading(false); // Reset loading state.
        }
    };

    // Effect to enable/disable form inputs based on the presence of the token.
    useEffect(() => {
        if (!token) {
            setEnabled(false); // Disable form if token is missing.
        } else {
            setEnabled(true); // Enable form if token is present.
        }
    }, [token, showErrorModal]);

    return (
        <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            {(formikProps) => (
                <FormikForm>
                    <Card style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <Card.Header>
                            <Card.Title>Change Password</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>Enter your new password and confirm it to change your password.</Card.Text>
                            <Row>
                                {/* Input for the new password */}
                                <FormInput
                                    name='password'
                                    label='New Password'
                                    type='password'
                                    placeholder='Enter new password'
                                    formikProps={formikProps}
                                    readOnly={!enabled} // Disable input if form is not enabled.
                                />
                                {/* Input for confirming the new password */}
                                <FormInput
                                    name='confirmPassword'
                                    label='Confirm Password'
                                    type='password'
                                    placeholder='Enter same password again'
                                    formikProps={formikProps}
                                    readOnly={!enabled} // Disable input if form is not enabled.
                                />
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            {/* Submit button for changing the password */}
                            <Button
                                type='submit'
                                variant='danger'
                                disabled={formikProps.isSubmitting || loading || !enabled} // Disable button if loading or form is not enabled.
                            >
                                Change Password
                            </Button>
                            {/* Success message */}
                            {success && <Alert>Password changed successfully!</Alert>}
                        </Card.Footer>
                    </Card>
                </FormikForm>
            )}
        </Formik>
    );
};

export default PasswordChange;
