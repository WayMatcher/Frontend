import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form as FormikForm } from 'formik';
import { Button, ButtonGroup, Container, Row } from 'react-bootstrap';

import { apiAuthUser } from '@/api/endpoints/user';
import classifyText from '@/utils/classifyText';

import { LoginUserSchema } from '@/utils/formValidations';
import { FormUserLogin } from '@/types/User/form';
import ErrorModal from '@/components/ErrorModal';
import CollapseWrapper from '@/components/CollapseWrapper';
import FormInput from '@/components/FormInput';
import MFAModal from '@/components/user/MFAModal';
import User from '@/types/User/dto';

export default function LoginPage() {
    const navigate = useNavigate();

    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [showMFAModal, setShowMFAModal] = useState<boolean>(false);
    const [userLogin, setUserLogin] = useState<{ username: string; email: string }>();

    const handleSubmit = async (values: FormUserLogin) => {
        // Reset error message
        setSubmissionError(null);
        if (!values.userOrEmail || !values.password) {
            setSubmissionError('Please fill in all fields');
            handleShowErrorModal();
            return;
        }

        const userLogin: { username: string; email: string; password: string } = {
            username: classifyText(values.userOrEmail) === 'username' ? values.userOrEmail : '',
            email: classifyText(values.userOrEmail) === 'email' ? values.userOrEmail : '',
            password: values.password,
        };

        try {
            const response = await apiAuthUser(userLogin);
            setUserLogin({
                username: userLogin.username,
                email: userLogin.email,
            });
            setShowMFAModal(true);
        } catch (err: unknown) {
            setSubmissionError((err as Error).message);
            handleShowErrorModal();
        }
    };

    const handleShowErrorModal = () => {
        setShowErrorModal(true);
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
    };

    return (
        <>
            <CollapseWrapper>
                <Container className='loginContainer'>
                    <Formik
                        onSubmit={handleSubmit}
                        validateOnChange={true}
                        initialValues={LoginUserInitialValues}
                        validationSchema={LoginUserSchema}
                    >
                        {({ values, errors, isSubmitting }) => (
                            <FormikForm className='loginForm'>
                                <Row>
                                    <FormInput
                                        label='Email or Username'
                                        name='userOrEmail'
                                        type='text'
                                        placeholder='Enter username or e-mail address'
                                        formikData={{
                                            value: values.userOrEmail,
                                            error: errors.userOrEmail,
                                            isSubmitting,
                                        }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Password'
                                        name='password'
                                        type='password'
                                        placeholder='Enter password'
                                        formikData={{ value: values.password, error: errors.password, isSubmitting }}
                                    />
                                </Row>
                                <br />
                                <ButtonGroup>
                                    <Button className='btn btn-primary' type='submit' disabled={isSubmitting}>
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
            <MFAModal show={showMFAModal} user={user} />
        </>
    );
}
