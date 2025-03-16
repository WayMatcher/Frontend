import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm } from 'formik';
import { Button, ButtonGroup, Container, Row } from 'react-bootstrap';

import authUser from '../../api/endpoints/user/login';
import { LoginResponse } from '../../types/API';
import classifyText from '../../utils/classifyText';

import useSignIn from 'react-auth-kit/hooks/useSignIn';

import { LoginUserSchema } from '../../utils/formValidations';
import { UserLogin } from '../../types/dto/User';
import ErrorModal from '../../components/ErrorModal';
import CollapseWrapper from '../../components/CollapseWrapper';
import FormInput from '../../components/FormInput';

export default function LoginPage() {
    const navigate = useNavigate();

    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    const signIn = useSignIn();

    const handleSubmit = async (values: UserLogin) => {
        // Reset error message
        setSubmissionError(null);

        // Call API to authenticate user
        authUser({
            userOrEmail: values.userOrEmail,
            username: (classifyText(values.userOrEmail) === 'username') ? values.userOrEmail : '',
            email: (classifyText(values.userOrEmail) === 'email') ? values.userOrEmail : '',
            password: values.password,
        }).then((response: LoginResponse) => {
            // If login is successful, set user context
            if (response.succeeded === true && response.user.jwt) {
                signIn({
                    auth: {
                        token: response.user?.jwt
                    },
                    userState: {
                        username: (classifyText(values.userOrEmail) === 'username') ? values.userOrEmail : '',
                        email: (classifyText(values.userOrEmail) === 'email') ? values.userOrEmail : '',
                        mfa_verfied: false,
                    },
                });
            } else {
                // If login failed, set error message
                setSubmissionError("Login Failed: " + response.message); // Sets error message if login failed
                handleShowErrorModal(); // Shows error modal
            }
        }).catch((err: unknown) => {
            // If unknown error occured, set error message
            setSubmissionError("Unknown error occured: " + (err as Error).message);
            handleShowErrorModal(); // Shows error modal
        });
    };


    const handleShowErrorModal = () => {
        setShowErrorModal(true);
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
    };

    const initialValues: UserLogin = {
        username: '',
        email: '',
        userOrEmail: '',
        password: '',
    };

    return (
        <CollapseWrapper>
            <Container className='loginContainer'>
                <Formik
                    onSubmit={handleSubmit}
                    validateOnChange={true}
                    initialValues={initialValues}
                    validationSchema={LoginUserSchema}
                >
                    {({ values, errors, isSubmitting }) => (
                        <FormikForm className="loginForm">
                            <Row>
                                <FormInput
                                    label="Email or Username"
                                    name="userOrEmail" type="text"
                                    placeholder="Enter username or e-mail address"
                                    value={values.userOrEmail} error={errors.userOrEmail}
                                />
                            </Row>
                            <Row>
                                <FormInput
                                    label="Password"
                                    name="password" type="password"
                                    placeholder="Enter password"
                                    value={values.password} error={errors.password}
                                />
                            </Row>
                            <br />
                            <ButtonGroup>
                                <Button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Logging in...' : 'Login'}
                                </Button>
                                <Button
                                    className='btn btn-secondary'
                                    type='reset'
                                    onClick={() => navigate('/user/register')}
                                >
                                    Register
                                </Button>
                            </ButtonGroup>
                            <ErrorModal show={showErrorModal} handleClose={handleCloseErrorModal}>
                                {submissionError}
                            </ErrorModal>
                        </FormikForm>
                    )}
                </Formik>
            </Container>
        </CollapseWrapper>
    );
};