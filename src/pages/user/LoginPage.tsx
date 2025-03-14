import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm } from 'formik';
import { Button, ButtonGroup, Container, Row } from 'react-bootstrap';

import authUser from '../../api/auth';
import APIResponse from '../../types/API';
import classifyText from '../../utils/classifyText';

import UserContext from '../../contexts/UserContext';

import { LoginUserSchema } from '../../utils/formValidations';
import { UserLogin } from '../../types/dto/User';
import ErrorModal from '../../components/ErrorModal';
import CollapseWrapper from '../../components/CollapseWrapper';
import FormInput from '../../components/FormInput';

export default function LoginPage() {
    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);

    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

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
                                    label="Email"
                                    name="userOrEmail" type="email"
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