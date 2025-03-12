import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container } from 'react-bootstrap';

import { authUser } from '../../api/auth';
import UserContext from '../../contexts/UserContext';
import ErrorModal from '../../components/ErrorModal';
import classifyText from '../../utils/classifyText';
import { UserLogin } from '../../types/dto/User';
import APIResponse from '../../types/API';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    const validationSchema = Yup.object({
        userOrEmail: Yup.string().required('Username or Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const initialValues: UserLogin = {
        username: '',
        email: '',
        userOrEmail: '',
        password: '',
    };

    const handleSubmit = async (values: UserLogin, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        setSubmissionError(null);
        try {
            // Call the authUser function from the API
            const loginResponse: APIResponse = await authUser({
                userOrEmail: values.userOrEmail,
                username: (classifyText(values.userOrEmail) === 'username') ? values.userOrEmail : '',
                email: (classifyText(values.userOrEmail) === 'email') ? values.userOrEmail : '',
                password: values.password,
            });

            // Check if login was successful
            if (loginResponse.succeeded === true) {
                setUser(user); // Sets user context
                navigate('/user/mfa'); // Navigates to MFA page if login was successful
            } else {
                setSubmissionError("Login Failed: " + loginResponse.message); // Sets error message if login failed
                handleShowErrorModal(); // Shows error modal
            }

        } catch (err: unknown) {
            setSubmissionError("Unknown error occured: " + (err as Error).message);
            handleShowErrorModal(); // Shows error modal
        } finally {
            setSubmitting(false);
        }
    };

    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    const handleShowErrorModal = () => {
        setShowErrorModal(true);
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
    };

    return (
        <Container className='loginContainer'>
            <Formik
                onSubmit={handleSubmit}
                validateOnChange={true}
                initialValues={initialValues}
                validationSchema={validationSchema}
            >
                {({ isSubmitting }) => (
                    <FormikForm className="loginForm">
                        <h2>Login</h2>
                        <div className='form-group'>
                            <label htmlFor="userOrEmail">Username or E-Mail Address</label>
                            <Field
                                type="text"
                                id="userOrEmail"
                                name="userOrEmail"
                                placeholder="Enter username or E-Mail Address"
                                className="form-control"
                            />
                            <div className='invalid-feedback'>
                                <ErrorMessage name="userOrEmail" />
                            </div>
                        </div>

                        <div className='form-group'>
                            <label htmlFor="password">Password</label>
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                className="form-control"
                            />
                            <div className='invalid-feedback'>
                                <ErrorMessage name="password" />
                            </div>
                        </div>
                        <br />
                        <div className="form-group mb-3">
                            <div className='btn-group'>
                                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </button>
                                <button
                                    className='btn btn-secondary'
                                    type='reset'
                                    onClick={() => navigate('/user/register')}
                                >
                                    Register
                                </button>
                            </div>
                        </div>
                        <ErrorModal show={showErrorModal} handleClose={handleCloseErrorModal}>
                            {submissionError}
                        </ErrorModal>
                    </FormikForm>
                )}
            </Formik>
        </Container>
    );
};

export default LoginPage;