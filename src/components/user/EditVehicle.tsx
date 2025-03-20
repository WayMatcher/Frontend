import React, { useEffect, useState } from 'react';
import { Form as FormikForm, Formik } from 'formik';
import { Container, Row } from 'react-bootstrap';
import { EditVehicleSchema } from '@/utils/formValidations';
import FormInput from '@/components/FormInput';
import CollapseWrapper from '@/components/CollapseWrapper';
import Vehicle from '@/types/Vehicle/dto';
import { apiGetVehicle, apiSetVehicle, RequestVehicle, ResponseVehicle } from '@/api/endpoints/vehicle';
import EditButtons from '@/components/user/EditButtons';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from '@/types/User/dto';
import { FormVehicle, initialValuesVehicle } from '@/types/Vehicle/form';

export default function EditVehicle(): React.ReactElement {
    const [vehicle, setVehicle] = useState<Vehicle>();
    const authUser = useAuthUser<User>();

    useEffect(() => {
        const fetchVehicle = async () => {
            if (!authUser) return;

            const request: RequestVehicle = { userID: authUser.id };
            const response: ResponseVehicle = await apiGetVehicle(request);

            setVehicle({
                license_plate: response.data.license_plate,
                make: response.data.make,
                seats: response.data.seats,
                model: response.data.model,
                year: response.data.year,
                additional_description: response.data.additional_description,
            });
        };
        fetchVehicle();
    });

    const handleSubmit = async (values: FormVehicle) => {
        const request: RequestVehicle = {
            vehicle: {
                license_plate: values.license_plate,
                make: values.make,
                seats: values.seats,
                model: values.model,
                year: values.year,
                additional_description: values.additional_description,
            },
            userID: authUser?.id,
        };

        const response: ResponseVehicle = await apiSetVehicle(request);

        setVehicle({
            license_plate: response.data.license_plate,
            make: response.data.make,
            seats: response.data.seats,
            model: response.data.model,
            year: response.data.year,
            additional_description: response.data.additional_description,
        });
    };

    const initialValues: FormVehicle = vehicle || initialValuesVehicle;

    return (
        <>
            <h2>Vehicle</h2>
            <CollapseWrapper>
                <Container>
                    <Formik initialValues={initialValues} validationSchema={EditVehicleSchema} onSubmit={handleSubmit}>
                        {({ values, errors, isSubmitting }) => (
                            <FormikForm>
                                <Row>
                                    <FormInput
                                        label='Make'
                                        name='make'
                                        type='text'
                                        formikData={{
                                            value: values.make,
                                            error: errors.make,
                                            isSubmitting: isSubmitting,
                                        }}
                                    />
                                    <FormInput
                                        label='Model'
                                        name='model'
                                        type='text'
                                        formikData={{
                                            value: values.model,
                                            error: errors.model,
                                            isSubmitting: isSubmitting,
                                        }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Year'
                                        name='year'
                                        type='number'
                                        formikData={{
                                            value: values.year,
                                            error: errors.year,
                                            isSubmitting: isSubmitting,
                                        }}
                                    />
                                    <FormInput
                                        label='Seats'
                                        name='seats'
                                        type='number'
                                        formikData={{
                                            value: values.seats,
                                            error: errors.seats,
                                            isSubmitting: isSubmitting,
                                        }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='License Plate'
                                        name='license_plate'
                                        type='text'
                                        formikData={{
                                            value: values.license_plate,
                                            error: errors.license_plate,
                                            isSubmitting: isSubmitting,
                                        }}
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
    );
}
