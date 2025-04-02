import React, { useContext, useState } from 'react';
import classifyText from '@/utils/classifyText';
import { apiForgotPassword } from '@/api/endpoints/user';
import { Alert, Button, Card } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import FormInput from '@/components/FormInput';
import ErrorModalContext from '@/contexts/ErrorModalContext';

/**
 * PasswordForget component allows users to request a password reset link
 * by entering their email address or username.
 */
const PasswordForget: React.FC = () => {
    const { showErrorModal } = useContext(ErrorModalContext); // Context for displaying error modals
    const [success, setSuccess] = useState(false); // State to track if the request was successful
    const [loading, setLoading] = useState(false); // State to track loading status

    // Validation schema for the form
    const validationSchema = Yup.object().shape({
        emailOrUsername: Yup.string()
            .required('Required') // Field is required
            .test('is-email-or-username', 'Invalid email or username', (value) => {
                if (!value) return false;
                const inputType = classifyText(value); // Classify input as email or username
                return inputType === 'email' || inputType === 'username';
            }),
    });

    // Initial values for the form
    const initialValues = {
        emailOrUsername: '',
    };

    /**
     * Handles form submission.
     * @param values - The form values containing email or username.
     */
    const handleSubmit = async (values: typeof initialValues) => {
        const inputType = classifyText(values.emailOrUsername); // Determine if it's an email or username
        if (inputType !== 'email' && inputType !== 'username') {
            showErrorModal('Invalid input. Please enter a valid email address or username.');
            throw new Error('Invalid input. Please enter a valid email address or username.');
        }

        try {
            setLoading(true); // Set loading state to true
            await apiForgotPassword(values.emailOrUsername, inputType); // Call API to request password reset
            setLoading(false); // Reset loading state
            setSuccess(true); // Set success state to true
        } catch (error: unknown) {
            if (error instanceof Error)
                showErrorModal('Invalid input. Please enter a valid email address or username.'); // Show error modal
        } finally {
            setLoading(false); // Ensure loading state is reset
        }
    };

    return (
        <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            {(formikProps) => (
                <FormikForm>
                    <Card style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        <Card.Header>
                            <Card.Title>Password Reset</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                Enter your email address or username to receive a password reset link.
                            </Card.Text>
                            {/* Input field for email or username */}
                            <FormInput
                                type='text'
                                name='emailOrUsername'
                                label='Email or Username'
                                placeholder='Enter your email or username'
                                formikProps={formikProps}
                            />
                        </Card.Body>
                        <Card.Footer>
                            {/* Submit button */}
                            <Button type='submit' variant='warning' disabled={loading}>
                                {loading ? 'Loading...' : 'Submit'}
                            </Button>
                            {/* Success message */}
                            {success && <Alert variant={'success'}>Successfully requested Password!</Alert>}
                        </Card.Footer>
                    </Card>
                </FormikForm>
            )}
        </Formik>
    );
};

export default PasswordForget;
