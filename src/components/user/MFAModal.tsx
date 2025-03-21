import { Modal, Button, Row } from 'react-bootstrap';

import { Formik, Form as FormikForm } from 'formik';
import FormInput from '../FormInput';
import { useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { useState } from 'react';
import { apiAuthMFA } from '@/api/endpoints/user';
import { initialValuesMFAToken } from '@/types/objects/User/form';

interface MFAModalProps {
    show: boolean | undefined;
    userLoginID: number;
}

export default function MFAModal({ show, userLoginID }: MFAModalProps) {
    const [submissionError, setSubmissionError] = useState<string | null>(null); // Error message to display on submission failure
    const navigate = useNavigate();
    const signIn = useSignIn();
    const handleSubmit = async (values: { mfaToken: string }): Promise<void> => {
        setSubmissionError(null);

        if (userLoginID != 0) {
            const response = await apiAuthMFA({
                token: values.mfaToken,
                userID: userLoginID,
            });

            const { jwt, ...tempUser } = response.data;

            if (!jwt) return;

            signIn({
                auth: {
                    token: jwt,
                    type: 'Bearer',
                },
                userState: tempUser,
            });

            navigate('/');
        } else {
            console.error("UserID doesn't exist", userLoginID);
        }
    };

    return (
        <Modal show={show} centered>
            <Formik initialValues={initialValuesMFAToken} onSubmit={handleSubmit}>
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
