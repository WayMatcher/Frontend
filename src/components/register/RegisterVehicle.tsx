import React from 'react';

import { Form as FormikForm, Formik } from 'formik';
import { Container, Row } from 'react-bootstrap';
import { RegisterVehicleSchema } from '@/utils/formValidations';
import FormInput from '@/components/FormInput';
import { StepsRegister } from '@/types/objects/User/form';
import CollapseWrapper from '@/components/CollapseWrapper';
import Vehicle from '@/types/objects/Vehicle/dto';
import RegisterNavButtons from '@/components/register/RegisterButtons';

export default function RegisterVehicle({
    step,
    setVehicle,
}: {
    step: [StepsRegister, React.Dispatch<React.SetStateAction<StepsRegister>>];
    setVehicle: React.Dispatch<React.SetStateAction<Vehicle | null>>;
}): React.ReactElement {
    const [_, setStep] = step;

    const handleSubmit = (values: Vehicle) => {
        setVehicle(values);
        setStep(StepsRegister.SUMMARY);
    };

    const initialValues: Vehicle = {
        make: '',
        model: '',
        year: 2025,
        seats: 4,
        license_plate: '',
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
                        {(formikProps) => (
                            <FormikForm>
                                <Row className='mb-3'>
                                    <FormInput label='Make' name='make' type='text' formikProps={formikProps} />
                                    <FormInput label='Model' name='model' type='text' formikProps={formikProps} />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput label='Year' name='year' type='number' formikProps={formikProps} />
                                    <FormInput label='Seats' name='seats' type='number' formikProps={formikProps} />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='License Plate'
                                        name='license_plate'
                                        type='text'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <br />
                                <RegisterNavButtons
                                    prevStep={StepsRegister.USER}
                                    nextStep={StepsRegister.SUMMARY}
                                    setStep={setStep}
                                />
                            </FormikForm>
                        )}
                    </Formik>
                </Container>
            </CollapseWrapper>
        </>
    );
}
