import { Modal, Button, Row } from 'react-bootstrap';

import { Formik, Form as FormikForm } from 'formik';
import FormInput from '../FormInput';
import { useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useState } from 'react';
import API from '../../api/api';
import { apiAuthMFA } from '@/api/endpoints/user';
import User from '@/types/User/dto';

const api = new API();

interface MFAModalProps {
    show: boolean | undefined;
    userLogin: User | undefined;
}

export default function MFAModal({ show, userLogin }: MFAModalProps) {
    const initialValues = { mfaToken: '' };
    const [submissionError, setSubmissionError] = useState<string | null>(null); // Error message to display on submission failure
    const navigate = useNavigate();
    const signIn = useSignIn();

    const handleSubmit = async (values: { mfaToken: string }): Promise<void> => {
        setSubmissionError(null);

        if (userLogin && userLogin.email && userLogin.username) {
            const mfaTokenModel = {
                token: values.mfaToken,
                email: userLogin?.email,
                username: userLogin?.username,
            };

            const response = await apiAuthMFA(mfaTokenModel);

            signIn({
                auth: {
                    token: response.jwt,
                    type: 'Bearer',
                },
                userState: response.user,
            });

            navigate('/');
        }
    };

    return (
        <Modal show={show} centered>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, errors, isSubmitting }) => (
                    <FormikForm>
                        <Modal.Header>
                            <Modal.Title>Two Factor Authentication</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <FormInput
                                    label='MFA Token'
                                    name='mfaToken'
                                    type='text'
                                    placeholder='Enter 4-digit code'
                                    formikData={{ value: values.mfaToken, error: errors.mfaToken, isSubmitting }}
                                />
                            </Row>
                            <Row></Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant='secondary'>Cancel</Button>
                            <Button type='submit'>{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
                            {submissionError ? <p>{submissionError}</p> : null}
                        </Modal.Footer>
                    </FormikForm>
                )}
            </Formik>
        </Modal>
    );
}
