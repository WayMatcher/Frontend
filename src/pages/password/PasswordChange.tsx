import React, { useContext, useEffect } from 'react';
import { Formik, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import { useSearchParams } from 'react-router-dom';
import { apiChangePassword } from '@/api/endpoints/user';
import { Alert, Button, Card, Row } from 'react-bootstrap';
import ErrorModalContext from '@/contexts/ErrorModalContext';
import FormInput from '@/components/FormInput';

const PasswordChange: React.FC = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('hash');

    const { showErrorModal } = useContext(ErrorModalContext);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const [enabled, setEnabled] = React.useState<boolean>(false);

    const validationSchema = Yup.object({
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm Password is required'),
    });

    const initialValues = {
        password: '',
        confirmPassword: '',
    };

    const handleSubmit = async (values: typeof initialValues) => {
        if (!token) {
            showErrorModal('Invalid URL parameters');
            throw new Error('Invalid URL parameters');
        }

        try {
            setLoading(true);
            await apiChangePassword(token, values.password);
            setSuccess(true);
            setLoading(false);
        } catch (error) {
            showErrorModal('An error occurred: ' + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            setEnabled(false);
        } else {
            setEnabled(true);
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
                                <FormInput
                                    name='password'
                                    label='New Password'
                                    type='password'
                                    placeholder='Enter new password'
                                    formikProps={formikProps}
                                    readOnly={!enabled}
                                />
                                <FormInput
                                    name='confirmPassword'
                                    label='Confirm Password'
                                    type='password'
                                    placeholder='Enter same password again'
                                    formikProps={formikProps}
                                    readOnly={!enabled}
                                />
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <Button
                                type='submit'
                                variant='danger'
                                disabled={formikProps.isSubmitting || loading || !enabled}
                            >
                                Change Password
                            </Button>
                            {success && <Alert>Password changed successfully!</Alert>}
                        </Card.Footer>
                    </Card>
                </FormikForm>
            )}
        </Formik>
    );
};

export default PasswordChange;
