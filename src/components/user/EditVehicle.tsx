import React, { useContext } from 'react';

import { Form as FormikForm, Formik } from 'formik';
import { Container, Row } from "react-bootstrap";
import { EditVehicleSchema } from '../../utils/formValidations';
import FormInput from '../FormInput';
import CollapseWrapper from '../CollapseWrapper';
import Vehicle from '../../types/dto/Vehicle';

import UserContext from '../../contexts/UserContext';

export default function EditVehicle(): React.ReactElement {
    const { user, setUser } = useContext(UserContext);

    const handleSubmit = (values: Vehicle) => {
        setUser({
            ...user,
            vehicle: values,
            username: user?.username || '',
            email: user?.email || '',
        });
    }

    const initialValues: Vehicle = {
        make: user?.vehicle?.make || '',
        model: user?.vehicle?.model || '',
        year: user?.vehicle?.year || 2025,
        seats: user?.vehicle?.seats || 4,
        license_plate: user?.vehicle?.license_plate || '',
        additional_description: user?.vehicle?.additional_description || '',
    }

    return (
        <>
            <h2>Vehicle</h2>
            <CollapseWrapper>
                <Container>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={EditVehicleSchema}
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
                            </FormikForm>
                        )}
                    </Formik>
                </Container>
            </CollapseWrapper>
        </>
    )
}