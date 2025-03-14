import React, { useContext } from 'react';
import { Form as FormikForm, Formik, Field } from 'formik';
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { RegisterVehicleSchema } from '../../../formValidations';
import { RegisterVehicleInitialValues } from '../../../formInitialValues';
import RegisterContext from '../../../contexts/RegisterContext';
import { RegisterStepProps } from '../../../types/RegisterSteps';

export default function RegisterVehicle({ setStepValidity, step }: RegisterStepProps): React.ReactElement {

    const { setRegisterVehicle } = useContext(RegisterContext);

    const handleSubmit = (values: typeof RegisterVehicleInitialValues) => {
        setRegisterVehicle(values);
        setStepValidity(3, true);
    }

    return (
        <>
            <h2>Vehicle</h2>
            <Container>
                <Formik
                    initialValues={RegisterVehicleInitialValues}
                    validationSchema={RegisterVehicleSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors }) => (
                        <FormikForm>
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Make</Form.Label>
                                    <Field
                                        type="text"
                                        name="make"
                                        value={values.make}
                                        className={`form-control ${errors.make ? 'is-invalid' : ''}`}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.make}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Model</Form.Label>
                                    <Field
                                        type="text"
                                        name="model"
                                        value={values.model}
                                        className={`form-control ${errors.model ? 'is-invalid' : ''}`}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.model}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Year</Form.Label>
                                    <Field
                                        type="number"
                                        name="year"
                                        value={values.year}
                                        className={`form-control ${errors.year ? 'is-invalid' : ''}`}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.year}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Seats</Form.Label>
                                    <Field
                                        type="number"
                                        name="seats"
                                        value={values.seats}
                                        className={`form-control ${errors.seats ? 'is-invalid' : ''}`}
                                    />
                                    <Form.Control.Feedback type="invalid">{errors.seats}</Form.Control.Feedback>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col>
                                    <Button type='submit'>Submit</Button>
                                </Col>
                            </Row>
                        </FormikForm>
                    )}
                </Formik>
            </Container>
        </>
    )
}