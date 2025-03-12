import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, ButtonGroup, Container, Row, Col } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm } from 'formik';
import * as Yup from 'yup';
import ErrorModal from '../../components/ErrorModal';
import { mfaAuthUser } from '../../api/auth';
import { MFAResponse } from '../../types/API';
import UserContext from '../../contexts/UserContext';


const MFAPage: React.FC = () => {
    const [submissionError, setSubmissionError] = useState<string | null>(null); // Error message to display on submission failure
    const { user, setUser } = useContext(UserContext); // Get user context
    const navigate = useNavigate(); // Navigation hook

    // Validation schema for the form
    const validationSchema = Yup.object({
        mfaToken: Yup.string().required('Please enter MFA Token').matches(/^[0-9]{4}$/, 'MFA Token must be 4 digits'),
    });

    // Initial values for the form
    const initialValues = { mfaToken: '' };


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
    const handleSubmit = async (values: typeof initialValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }): Promise<void> => {
        setSubmissionError(null);

        // Check if user is defined in context
        if (!user) {
            setSubmissionError("No user defined in context");
            handleShowErrorModal();
            setSubmitting(false);
            return;
        }

        try {
            const result: MFAResponse = await mfaAuthUser(user, values.mfaToken);
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

    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

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
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {({ values, handleSubmit, errors, isSubmitting }) => (
                            <FormikForm onSubmit={handleSubmit}>
                                <Row>
                                    <Col>
                                        <Form.Group>
                                            <Form.Label htmlFor="mfaToken">MFA Token</Form.Label>
                                            <Field
                                                type="text"
                                                id="mfaToken"
                                                name="mfaToken"
                                                placeholder="Enter MFA Token"
                                                className="form-control"
                                                value={values.mfaToken}
                                            />
                                            <Form.Control.Feedback type="invalid">{errors.mfaToken}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
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

export default MFAPage;