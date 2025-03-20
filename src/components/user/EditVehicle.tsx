import React, { useEffect, useState } from 'react';
import { Form as FormikForm, Formik } from 'formik';
import { Container, Row } from 'react-bootstrap';
import { EditVehicleSchema } from '@/utils/formValidations';
import FormInput from '@/components/FormInput';
import CollapseWrapper from '@/components/CollapseWrapper';
import Vehicle from '@/types/objects/Vehicle/dto';
import EditProps from '@/types/EditProps';
import { apiGetVehicle, apiSetVehicle } from '@/api/endpoints/vehicle';
import EditButtons from '@/components/user/EditButtons';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import User from '@/types/objects/User/dto';
import { useNavigate } from 'react-router-dom';

export default function EditVehicle({ setShowErrorModal, setSubmissionError }: EditProps): React.ReactElement {
    const [vehicle, setVehicle] = useState<Vehicle | null>(null);
    const authUser = useAuthUser<User>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVehicle = async () => {
            if (!authUser || !authUser.id) return;
            const { data } = await apiGetVehicle({ userID: authUser.id });
            setVehicle(data);
        };
        fetchVehicle();
    });

    const handleSubmit = async (values: Vehicle) => {
        try {
            await apiSetVehicle({
                vehicle: values,
                userID: authUser?.id,
            });
            setVehicle(values);
        } catch (error: unknown) {
            setSubmissionError((error as Error).message);
            setShowErrorModal(true);
        }
    };
    if (!vehicle) {
        navigate('/login');
        return <></>;
    } else
        return (
            <>
                <h2>Vehicle</h2>
                <CollapseWrapper>
                    <Container>
                        <Formik initialValues={vehicle} validationSchema={EditVehicleSchema} onSubmit={handleSubmit}>
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
