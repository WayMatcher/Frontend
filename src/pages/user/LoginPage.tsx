import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm } from 'formik';
import { Button, ButtonGroup, Container, Row } from 'react-bootstrap';

import authUser from '../../api/endpoints/user/login';
import { LoginResponse } from '../../types/API';
import classifyText from '../../utils/classifyText';

import { LoginUserSchema } from '../../utils/formValidations';
import { UserLogin } from '../../types/dto/User';
import ErrorModal from '../../components/ErrorModal';
import CollapseWrapper from '../../components/CollapseWrapper';
import FormInput from '../../components/FormInput';
import MFAModal from '../../components/user/MFAModal';

export default function LoginPage() {
    const navigate = useNavigate();

    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [showMFAModal, setShowMFAModal] = useState<boolean>(false);
    const [userLogin, setUserLogin] = useState<UserLogin>();

    const handleSubmit = async (values: UserLogin) => {
        // Reset error message
        setSubmissionError(null);

        const userLogin = {
            userOrEmail: values.userOrEmail,
            username: (classifyText(values.userOrEmail) === 'username') ? values.userOrEmail : '',
            email: (classifyText(values.userOrEmail) === 'email') ? values.userOrEmail : '',
            password: values.password,
        };

        setUserLogin(userLogin);

        // Call API to authenticate user
        authUser(userLogin).then((response: LoginResponse) => {
            if (response.succeeded === true) {
                setShowMFAModal(true);
            } else {
                setSubmissionError(response.message);
                handleShowErrorModal();
            }
        });
    }

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
        <>
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
            <MFAModal show={showMFAModal} userLogin={userLogin} />
        </>
    );
};