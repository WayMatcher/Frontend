import React from 'react';
import { Form as FormikForm, Formik } from 'formik';
import { Container, Row } from 'react-bootstrap';
import { RegisterUserSchema } from '@/utils/formValidations';
import FormInput from '@/components/FormInput';
import { FormUserRegister, initialValuesUserRegister, StepsRegister } from '@/types/objects/User/form';
import CollapseWrapper from '@/components/CollapseWrapper';
import RegisterButtons from '@/components/register/RegisterButtons';
import User from '@/types/objects/User/dto';

export default function RegisterUser({
    step,
    setUser,
}: {
    step: [StepsRegister, React.Dispatch<React.SetStateAction<StepsRegister>>];
    setUser: React.Dispatch<React.SetStateAction<(User & { password: string }) | null>>;
}): React.ReactElement {
    const [currentStep, setStep] = step;
    const handleSubmit = async (values: FormUserRegister) => {
        setUser(values);
        setStep(StepsRegister.ADDRESS);
    };
    if (currentStep !== StepsRegister.USER) return <></>;
    return (
        <>
            <h2>User</h2>
            <CollapseWrapper>
                <Container>
                    <Formik
                        initialValues={initialValuesUserRegister}
                        validationSchema={RegisterUserSchema}
                        onSubmit={handleSubmit}
                    >
                        {(formikProps) => (
                            <FormikForm>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Username'
                                        name='username'
                                        type='text'
                                        placeholder='username'
                                        formikProps={formikProps}
                                    />
                                    <FormInput
                                        label='Email'
                                        name='email'
                                        type='email'
                                        placeholder='contact@example.com'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Password'
                                        name='password'
                                        type='password'
                                        formikProps={formikProps}
                                    />
                                    <FormInput
                                        label='Confirm Password'
                                        name='password_confirm'
                                        type='password'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <hr />
                                <h3>Optional Information</h3>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='First Name'
                                        name='firstName'
                                        type='text'
                                        placeholder='John'
                                        formikProps={formikProps}
                                    />
                                    <FormInput
                                        label='Last Name'
                                        name='name'
                                        type='text'
                                        placeholder='Doe'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Telephone'
                                        name='telephone'
                                        type='tel'
                                        placeholder='555-555-5555'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <hr />
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Additional Information'
                                        name='additional_description'
                                        type='textarea'
                                        placeholder='Tell us about yourself'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <Row className='mb-3'>
                                    <FormInput
                                        label='Profile Picture'
                                        name='profile_picture'
                                        type='file'
                                        formikProps={formikProps}
                                    />
                                </Row>
                                <RegisterButtons nextStep={StepsRegister.ADDRESS} setStep={setStep} />
                            </FormikForm>
                        )}
                    </Formik>
                </Container>
            </CollapseWrapper>
        </>
    );
}
