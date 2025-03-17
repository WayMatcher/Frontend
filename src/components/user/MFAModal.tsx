import { Modal, Button, Row } from "react-bootstrap";

import { Formik, Form as FormikForm } from "formik";
import FormInput from "../FormInput";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useState } from "react";
import { mfaAuthUser } from "../../api/endpoints/user/login";
import { MFAResponse } from "../../types/API";
import { UserLogin } from "../../types/dto/User";
import MFAToken from "../../types/dto/MFAToken";

interface MFAModalProps {
    show: boolean | undefined;
    userLogin: UserLogin | undefined;
}

export default function MFAModal({ show, userLogin }: MFAModalProps) {

    const initialValues: MFAToken = { mfaToken: '' };
    const [submissionError, setSubmissionError] = useState<string | null>(null); // Error message to display on submission failure
    const navigate = useNavigate();
    const signIn = useSignIn();

    const handleSubmit = async (values: MFAToken): Promise<void> => {
        setSubmissionError(null);
        mfaAuthUser(userLogin, values).then((response: MFAResponse) => {
            if (response.succeeded === true && response.jwt) {
                signIn({
                    auth: {
                        token: response.jwt
                    },
                    userState: response.user,
                });
                navigate('/user/edit');
            } else {
                setSubmissionError("MFA Failed: " + response.message);
            }
        }).catch((err: unknown) => {
            setSubmissionError("Unknown error occured: " + (err as Error).message);
        });
    }

    return (
        <Modal show={show} centered>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}

            >
                {({ values, errors, isSubmitting }) => (
                    <FormikForm>
                        <Modal.Header>
                            <Modal.Title>Two Factor Authentication</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <FormInput
                                    label="MFA Token"
                                    name="mfaToken" type="text"
                                    placeholder="Enter 4-digit code"
                                    value={values.mfaToken} error={errors.mfaToken}
                                />
                            </Row>
                            <Row>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary">Cancel</Button>
                            <Button type="submit">{isSubmitting ? 'Submitting...' : 'Submit'}</Button>
                            {submissionError ? <p>{submissionError}</p> : null}
                        </Modal.Footer>
                    </FormikForm>
                )}
            </Formik>
        </Modal>
    )
}