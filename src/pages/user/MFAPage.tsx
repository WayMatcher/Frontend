import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import { Formik, Form as FormikForm } from 'formik';
import ErrorModal from '../../components/ErrorModal';
import { mfaAuthUser } from '../../api/auth';
import { MFAResponse } from '../../types/API';
import UserContext from '../../contexts/UserContext';
import { LoginMFASchema } from '../../formValidations';
import FormInput from '../../components/FormInput';
import { LoginMFAInitialValues } from '../../formInitialValues';
import MFAToken from '../../types/dto/MFAToken';


export default function MFAPage() {
    const navigate = useNavigate(); // Navigation hook

    const { user, setUser } = useContext(UserContext); // Get user context

    const [submissionError, setSubmissionError] = useState<string | null>(null); // Error message to display on submission failure
    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);





    /**
     * Handles the submission of the MFA form.
     *
     * @param values - The form values, which should match the shape of `initialValues`.
     * @param object - An object containing the `setSubmitting` function to control the form's submitting state.
     * @param object.setSubmitting - A function to set the submitting state of the form.
     *
     * @returns {Promise<void>} A promise that resolves when the submission handling is complete.
     *
     * @throws {Error} Throws an error if an unknown error occurs during the submission process.
     */
    const handleSubmit = async ({ mfaToken }: MFAToken, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }): Promise<void> => {
        setSubmissionError(null);

        // Check if user is defined in context
        if (!user) {
            setSubmissionError("No user defined in context");
            handleShowErrorModal();
            setSubmitting(false);
            return;
        }

        try {
            const result: MFAResponse = await mfaAuthUser(user, mfaToken);
            if (result.succeeded && result.user) {
                // MFA Token verification succeeded
                setUser({ ...user, jwt: result.user.jwt, mfaPending: false });
                navigate('/user/edit');
            } else {
                // MFA Token verification failed
                setSubmissionError(result.succeeded ? "No User received through API" : "MFA Token verification failed");
                handleShowErrorModal();
            }
        } catch (error: unknown) {
            setSubmissionError("Unknown error occurred: " + (error as Error).message);
            handleShowErrorModal();
        } finally {
            setSubmitting(false);
        }
    }


    const handleShowErrorModal = () => {
        setShowErrorModal(true);
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
    };

    // Check if user is defined in context
    if (user && user.mfaPending === false) {
        navigate('/user/edit');


    } else if (user && user.mfaPending) {
        // Redirect to user edit page if MFA is not pending
        return (
            <>
                <Container>
                    <h1>Multi-Factor-Authentication (MFA)</h1>
                    <Formik
                        onSubmit={handleSubmit}
                        validateOnChange={true}
                        initialValues={LoginMFAInitialValues}
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
        )
    } else {
        // Redirect to login page if user is not defined
        console.error("User not defined in context");
        navigate('/user/login');
        return null;
    }
};