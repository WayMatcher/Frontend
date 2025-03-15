import React, { useContext } from 'react';
import RegisterContext from '../../contexts/RegisterContext';

import { Form as FormikForm, Formik } from 'formik';
import { Container, Row } from "react-bootstrap";
import { RegisterVehicleSchema } from '../../utils/formValidations';
import FormInput from '../FormInput';
import RegisterSteps from '../../types/RegisterSteps';
import CollapseWrapper from '../CollapseWrapper';
import Vehicle from '../../types/dto/Vehicle';
import RegisterNavButtons from './RegisterNavButtons';

export default function RegisterVehicle(): React.ReactElement {
    const { registerVehicle, setRegisterVehicle, setStep } = useContext(RegisterContext);

    const handleSubmit = (values: Vehicle) => {
        setRegisterVehicle(values);
        setStep(RegisterSteps.SUMMARY);
    }

    const initialValues: Vehicle = {
        make: '',
        model: '',
        year: 2025,
        seats: 4,
        license_plate: '',
        additional_description: ''
    }

    return (
        <>
            <h2>Vehicle</h2>
            <CollapseWrapper>
                <Container>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={RegisterVehicleSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors }) => (
                            <FormikForm>
                                <Row>
                                    <FormInput label="Make" name="make" type="text" value={registerVehicle?.make || values.make} error={errors.make} />
                                    <FormInput label="Model" name="model" type="text" value={registerVehicle?.model || values.model} error={errors.model} />
                                </Row>
                                <Row>
                                    <FormInput label="Year" name="year" type="number" value={registerVehicle?.year || values.year} error={errors.year} />
                                    <FormInput label="Seats" name="seats" type="number" value={registerVehicle?.seats || values.seats} error={errors.seats} />
                                </Row>
                                <Row>
                                    <FormInput label="License Plate" name="license_plate" type="text" value={registerVehicle?.license_plate || values.license_plate} error={errors.license_plate} />
                                </Row>
                                <br />
                                <RegisterNavButtons prevStep={RegisterSteps.USER} nextStep={RegisterSteps.SUMMARY} />
                            </FormikForm>
                        )}
                    </Formik>
                </Container>
            </CollapseWrapper>
        </>
    )
}