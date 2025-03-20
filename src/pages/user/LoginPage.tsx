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
import User from '@/types/objects/User/dto';

export default function LoginPage() {
    const navigate = useNavigate();

    const [submissionError, setSubmissionError] = useState<string | null>(null);
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
    const [showMFAModal, setShowMFAModal] = useState<boolean>(false);
    const [userLogin, setUserLogin] = useState<{ username: string; email: string }>();

    const handleSubmit = async (values: { user?: User; userOrEmail: string; password: string }) => {
        // Reset error message
        setSubmissionError(null);
        if (!values.userOrEmail || !values.password) {
            setSubmissionError('Please fill in all fields');
            setShowErrorModal(true);
            return;
        }

        try {
            const tempUser = {
                username: classifyText(values.userOrEmail) === 'username' ? values.userOrEmail : '',
                email: classifyText(values.userOrEmail) === 'email' ? values.userOrEmail : '',
            };

            await apiAuthUser({ ...tempUser, password: values.password });

            setUserLogin(tempUser);

            setShowMFAModal(true);
        } catch (error: unknown) {
            setSubmissionError((error as Error).message);
            setShowErrorModal(true);
        }
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
                        initialValues={{
                            user: { ...userLogin, username: '', email: '' },
                            userOrEmail: '',
                            password: '',
                        }}
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
            <MFAModal show={showMFAModal} user={userLogin} />
        </>
    );
}
