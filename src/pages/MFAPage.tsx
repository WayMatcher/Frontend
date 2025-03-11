import { Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import ErrorModal from '../components/ErrorModal';
import * as Yup from 'yup';
import { useState } from 'react';


const MFAPage: React.FC = () => {
    const [submissionError, setSubmissionError] = useState<string | null>(null);

    const validationSchema = Yup.object({
        mfaToken: Yup.string().required('Please enter MFA Token').matches(/^[0-9]{6}$/, 'MFA Token must be 6 digits'),
    });
    const initialValues = {
        mfaToken: '',
    };

    const onSubmit = async (values: typeof initialValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        console.log(values);
        setSubmitting(false);
    }

    const [showErrorModal, setShowErrorModal] = useState<boolean>(false);

    const handleShowErrorModal = () => {
        setShowErrorModal(true);
    };

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
    };

    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
            >
                <Form>
                    <Form.Group>
                        <Form.Label htmlFor="mfaToken">MFA Token</Form.Label>

                        <Field
                            type="text"
                            id="mfaToken"
                            name="mfaToken"
                            placeholder="Enter MFA Token"
                            className="form-control"
                        >
                            <Form.Control
                                type="text"
                                id="mfaToken"
                                name="mfaToken"
                                placeholder="Enter MFA Token"
                                className="form-control"
                            />
                        </Field>
                    </Form.Group>
                    <ErrorModal show={showErrorModal} handleClose={handleCloseErrorModal}>
                        {submissionError}
                    </ErrorModal>
                </Form>
            </Formik>
        </>
    );
};

export default MFAPage;