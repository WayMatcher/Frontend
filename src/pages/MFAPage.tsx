import { Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
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
                </Form>
            </Formik>
        </>
    );
};

export default MFAPage;