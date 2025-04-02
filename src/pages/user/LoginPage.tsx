import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm } from 'formik';
import { Button, ButtonGroup, Container, Row } from 'react-bootstrap';

import { apiAuthUser } from '@/api/endpoints/user';
import classifyText from '@/utils/classifyText';

import { LoginUserSchema } from '@/utils/formValidations';
import ErrorModal from '@/components/ErrorModal';
import CollapseWrapper from '@/components/CollapseWrapper';
import FormInput from '@/components/FormInput';
import MFAModal from '@/components/user/MFAModal';

export default function LoginPage() {
    const navigate = useNavigate();

    // State to store submission error message
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    // State to control the visibility of the error modal
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    // State to control the visibility of the MFA modal
    const stateMFAModal = useState<boolean>(false);
    const [_, setShowMFAModal] = stateMFAModal;

    // State to store the user login ID after successful authentication
    const [userLoginID, setUserLoginID] = useState<number>(0);

    /**
     * Handles the form submission for user login.
     * @param values - The form values containing userOrEmail and password.
     */
    const handleSubmit = async (values: { userOrEmail: string; password: string }) => {
        // Reset error message
        setSubmissionError(null);

        // Validate that both fields are filled
        if (!values.userOrEmail || !values.password) {
            setSubmissionError('Please fill in all fields');
            setShowErrorModal(true);
            return;
        }

        try {
            // Determine if the input is a username or email
            let tempUser = {
                username: classifyText(values.userOrEmail) === 'username' ? values.userOrEmail : '',
                email: classifyText(values.userOrEmail) === 'email' ? values.userOrEmail : '',
            };

            // Call the API to authenticate the user
            const response = await apiAuthUser({ ...tempUser, password: values.password });

            // Store the user login ID and show the MFA modal
            setUserLoginID(response.data);
            setShowMFAModal(true);
        } catch (error: unknown) {
            // Handle errors and display them in the error modal
            setSubmissionError((error as Error).message);
            setShowErrorModal(true);
        }
    };

    /**
     * Closes the error modal.
     */
    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
    };

    return (
        <>
            {/* Wrapper for collapsible content */}
            <CollapseWrapper>
                <Container className='loginContainer'>
                    {/* Formik form for handling login */}
                    <Formik
                        onSubmit={handleSubmit}
                        initialValues={{
                            userOrEmail: '',
                            password: '',
                        }}
                        validationSchema={LoginUserSchema}
                    >
                        {(formikProps) => (
                            <FormikForm className='loginForm'>
                                {/* Input for username or email */}
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Email or Username'
                                        name='userOrEmail'
                                        type='text'
                                        placeholder='Enter username or e-mail address'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                {/* Input for password */}
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Password'
                                        name='password'
                                        type='password'
                                        placeholder='Enter password'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <br />
                                {/* Buttons for login and navigation to register */}
                                <ButtonGroup>
                                    <Button
                                        className='btn btn-primary'
                                        type='submit'
                                        disabled={formikProps.isSubmitting}
                                    >
                                        {formikProps.isSubmitting ? 'Logging in...' : 'Login'}
                                    </Button>
                                    <Button
                                        className='btn btn-secondary'
                                        type='reset'
                                        onClick={() => navigate('/register')}
                                    >
                                        Register
                                    </Button>
                                </ButtonGroup>
                                {/* Error modal for displaying submission errors */}
                                <ErrorModal show={showErrorModal} handleClose={handleCloseErrorModal}>
                                    {submissionError}
                                </ErrorModal>
                            </FormikForm>
                        )}
                    </Formik>
                </Container>
            </CollapseWrapper>
            {/* MFA modal for multi-factor authentication */}
            <MFAModal showState={stateMFAModal} userLoginID={userLoginID} />
        </>
    );
}
