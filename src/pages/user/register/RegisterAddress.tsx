import React, { useContext } from 'react';
import { Form as FormikForm, Formik, Field } from 'formik';
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { RegisterAddressSchema } from '../../../formValidations';
import { RegisterAddressInitialValues } from '../../../formInitialValues';
import RegisterContext from '../../../contexts/RegisterContext';
import RegisterSteps from '../../../types/RegisterSteps';

export default function RegisterAddress({ currentStep, handleNext, handlePrevious, isCompleted, registerSteps, setStepValidity }: RegisterSteps): React.ReactElement {

    const { setRegisterAddress } = useContext(RegisterContext);

    const handleSubmit = (values: typeof RegisterAddressInitialValues) => {
        setRegisterAddress(values);
        setStepValidity(currentStep, true);
    }

    return (
        <>
            <h2>Address</h2>
            <Container>
                <Formik
                    initialValues={RegisterAddressInitialValues}
                    validationSchema={RegisterAddressSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors }) => (
                        <FormikForm>
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Street</Form.Label>
                                    <Field
                                        type="text"
                                        name="street"
                                        value={values.street}
                                        className={`form-control ${errors.street ? 'is-invalid' : ''}`}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.street}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>City</Form.Label>
                                    <Field
                                        type="text"
                                        name="city"
                                        value={values.city}
                                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.city}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Country</Form.Label>
                                    <Field
                                        type="number"
                                        name="country"
                                        value={values.country}
                                        className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.country}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Postal Code</Form.Label>
                                    <Field
                                        type="number"
                                        name="postal_code"
                                        value={values.postal_code}
                                        className={`form-control ${errors.postal_code ? 'is-invalid' : ''}`}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.postal_code}</Form.Control.Feedback>
                                </Form.Group>
                                <br />
                                <Row>
                                    <Col>
                                        <Button type='submit'>Submit</Button>
                                    </Col>
                                </Row>
                            </Row>
                        </FormikForm>
                    )}
                </Formik>
            </Container>
        </>
    )
}