import { useState } from 'react';
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useNavigate } from 'react-router-dom';
import { Form, Button, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import ErrorModal from '../../components/ErrorModal';
import { mfaAuthUser } from '../../api/endpoints/user/login';
import { MFAResponse } from '../../types/API';
import { LoginMFASchema } from '../../utils/formValidations';
import FormInput from '../../components/FormInput';
import MFAToken from '../../types/dto/MFAToken';
import User from '../../types/dto/User';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

export default function MFAPage() {
    const isAuthenticated = useIsAuthenticated();
    const authUser = useAuthUser<User>();
    const navigate = useNavigate();
    const signIn = useSignIn();
    const [submissionError, setSubmissionError] = useState<string | null>(null); // Error message to display on submission failure
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    const handleSubmit = async (): Promise<void> => {
        setSubmissionError(null);
        if (isAuthenticated && authUser?.mfaPending) {
            mfaAuthUser(authUser).then((response: MFAResponse) => {
                if (response.succeeded === true && response.user.jwt) {
                    signIn({
                        auth: {
                            token: response.user.jwt
                        },
                        userState: {
                            ...response.user,
                            mfaPending: false,
                        },
                    });
                    navigate('/user/edit');
                } else {
                    setSubmissionError("MFA Failed: " + response.message);
                    handleShowErrorModal();
                }
            }).catch((err: unknown) => {
                setSubmissionError("Unknown error occured: " + (err as Error).message);
                handleShowErrorModal();
            });
        }
    }

    const handleShowErrorModal = () => {
        setShowErrorModal(true);
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
    };

    const initialValues: MFAToken = { mfaToken: '' };
    return (
        <>
            <Container>
                <h1>Multi-Factor-Authentication (MFA)</h1>
                <Formik
                    onSubmit={handleSubmit}
                    initialValues={initialValues}
                    validationSchema={LoginMFASchema}
                >
                    {({ values, handleSubmit, errors, isSubmitting }) => (
                        <FormikForm onSubmit={handleSubmit}>
                            <Row>
                                <FormInput label={'MFA Token'} name={'mfaToken'} type={'text'} placeholder={'Enter MFA Token'} error={errors.mfaToken} value={values.mfaToken} />
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group>
                                        <ButtonGroup>
                                            <Button type="submit" variant='primary' disabled={isSubmitting}>Submit</Button>
                                            <Button type="reset" variant='secondary'>Reset</Button>
                                        </ButtonGroup>
                                    </Form.Group>
                                    <ErrorModal show={showErrorModal} handleClose={handleCloseErrorModal}>
                                        {submissionError}
                                    </ErrorModal>
                                </Col>
                            </Row>
                        </FormikForm>
                    )}
                </Formik>
            </Container>
        </>
    );
}