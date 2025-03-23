import React, { useContext } from 'react';
import RegisterContext from '@/contexts/RegisterContext';

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
                        {({ values, errors, isSubmitting }) => (
                            <FormikForm>
                                <Row>
                                    <FormInput
                                        label='Street'
                                        name='street'
                                        type='text'
                                        placeholder='1234 Main St'
                                        formikData={{
                                            value: values.street,
                                            error: errors.street,
                                            isSubmitting: isSubmitting,
                                        }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Postal Code'
                                        name='postal_code'
                                        type='text'
                                        placeholder='12345'
                                        formikData={{
                                            value: values.postal_code,
                                            error: errors.postal_code,
                                            isSubmitting,
                                        }}
                                    />
                                    <FormInput
                                        label='Region'
                                        name='region'
                                        type='text'
                                        placeholder='Region'
                                        formikData={{ value: values.region, error: errors.region, isSubmitting }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Country'
                                        name='country'
                                        type='text'
                                        placeholder='Country'
                                        formikData={{ value: values.country, error: errors.country, isSubmitting }}
                                    />
                                    <FormInput
                                        label='State'
                                        name='state'
                                        type='text'
                                        placeholder='State'
                                        formikData={{ value: values.state, error: errors.state, isSubmitting }}
                                    />
                                    <FormInput
                                        label='City'
                                        name='city'
                                        type='text'
                                        placeholder='City'
                                        formikData={{ value: values.city, error: errors.city, isSubmitting }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Address Line 1'
                                        name='address_line1'
                                        type='text'
                                        placeholder='Address Line 1'
                                        formikData={{
                                            value: values.address_line1,
                                            error: errors.address_line1,
                                            isSubmitting,
                                        }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Address Line 2'
                                        name='address_line2'
                                        type='text'
                                        placeholder='Address Line 2'
                                        formikData={{
                                            value: values.address_line2,
                                            error: errors.address_line2,
                                            isSubmitting,
                                        }}
                                    />
                                </Row>
                                <Row>
                                    <FormInput
                                        label='Longitude'
                                        name='longitude'
                                        type='number'
                                        placeholder={47.8117211}
                                        formikData={{ value: values.longitude, error: errors.longitude, isSubmitting }}
                                    />
                                    <FormInput
                                        label='Latitude'
                                        name='latitude'
                                        type='number'
                                        placeholder={13.0322547}
                                        formikData={{ value: values.latitude, error: errors.latitude, isSubmitting }}
                                    />
                                </Row>
                                <RegisterButtons prevStep={StepsRegister.USER} nextStep={StepsRegister.VEHICLE} />
                            </FormikForm>
                        )}
                    </Formik>
                </Container>
            </CollapseWrapper>
        </>
    );
}
