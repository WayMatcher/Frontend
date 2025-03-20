import React, { useContext } from 'react';
import RegisterContext from '@/contexts/RegisterContext';

import { Form as FormikForm, Formik } from 'formik';
import { Container, Row } from 'react-bootstrap';
import { RegisterVehicleSchema } from '@/utils/formValidations';
import FormInput from '@/components/FormInput';
import { StepsRegister } from '@/types/objects/User/form';
import CollapseWrapper from '@/components/CollapseWrapper';
import Vehicle from '@/types/objects/Vehicle/dto';
import RegisterNavButtons from '@/components/register/RegisterButtons';

export default function RegisterVehicle(): React.ReactElement {
    const { registerVehicle, setRegisterVehicle, setStep } = useContext(RegisterContext);

    const handleSubmit = (values: Vehicle) => {
        setRegisterVehicle(values);
        setStep(StepsRegister.SUMMARY);
    };

    const initialValues: Vehicle = {
        make: registerVehicle?.make || '',
        model: registerVehicle?.model || '',
        year: registerVehicle?.year || 2025,
        seats: registerVehicle?.seats || 4,
        license_plate: registerVehicle?.license_plate || '',
        additional_description: '',
    };

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
                                <RegisterNavButtons prevStep={StepsRegister.USER} nextStep={StepsRegister.SUMMARY} />
                            </FormikForm>
                        )}
                    </Formik>
                </Container>
            </CollapseWrapper>
        </>
    );
}
