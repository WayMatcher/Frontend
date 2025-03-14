import React, { useContext } from 'react';
import RegisterContext from '../../contexts/RegisterContext';

import { Form as FormikForm, Formik } from 'formik';
import { Container, Col, Row, Button, ButtonGroup } from "react-bootstrap";
import { RegisterVehicleSchema } from '../../formValidations';
import { RegisterVehicleInitialValues } from '../../formInitialValues';
import FormInput from '../FormInput';
import RegisterSteps from '../../types/RegisterSteps';

export default function RegisterVehicle(): React.ReactElement {
    const { setRegisterVehicle, setStep } = useContext(RegisterContext);

    const handleSubmit = (values: typeof RegisterVehicleInitialValues) => {
        setRegisterVehicle(values);
        setStep(RegisterSteps.SUMMARY);
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
                                <FormInput label="Make" name="make" type="text" value={values.make} error={errors.make} />
                                <FormInput label="Model" name="model" type="text" value={values.model} error={errors.model} />
                            </Row>
                            <Row>
                                <FormInput label="Year" name="year" type="number" value={values.year} error={errors.year} />
                                <FormInput label="Seats" name="seats" type="number" value={values.seats} error={errors.seats} />
                            </Row>
                            <Row>
                                <FormInput label="License Plate" name="license_plate" type="text" value={values.license_plate} error={errors.license_plate} />
                            </Row>
                            <br />
                            <Row>
                                <Col>
                                    <ButtonGroup>
                                        <Button type='button' onClick={() => setStep(RegisterSteps.ADDRESS)}>Previous</Button>
                                        <Button type='submit'>Register</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </FormikForm>
                    )}
                </Formik>
            </Container>
        </>
    )
}