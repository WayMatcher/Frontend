import React from 'react';

import { Form as FormikForm, Formik } from 'formik';
import { Container, Row } from 'react-bootstrap';
import { RegisterAddressSchema } from '@/utils/formValidations';
import FormInput from '@/components/FormInput';
import { StepsRegister } from '@/types/objects/User/form';
import CollapseWrapper from '@/components/CollapseWrapper';
import Address from '@/types/objects/Address/dto';
import RegisterButtons from '@/components/register/RegisterButtons';

export default function RegisterAddress({
    step,
    setAddress,
}: {
    step: [StepsRegister, React.Dispatch<React.SetStateAction<StepsRegister>>];
    setAddress: React.Dispatch<React.SetStateAction<Address | null>>;
}): React.ReactElement {
    const [currentStep, setStep] = step;
    const handleSubmit = (values: Address) => {
        setAddress(values);
        setStep(StepsRegister.VEHICLE);
    };

    const initialValues: Address = {
        street: '',
        postal_code: '',
        region: '',
        country: '',
        state: '',
        city: '',
        address_line1: '',
        address_line2: '',
        longitude: 0,
        latitude: 0,
    };
    if (currentStep !== StepsRegister.ADDRESS) return <></>;
    return (
        <>
            <h2>Address</h2>
            <CollapseWrapper>
                <Container>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={RegisterAddressSchema}
                        onSubmit={handleSubmit}
                    >
                        {(formikProps) => (
                            <FormikForm>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Street'
                                        name='street'
                                        type='text'
                                        placeholder='1234 Main St'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Postal Code'
                                        name='postal_code'
                                        type='text'
                                        placeholder='12345'
                                        formikProps={formikProps}
                                    />
                                    <FormInput
                                        label='Region'
                                        name='region'
                                        type='text'
                                        placeholder='Region'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Country'
                                        name='country'
                                        type='text'
                                        placeholder='Country'
                                        formikProps={formikProps}
                                    />
                                    <FormInput
                                        label='State'
                                        name='state'
                                        type='text'
                                        placeholder='State'
                                        formikProps={formikProps}
                                    />
                                    <FormInput
                                        label='City'
                                        name='city'
                                        type='text'
                                        placeholder='City'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Address Line 1'
                                        name='address_line1'
                                        type='text'
                                        placeholder='Address Line 1'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Address Line 2'
                                        name='address_line2'
                                        type='text'
                                        placeholder='Address Line 2'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Longitude'
                                        name='longitude'
                                        type='number'
                                        placeholder={'47.8117211'}
                                        formikProps={formikProps}
                                    />
                                    <FormInput
                                        label='Latitude'
                                        name='latitude'
                                        type='number'
                                        placeholder={'13.0322547'}
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <RegisterButtons
                                    prevStep={StepsRegister.USER}
                                    nextStep={StepsRegister.VEHICLE}
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
