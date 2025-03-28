import React, { useContext, useState } from 'react';
import classifyText from '@/utils/classifyText';
import { apiForgotPassword } from '@/api/endpoints/user';
import { Alert, Button, Card } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import FormInput from '@/components/FormInput';
import ErrorModalContext from '@/contexts/ErrorModalContext';

const PasswordForget: React.FC = () => {
    const { showErrorModal } = useContext(ErrorModalContext);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const validationSchema = Yup.object().shape({
        emailOrUsername: Yup.string()
            .required('Required')
            .test('is-email-or-username', 'Invalid email or username', (value) => {
                if (!value) return false;
                const inputType = classifyText(value);
                return inputType === 'email' || inputType === 'username';
            }),
    });

    const initialValues = {
        emailOrUsername: '',
    };

    const handleSubmit = async (values: typeof initialValues) => {
        const inputType = classifyText(values.emailOrUsername); // Determine if it's an email or username
        if (inputType !== 'email' && inputType !== 'username') {
            showErrorModal('Invalid input. Please enter a valid email address or username.');
            throw new Error('Invalid input. Please enter a valid email address or username.');
        }

        try {
            setLoading(true);
            await apiForgotPassword(values.emailOrUsername, inputType);
            setLoading(false);
            setSuccess(true);
        } catch (error: unknown) {
            if (error instanceof Error)
                showErrorModal('Invalid input. Please enter a valid email address or username.');
        } finally {
            setLoading(false);
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
                            <FormInput
                                type='text'
                                name='emailOrUsername'
                                label='Email or Username'
                                placeholder='Enter your email or username'
                                formikProps={formikProps}
                            />
                        </Card.Body>
                        <Card.Footer>
                            <Button type='submit' variant='warning' disabled={loading}>
                                {loading ? 'Loading...' : 'Submit'}
                            </Button>
                            {success && <Alert variant={'success'}>successfully requested Password!</Alert>}
                        </Card.Footer>
                    </Card>
                </FormikForm>
            )}
        </Formik>
    );
};

export default PasswordForget;
