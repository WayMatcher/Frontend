import React from 'react';
import { Form as FormikForm, Formik, Field, ErrorMessage } from 'formik';
import { Form, Button, Row, Col, ButtonGroup } from 'react-bootstrap';
import { RegisterVehicleSchema } from '../../../formValidations';
import { RegisterVehicleInitialValues } from '../../../formInitialValues';

export function RegisterVehicle(): React.ReactElement {

    const handleSubmit = (values: typeof RegisterVehicleInitialValues) => {
        console.log(values);
    }

    return (
        <>
            <h1>Register Vehicle</h1>
            <Formik
                initialValues={RegisterVehicleInitialValues}
                validationSchema={RegisterVehicleSchema}
                onSubmit={handleSubmit}
            >

                {({ values, errors }) => (
                    <FormikForm>
                        <Row>
                            <Col>
                                <Field>
                                    <Form.Label htmlFor="make">Make</Form.Label>
                                    <Form.Control
                                        id="make"
                                        name="make"
                                        type="text"
                                        value={values.make}
                                        isValid={!!values.make && !errors.make}
                                        isInvalid={!!errors.make}
                                    />
                                    <ErrorMessage name="make" />
                                </Field>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ButtonGroup>
                                    <Button type='submit'>Submit</Button>
                                    <Button type='reset'>Reset</Button>
                                </ButtonGroup>
                            </Col>
                        </Row>
                    </FormikForm>
                )}

            </Formik>
        </>
    )

}