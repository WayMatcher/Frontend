import React, { useEffect, useState } from 'react';
import { Form as FormikForm, Formik } from 'formik';
import { Container, Row } from "react-bootstrap";
import { EditVehicleSchema } from '../../utils/formValidations';
import FormInput from '../FormInput';
import CollapseWrapper from '../CollapseWrapper';
import Vehicle from '../../types/Vehicle/dto';
import EditProps from '../../types/EditProps';
import { apiGetVehicle, apiSetVehicle } from '../../api/vehicle';
import EditButtons from './EditButtons';

export default function EditVehicle({ setShowErrorModal, setSubmissionError }: EditProps): React.ReactElement {
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            apiGetVehicle().then((response: VehicleResponse) => {
                if (response.succeeded === true) {
                    setVehicle(response.vehicle);
                } else {
                    setSubmissionError(response.message);
                    setShowErrorModal(true);
                }
            }
            ).catch((error: unknown) => {
                console.error('Error fetching vehicle:', error);
                setSubmissionError((error as Error).message);
                setShowErrorModal(true);
            });
        }
        fetchVehicle();
    });

    const handleSubmit = (values: Vehicle) => {
        apiSetVehicle(values).then((response: APIResponse) => {
            if (response.succeeded === true) {
                setVehicle(values);
            } else {
                setSubmissionError(response.message);
                setShowErrorModal(true);
            };
        }).catch((error: unknown) => {
            console.error('Error fetching vehicle:', error);
            setSubmissionError((error as Error).message);
            setShowErrorModal(true);
        });
    }

    const initialValues: Vehicle = {
        make: vehicle?.make || '',
        model: vehicle?.model || '',
        year: vehicle?.year || 2025,
        seats: vehicle?.seats || 4,
        license_plate: vehicle?.license_plate || '',
        additional_description: vehicle?.additional_description || '',
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
                        {({ values, errors, isSubmitting }) => (
                            <FormikForm>
                                <Row>
                                    <FormInput
                                        label="Make" name="make"
                                        type="text"
                                        formikData={{ value: values.make, error: errors.make, isSubmitting: isSubmitting }}
                                    />
                                    <FormInput
                                        label="Model" name="model"
                                        type="text"
                                        formikData={{ value: values.model, error: errors.model, isSubmitting: isSubmitting }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label="Year" name="year"
                                        type="number"
                                        formikData={{ value: values.year, error: errors.year, isSubmitting: isSubmitting }}
                                    />
                                    <FormInput
                                        label="Seats" name="seats"
                                        type="number"
                                        formikData={{ value: values.seats, error: errors.seats, isSubmitting: isSubmitting }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput label="License Plate" name="license_plate"
                                        type="text"
                                        formikData={{ value: values.license_plate, error: errors.license_plate, isSubmitting: isSubmitting }}
                                    />
                                </Row>
                                <br />
                                <Row>
                                    <EditButtons isSubmitting={isSubmitting} />
                                </Row>
                            </FormikForm>
                        )}
                    </Formik>
                </Container>
            </CollapseWrapper>
        </>
    )
}